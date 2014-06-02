var ticTacSource;
var Ids;
winMsg = "";
invalidMsg = "";
tieMsg = "";
whosTurn="x"
counter= 0;
score_home = 0;
score_other = 0;

angular.module("TicTac", ["firebase"])  //
 .controller("boardCtrl", function($scope, $firebase){

 	 ticTacRef = new Firebase("https://fliptacfoe.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	$scope.fbRoot.$on("loaded", function() {
 		Ids = $scope.fbRoot.$getIndex();
 		if(Ids.length == 0) {
 			$scope.fbRoot.$add( { boxes: ['','','','','','','','',''],
 				whosTurn:"x", win:false, counter:0, score_home: 0, score_other: 0} );
			$scope.fbRoot.$on("change", function() {
				Ids = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(Ids[0]);
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(Ids[0]);
		}

	});


// declare variables 
function boardCtrl ($scope) {
	$scope.obj.boxes = ["","","","","","","","",""]
	$scope.obj.whosTurn = 'x';
	$scope.obj.counter = 0;
	$scope.obj.score_home = 0;
	$scope.obj.score_other = 0;
	$scope.obj.win = false;
	$scope.obj.startMsg=false;

// start message function
	$scope.startMsg=function() {
		if ($scope.obj.startMsg = false) {
			resetGame();
			$scope.obj.startMsg=true;
			document.getElementsByClassName('message')[0].style.display="block";
					$scope.obj.winMsg="start";
		}
	}
	
// create board	
	
	$scope.resetGame= function () {

		$scope.boxes = [
			"","","",
			"","","",
			"","",""
			];

		$scope.obj.winMsg = "";
		$scope.obj.tieMsg = "";
		$scope.obj.counter = 0;
		$scope.obj.win = false;
		$scope.obj.startMsg=false;
		

		document.getElementsByClassName('message')[0].style.display="none";

	};

// figure out whose turn it is...(X or O)	

	$scope.takeTurn = function (i) {
		if ($scope.obj.boxes[i] == "") {
				$scope.obj.boxes[i] = $scope.obj.whosTurn;

				if ($scope.obj.boxes[i] == "x") {
					$scope.obj.whosTurn = "o"
				} else {
					$scope.obj.whosTurn = "x";
				};
			$scope.obj.counter++;	
			} 
		else {
				document.getElementsByClassName('message')[0].style.display="block";
					$scope.obj.winMsg="I N V A L I D";
			};
		if ($scope.obj.counter >= 5) {
			 	$scope.obj.checkWin();
			};
		
			
	};

	// identify winning combos
	$scope.checkWin = function() {
		$scope.obj.winningArray = [
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
			for(i=0; i<$scope.obj.winningArray.length; i++) {
				winCombo = $scope.obj.winningArray[i];
				var whosTurnIsIt = $scope.obj.boxes[winCombo[0]];
				if($scope.obj.boxes[winCombo[0]]==$scope.obj.boxes[winCombo[1]] && $scope.obj.boxes[winCombo[1]] == $scope.obj.boxes[winCombo[2]] && $scope.obj.boxes[winCombo[0]] !=="") {

					document.getElementsByClassName('message')[0].style.display="block";
					$scope.obj.winMsg="W I N N E R !";
					if(whosTurnIsIt=="x"){
						$scope.obj.score_home++;
					}
					else if(whosTurnIsIt=="o"){
						$scope.obj.score_other++;
					}	
					$scope.obj.win = true;			
					
				};
					
			};

		// identify tie, post up message "CAT'S GAME"	
		if($scope.obj.counter == 9 && $scope.obj.win===false) {
			document.getElementsByClassName('message')[0].style.display="block";

			$scope.obj.winMsg="T I E !";	
			$scope.obj.$save();

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
			










