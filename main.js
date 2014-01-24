var ticTacRef;
var IDs;
xTurn="x"
turnCounter= 0;
winMsg = "";
homeScore = 0;
awayScore = 0;

function boardCtrl ($scope) {
	$scope.boxes = ["","","","","","","","",""]
	$scope.xTurn = 'x';
	$scope.turnCounter = 0;
	$scope.win = false;
	$scope.homeScore = 0;
	$scope.awayScore = 0;
	
	
	$scope.resetGame= function () {

		$scope.boxes = [
			"","","",
			"","","",
			"","",""
			];
		$scope.winMsg = "";
		$scope.turnCounter = 0;
		$scope.win = false;

		document.getElementsByClassName('message')[0].style.display="none";

	};

		

	$scope.takeTurn = function (i) {
		if ($scope.boxes[i] == "") {
				$scope.boxes[i] = $scope.xTurn;

				if ($scope.boxes[i] == "x") {
					$scope.xTurn = "o"
				} else {
					$scope.xTurn = "x";
				};
			$scope.turnCounter++;	
			} 
		else {
				alert('jackass!')
			};
		if ($scope.turnCounter >= 5) {
			 	$scope.checkWin();
			};
		
			
	};

	$scope.checkWin = function() {
		$scope.winAry = [
				[0,1,2],
				[3,4,5],
				[6,7,8],
				[0,3,6],
				[1,4,7],
				[2,5,8],
				[0,4,8],
				[2,4,6]
			]

			for(i=0; i<$scope.winAry.length; i++) {
				winCombo = $scope.winAry[i];
				var whosTurnIsIt = $scope.boxes[winCombo[0]];
				if($scope.boxes[winCombo[0]]==$scope.boxes[winCombo[1]] && $scope.boxes[winCombo[1]] == $scope.boxes[winCombo[2]] && $scope.boxes[winCombo[0]] !=="") {

					document.getElementsByClassName('message')[0].style.display="block";
					$scope.winMsg="Winner!";
					if(whosTurnIsIt=="x"){
						$scope.homeScore++;
					}
					else if(whosTurnIsIt=="o"){
						$scope.awayScore++;
					}	
					$scope.win = true;			
					
				};
					
			};
		if($scope.turnCounter == 9 && $scope.win==false) {
			document.getElementsByClassName('message')[0].style.display="block";

			$scope.tieMsg="Tied!";			
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
			










