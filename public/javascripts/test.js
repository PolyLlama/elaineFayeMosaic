var Measure = Backbone.Model.extend({
    initialize: function(){
        alert(this.name);
    },

    defaults: {
        name: 'default name',
        value: 0
    },

    someFunction: function(){

    }
});

var aNewMeasure = new Measure({name:'Measure One', value: 40000});