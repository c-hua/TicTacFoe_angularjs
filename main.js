var ticTacSource;
var Ids;
winMsg = "";
invalidMsg = "";
tieMsg = "";
whosTurn="x"
counter= 0;
score_home = 0;
score_other = 0;




// declare variables 
function boardCtrl ($scope) {
	$scope.boxes = ["","","","","","","","",""]
	$scope.whosTurn = 'x';
	$scope.counter = 0;
	$scope.score_home = 0;
	$scope.score_other = 0;
	$scope.win = false;
	$scope.startMsg=false;

// start message function
	$scope.startMsg=function() {
			$scope.startMsg = false
		// if ($scope.startMsg = false) {
			// console.log("startmsg")
			// resetGame();
			// $scope.startMsg=true;
			// document.getElementsByClassName('message')[0].style.display="block";
			// 		$scope.winMsg="start";
		// }
	}
	
// create board	
	
	$scope.resetGame= function () {

		$scope.boxes = [
			"","","",
			"","","",
			"","",""
			];

		$scope.winMsg = "";
		$scope.tieMsg = "";
		$scope.counter = 0;
		$scope.win = false;
		$scope.startMsg=false;
		

		document.getElementsByClassName('message')[0].style.display="none";

	};

// figure out whose turn it is...(X or O)	

	$scope.takeTurn = function (i) {
		if ($scope.boxes[i] == "") {
				$scope.boxes[i] = $scope.whosTurn;

				if ($scope.boxes[i] == "x") {
					$scope.whosTurn = "o"
				} else {
					$scope.whosTurn = "x";
				};
			$scope.counter++;	
			} 
		else {
				document.getElementsByClassName('message')[0].style.display="block";
					$scope.winMsg="I N V A L I D";
			};
		if ($scope.counter >= 5) {
			 	$scope.checkWin();
			};
		
			
	};

	// identify winning combos
	$scope.checkWin = function() {
		$scope.winningArray = [
				[0,1,2],
				[1,4,7],
				[2,5,8],
				[0,4,8],
				[6,7,8],
				[3,4,5],
				[0,3,6],
				[2,4,6]
			]
		//post WINNER message
			for(i=0; i<$scope.winningArray.length; i++) {
				winCombo = $scope.winningArray[i];
				var whosTurnIsIt = $scope.boxes[winCombo[0]];
				if($scope.boxes[winCombo[0]]==$scope.boxes[winCombo[1]] && $scope.boxes[winCombo[1]] == $scope.boxes[winCombo[2]] && $scope.boxes[winCombo[0]] !=="") {

					document.getElementsByClassName('message')[0].style.display="block";
					$scope.winMsg="W I N N E R !";
					if(whosTurnIsIt=="x"){
						$scope.score_home++;
					}
					else if(whosTurnIsIt=="o"){
						$scope.score_other++;
					}	
					$scope.win = true;			
					
				};
					
			};

		// identify tie, post up message "CAT'S GAME"	
		if($scope.counter == 9 && $scope.win===false) {
			document.getElementsByClassName('message')[0].style.display="block";

			$scope.winMsg="T I E !";	

		};
			
	};

};


			// $scope.checkWin = function () {
		// 	$scope.winAry = [
		// 		[0,1,2],
		// 		[3,4,5],
		// 		[6,7,8],
		// 		[0,3,6],
		// 		[1,4,7],
		// 		[2,5,8],
		// 		[0,4,8],
		// 		[2,4,6]
		// 	]

		// 	for (var i = 0; i < $scope.winAry.length; i++) {
		// 		answer = $scope.winAry[i]; // [2,5,8]
		// 		pos0 = $scope.boxes[answer[0]];
		// 		pos1 = $scope.boxes[answer[1]];
		// 		pos2 = $scope.boxes[answer[2]];

		// 		if (pos0 == pos1 && pos1 == pos2 && pos0 !== "") {
		// 			$scope.winMsg="Winner!";
		// 			document.getElementById("button").style.display="block";							 
		// 			break;	
		// 		};
		// 	};
						
		// };		
			










