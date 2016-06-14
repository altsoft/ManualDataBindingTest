/**
 * 
 * @author user
 * @constructor
 */
define(function () {
    var content = [
        {name: 'Model check'
            , module: "forms/model-check-box"
            , width: 100
            , height: 30
            , bindFields:[{field: 'isPaid'}]
            , icon: 'icons/model/check.png'
        },
        {name: 'Model combo'
            , module: "forms/model-combo"
            , width: 100
            , height: 30
            , bindFields:[{field: 'firstName'}]
            , icon: 'icons/model/combo.png'
        },
        {name: 'Model date'
            , module: "forms/model-date"
            , width: 100
            , height: 30    
            , bindFields:[{field: 'dateFrom'},{field: 'dateTo'}]
            , icon: 'icons/model/date.png'
        },
        {name: 'Model spin'
             , module: "forms/model-spin"
             , width: 100
            , height: 30       
            , bindFields:[{field: 'cost'}]
            , icon: 'icons/model/spin.png'
        },
        {name: 'Model formatted field'
             , module: "forms/model-formatted-field"
             , width: 100
            , height: 30     
            , bindFields:[{field: 'firstName'},{field: 'lastName'},{field: 'eMail'}]
            , icon: 'icons/model/label.png'
        },
        {name: 'Model text area'
             , module: "forms/model-text-area"
             , width: 100
            , height: 100    
            , bindFields:[{field: 'firstName'},{field: 'lastName'},{field: 'eMail'}]
            , icon: 'icons/model/text.png'
        },
    ];
    return content;
});
