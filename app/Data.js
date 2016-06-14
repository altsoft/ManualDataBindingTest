/**
 * 
 * @author user
 * @constructor
 */
define(function () {
    var data = [
        {
            firstName: 'John'
            , lastName: 'Doe'
            , eMail: 'doe@rambler.com'
            , dateFrom: new Date()
            , dateTo: new Date()
            , isPaid: true
            , cost: 100
        },
        {
            firstName: 'Jane'
            , lastName: 'Doe'
            , eMail: 'jane@domain.ru'
            , dateFrom: new Date()
            , dateTo: new Date()
            , isPaid: false
            , cost: 150
        },
    ];
    return data;
});
