// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract dispute_resolution is ERC20, Ownable{

    constructor() ERC20("GRULL", "GRULL") Ownable(msg.sender) {
        // Mint 100,000 tokens to the contract itself (100000 * 10^18 for 18 decimals)
        _mint(address(this), 100000 * 10 ** decimals());
    }

    event disputeCreated(uint256 id);
    event appliedForJuror(uint256 id);
    event jurorId(uint);
    event newJurorsSelected(Juror[]);
    event tokensBought(address, uint256);
    event disputeCreated(uint256, dispute);
    event jurorsAssigned(dispute, Juror[]);
    event disputeResolved(dispute, uint256);
    event jurorSlashed(address, uint256);
    event jurorRewards(address, uint256);
  

    uint256 public tokenPrice= 100;
    uint256 disputeId; // create dispute => increment krke as dispute id emit karenge
    uint256 public minStakeTokens = 10;
    uint256 public avgStake;
    uint256 private jurorStakeAmountPool = 0;
    uint256 public totalNoOfJurors = 4;
    uint256 public disputeJurors = 3;
    uint256 public voteCount =0; 

    // mapping(uint256 => bool) public dispute;
    Juror[] public jurors;
    

    struct vote{
        uint8 vote;
        uint256 backing_tokens;
    }

    struct Juror {
        uint256 id;
        address jurorAddress;
        uint256 stake;
        bool voted;
        bool vote;
        bool isOccupied;
    }
    struct wannabeJurors{
        address jurorAddress;
        uint256 stake;
    }

    struct dispute{
        uint256 id;
        string desUrl;
        address victim1;
        address victim2;
        bool isResolved;
        Juror[] assingedJurors;
        vote[] voteOfJurors;
        uint256 expiry;
        uint256 solution;
    }

    vote[] public voteArray;
    wannabeJurors[] public wannabeJurorsPool;
    dispute[] public disputeArray;


    function wannabePoolSize() public view returns(uint256) {
        return wannabeJurorsPool.length;
    }

    // Function to allow users to buy tokens
    function buyTokens(uint256 tokenAmount) public payable {
        
        require(msg.value == tokenAmount*100); 
        require(balanceOf(address(this)) >= tokenAmount, "Not enough tokens in contract");
        _transfer(address(this), msg.sender, tokenAmount); // Transfer tokens to buyer
        emit tokensBought(msg.sender, tokenAmount);
    }

    function getTokens(address user) external view returns(uint256){
        return balanceOf(user);
    }

    function applyForJuror(uint256 stakeAmount) external {
        require( stakeAmount > minStakeTokens, " Amount less than minimum set limit");
        require( balanceOf(msg.sender) >= stakeAmount, " Gareeb saale bhaag!!");

        wannabeJurors storage staker = wannabeJurorsPool.push();
        staker.stake = stakeAmount;
        jurorStakeAmountPool += stakeAmount;
        staker.jurorAddress = msg.sender;
        emit appliedForJuror(wannabeJurorsPool.length);

        if(wannabeJurorsPool.length > 4){
            jurorSelection();
        }

    }

    function createDispute(address chutiya1, address chutiya2, string memory desUrl, uint256 _expiryHr) external {
        dispute storage issue = disputeArray.push();
        issue.id = disputeId;
        disputeId++;
        issue.victim1 = chutiya1;
        issue.victim2  = chutiya2;
        issue.desUrl = desUrl;
        issue.isResolved = false;
        issue.expiry = block.timestamp + (_expiryHr * 1 hours);
        emit disputeCreated(issue.id, issue);

        assignJurors(issue.id);

    }

    function assignJurors(uint256 issueId) internal{
        require(disputeArray[issueId].assingedJurors.length == 0, "Jurors already selected");

        // Fisher-Yates (Knuth) shuffle
         require(jurors.length >= disputeJurors, "Not enough jurors available");
         uint256[] memory shuffledIndices = shuffleJurorPool();

         for (uint256 i = 0; i < disputeJurors; i++) {
            disputeArray[issueId].assingedJurors.push(jurors[shuffledIndices[i]]);
            jurors[shuffledIndices[i]].isOccupied = true;
           
        }
        emit jurorsAssigned(disputeArray[issueId], disputeArray[issueId].assingedJurors);
    }

    function shuffleJurorPool() internal view returns (uint256[] memory) {
        uint256[] memory indices = new uint256[](jurors.length);

        for (uint256 i = 0; i < jurors.length; i++) {
            indices[i] = i;
        }

        // Shuffling
        for (uint256 i = jurors.length - 1; i > 0; i--) {
            uint256 j = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, i))) % (i + 1);
            (indices[i], indices[j]) = (indices[j], indices[i]); // Swap
        }

        return indices;
    }

    function voteForDispute(uint256 index, bool _vote, uint256 backingAmount) external {
        require(disputeArray[index].isResolved != true, "The dispute is already resolved");
        voteCount++;
        

        dispute storage currentDispute = disputeArray[index];
        bool isAssignedJuror = false;
        uint256 jurorIndex;

        for (uint256 i = 0; i < currentDispute.assingedJurors.length; i++) {
            if (currentDispute.assingedJurors[i].jurorAddress == msg.sender) {
                // juror = currentDispute.assingedJurors[i];
                isAssignedJuror = true;
                jurorIndex = i;
                break;
            }
        }

        require(isAssignedJuror, "You are not assigned as a juror for this dispute");
        require(currentDispute.assingedJurors[jurorIndex].voted == false, "You have already voted");
        require(balanceOf(msg.sender) >= backingAmount, "Insufficient token balance for backing");

        currentDispute.voteOfJurors.push(vote({
            vote: _vote ? 1 : 0,
            backing_tokens: backingAmount
        }));

        currentDispute.assingedJurors[jurorIndex].voted = true;
        currentDispute.assingedJurors[jurorIndex].vote = _vote;

        if(block.timestamp >= currentDispute.expiry || voteCount == disputeJurors){
            resolveDispute(currentDispute);
        }

    }

    function resolveDispute(dispute storage _dispute) internal {
        uint256 positiveVotes = 0;
        uint256 negativeVotes = 0;

        
        for (uint256 i = 0; i < _dispute.voteOfJurors.length; i++) {
            if (_dispute.voteOfJurors[i].vote == 1) {
                positiveVotes++;
            } else {
                negativeVotes++;
            }
        }

        // We'll always take odd numbr of jurors
        _dispute.solution = (positiveVotes > negativeVotes) ? 1 : 0;
        _dispute.isResolved = true;
        emit disputeResolved(_dispute, _dispute.solution);

        fundDistribution();
        
    }

    function fundDistribution() internal {
        uint256 rewardPool = 0; 
        uint256 totalCorrectJurorStake = 0; 

        for (uint256 i = 0; i < disputeArray[disputeArray.length - 1].assingedJurors.length; i++) {
            Juror storage juror = disputeArray[disputeArray.length - 1].assingedJurors[i];

            if (juror.vote != (disputeArray[disputeArray.length - 1].solution == 1)) {
                // Slash 50% 
                juror.stake -= juror.stake / 2;
                rewardPool += juror.stake / 2;
                _transfer( msg.sender, address(this), juror.stake / 2); 
                emit jurorSlashed(juror.jurorAddress, juror.stake / 2);
                
            } else {
                totalCorrectJurorStake += juror.stake;
            }
        }

        for (uint256 i = 0; i < disputeArray[disputeArray.length - 1].assingedJurors.length; i++) {
            Juror storage juror = disputeArray[disputeArray.length - 1].assingedJurors[i];

            if (juror.vote == (disputeArray[disputeArray.length - 1].solution == 1)) {
                
                uint256 reward = (juror.stake * rewardPool) / totalCorrectJurorStake;
                juror.stake += reward; 
                _transfer(address(this), msg.sender, reward);
                emit jurorSlashed(juror.jurorAddress, reward);
            }
        }

    }



    function _absDiff(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a - b : b - a;
    }

    function _sortJurorsByDifference(uint256[] memory diffs, uint256[] memory indices) internal pure {
        // Bubble sort 
        for (uint256 i = 0; i < diffs.length; i++) {
            for (uint256 j = i + 1; j < diffs.length; j++) {
                if (diffs[i] > diffs[j]) {
                    // Swap differences
                    uint256 tempDiff = diffs[i];
                    diffs[i] = diffs[j];
                    diffs[j] = tempDiff;

                    // Swap corresponding indices
                    uint256 tempIndex = indices[i];
                    indices[i] = indices[j];
                    indices[j] = tempIndex;
                }
            }
        }
    }

    function jurorSelection() internal {
        require(wannabeJurorsPool.length >= 5, "Not enough jurors to select");

        avgStake = jurorStakeAmountPool / wannabeJurorsPool.length;
        uint256[] memory differences = new uint256[](wannabeJurorsPool.length);
        uint256[] memory indices = new uint256[](wannabeJurorsPool.length);

        for (uint256 i = 0; i < wannabeJurorsPool.length; i++) { 
            differences[i] = _absDiff(wannabeJurorsPool[i].stake, avgStake); // storing difference in  array
            indices[i] = i;  // store index of juror
        }

        // Step 3: Sort the indices array based on the differences
        _sortJurorsByDifference(differences, indices);

        for (uint256 i = 0; i < totalNoOfJurors; i++) {
            uint256 jurorIndex = indices[i];
            Juror memory newJuror = Juror({
                id: jurorIndex,
                jurorAddress: wannabeJurorsPool[jurorIndex].jurorAddress,
                stake: wannabeJurorsPool[jurorIndex].stake,
                voted: false,
                vote: false,
                isOccupied: false
            });
            jurors.push(newJuror);  // Assign juror to current dispute
            emit jurorId(jurorIndex);
        }
        emit newJurorsSelected(jurors);
        makingJurors(jurors);

        // state reset of wannabeJurorPool
        delete wannabeJurorsPool; 
        jurorStakeAmountPool = 0;
    }

    function makingJurors(Juror[] memory _jurors) internal {
        for (uint i=0; i < jurors.length; i++) 
        {
            Juror memory juror = _jurors[i];
            _transfer(juror.jurorAddress, address(this), juror.stake);
            
        }
    }


}