

var app = angular.module( "assignment", [ ] );

/* The factory creates the various models for the application */
app.factory('reportingModel', function() {
    return new ReportingModel();
});

app.factory('dateDataModel', function(reportingModel) {
    return new DateDataModel(reportingModel);
});

/* Paginator Service */

app.factory('Paginator', function($rootScope) {
	return {
		'page': 0,
		'rowsPerPage': 20,
		'itemCount': 0,
		'setPage': function (page) {
            if (page > this.pageCount()) {
                return;
            }
            this.page = page;
        },
        'lastPage': function () {
            this.page = this.pageCount() - 1;
        },
        'isFirstPage': function () {
            return this.page == 0;
        },
        'isLastPage': function () {
            return this.page == this.pageCount() - 1;
        },
        'pageCount': function () {
        	$rootScope.rowsPerPage = this.rowsPerPage;
            return Math.ceil(parseInt(this.itemCount) / parseInt(this.rowsPerPage));
        }
	};
});

app.filter('paginate', function(Paginator, $rootScope) {
    return function(input, rowsPerPage) {
        if (!input) {
            return input;
        }
        if (rowsPerPage) {
            Paginator.rowsPerPage = rowsPerPage;
        }
        Paginator.itemCount = input.length;
        return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
    }
});
          

app.filter('forLoop', function() {
    return function(input, start, end) {
        input = new Array(end - start);
        for (var i = 0; start < end; start++, i++) {
            input[i] = start;
        }
        return input;
    }
});

/*
 * This configures the routes and associates each route with a view and a controller
 */
app.config(function ($routeProvider) {
    $routeProvider
        .when('/reporting', {
            controller: 'ReportingController',
            templateUrl: 'app/templates/reporting.html'
        })
        .otherwise({ redirectTo: '/reporting' });
});






