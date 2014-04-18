jQuery(document).ready(function() {

    function invite(data) {
        var self = this;
        self.deadline = ko.observable(data.deadline);
        self.title = ko.observable(data.title);
        self.subject = ko.observable(data.subject);
        self.castingDirector = ko.observable(data.castingDirector);
        self.link = ko.observable(data.link);
    }
	
    function ViewModel() {
        var self = this;
        self.invites = ko.observableArray([]); 
        //get datatable data
        jQuery.getJSON('invitation_data.html', {
                returnformat: 'json',
                bCurrent: $('#bCurrent').val()
            }, function(allData) {
                if (allData != null) {
                    var mappedData= jQuery.map(allData, function(item) { return new invite(item) });
                    self.invites(mappedData);
            }
        });
    }

    vm = new ViewModel();

    ko.applyBindings(vm);	
	
});