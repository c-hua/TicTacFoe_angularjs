var ticTacRef;
var IDs;


angular.module("TicTac", ["firebase"])  //
 .controller("boardCtrl", function($scope, $firebase){
 	
 	ticTacRef = new Firebase("https://alex-tic-tac.firebaseio.com/");
 	$scope.fbRoot = $firebase(ticTacRef);

 	// Wait until everything really is loaded
 	$scope.fbRoot.$on("loaded", function() {
		IDs = $scope.fbRoot.$getIndex();
		if(IDs.length == 0)
		{
			
	 		$scope.fbRoot.$add( { boxes:['','','','','','','','',''],
 	 			xTurn:"x", win:false, turnCounter:0, homeScore: 0, awayScore: 0} );
			$scope.fbRoot.$on("change", function() {
				IDs = $scope.fbRoot.$getIndex();
				$scope.obj = $scope.fbRoot.$child(IDs[0]);
			});
		}
		else
		{
			$scope.obj = $scope.fbRoot.$child(IDs[0]);
		}

	});

		$scope.resetGame= function () {

		$scope.obj.boxes = [
			"","","",
			"","","",
			"","",""
			];
		$scope.obj.winMsg = "";
		$scope.obj.turnCounter = 0;
		$scope.obj.win = false;
		$scope.obj.$save();
		document.getElementsByClassName('message')[0].style.display="none";

	};	

	$scope.takeTurn = function (i) {
		if ($scope.obj.boxes[i] == "") {
				$scope.obj.boxes[i] = $scope.obj.xTurn;

				if ($scope.obj.boxes[i] == "x") {
					$scope.obj.xTurn = "o";
					$scope.obj.$save();
				} else {
					$scope.obj.xTurn = "x";
					$scope.obj.$save();
				};
			$scope.obj.turnCounter++;
			$scope.obj.$save();	
			} 
		else {
				alert('jackass!')
			};
		if ($scope.obj.turnCounter >= 5) {
			 	$scope.checkWin();
			 	$scope.obj.$save();
			};
		
			
	};
$scope.checkWin = function() {
		$scope.obj.winAry = [
				[0,1,2],
				[3,4,5],
				[6,7,8],
				[0,3,6],
				[1,4,7],
				[2,5,8],
				[0,4,8],
				[2,4,6]
			]
			$scope.obj.$save();

			for(i=0; i<$scope.obj.winAry.length; i++) {
				winCombo = $scope.obj.winAry[i];
				var whosTurnIsIt = $scope.obj.boxes[winCombo[0]];
				if($scope.obj.boxes[winCombo[0]]==$scope.obj.boxes[winCombo[1]] && $scope.obj.boxes[winCombo[1]] == $scope.obj.boxes[winCombo[2]] && $scope.obj.boxes[winCombo[0]] !=="") {

					document.getElementsByClassName('message')[0].style.display="block";
					$scope.obj.winMsg="Winner!";
					$scope.obj.$save();

					if(whosTurnIsIt=="x"){
						$scope.obj.homeScore++;
						$scope.obj.$save();
					}
					else if(whosTurnIsIt=="o"){
						$scope.obj.awayScore++;
						$scope.obj.$save();
					}	
					$scope.obj.win = true;	
					$scope.obj.$save();		
					
				};
					
			};
		if($scope.obj.turnCounter == 9 && $scope.obj.win==false) {
			document.getElementsByClassName('message')[0].style.display="block";

			$scope.obj.tieMsg="Tied!";	
			$scope.obj.$save();		
		};
			
	};

});

















// var ticTacRef;
// var IDs;
// // xTurn="x";
// turnCounter= 0;
// homeScore = 0;
// awayScore = 0;

// angular.module("TicTac", ["firebase"])  //
//  .controller("boardCtrl", function($scope, $firebase){
 	
//  	ticTacRef = new Firebase("https://alex-tic-tac.firebaseio.com/");
//  	$scope.fbRoot = $firebase(ticTacRef);

//  	$scope.fbRoot.$on("loaded", function() {
// 		IDs = $scope.fbRoot.$getIndex();
// 		if(IDs.length == 0)
// 		{
// 			// What???  No Board????  Let's build one.
// 	 		$scope.fbRoot.$add( { boxes:['','','','','','','','','','','','','','','',''],
//  	 			xTurn:true} );
// 			$scope.fbRoot.$on("change", function() {
// 				IDs = $scope.fbRoot.$getIndex();
// 				$scope.obj = $scope.fbRoot.$child(IDs[0]);
// 			});
// 		}
// 		else
// 		{
// 			$scope.obj = $scope.fbRoot.$child(IDs[0]);
// 		}


// 	});

// 	$scope.takeTurn = function (i) {
// 		console.log($scope.obj.boxes);
// 		if ($scope.obj.boxes[i] == "") {

// 			if ($scope.obj.xTurn==true) {
// 				$scope.obj.boxes[i] = "o";
// 				$scope.obj.$save();
// 			} else {
// 				$scope.obj.boxes[i] = "x";
// 				$scope.obj.$save();

// 			}
// 			$scope.obj.xTurn = !$scope.obj.xTurn; 
// 				$scope.obj.$save();
				
// 			$scope.obj.turnCounter++;	
// 		} 
// 		else {
// 				alert('jackass!')
// 			};
// 		if ($scope.obj.turnCounter >= 5) {
// 			 	$scope.obj.checkWin();
			 	
// 			};

			
// 	};
// });


// function boardCtrl ($scope) {
// 	$scope.boxes = ["","","","","","","","",""]
// 	$scope.xTurn = 'x';
// 	$scope.turnCounter = 0;
// 	$scope.win = false;
// 	$scope.homeScore = 0;
// 	$scope.awayScore = 0;
	
	
	// $scope.resetGame= function () {

	// 	$scope.boxes = [
	// 		"","","",
	// 		"","","",
	// 		"","",""
	// 		];
	// 	$scope.winMsg = "";
	// 	$scope.turnCounter = 0;
	// 	$scope.win = false;

	// 	document.getElementsByClassName('message')[0].style.display="none";

	// };

		

	

	





