define(['angular'], function(angular) {
  'use strict';
    var filters = angular.module('filters', []);
    filters.filter('orderObjectBy', function() {
        return function(input, attribute) {
            if(!angular.isObject(input)) return input;
            var array = [];
            for(var objectKey in input) {
                array.push(input[objectKey]);
            }
            array.sort(function(a, b) {
                a = parseInt(a[attribute]);
                b = parseInt(b[attribute]);
                return a - b;
            });
            return array;
        }
    });
    filters.filter('getById', function() {
        return function(input, id) {
            var i = 0,
                len = input.length;
            for(; i < len; i++) {
                if(input[i].id == id) {
                    return input[i];
                }
            }
            return null;
        }
    });
//     filters.filter('attributesAsObject', function() {
//         return function(inputArray) {
//             var array = [];
//             for (var i = 0; i < inputArray.length; i++) {
//                 array.push({"title":inputArray[i]});
//                 //Do something
//             }
//             return array;
//         }
//     });
    return filters;
});