

app.controller('ReportingController', function ($scope,reportingModel,Paginator,dateDataModel) {
    $scope.title = "JavaScript Showcase";
    $scope.countries = reportingModel;
    $scope.paginator = Paginator;
    DcCharts(dateDataModel);
});




  




