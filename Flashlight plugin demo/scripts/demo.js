(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        isAvailable: function () {
            if (!this.checkSimulator()) {
                window.plugins.flashlight.available(function(available) {
                    alert(available ? "YES" : "NO");
                });
            }
        },
        
        switchOn: function () {
            if (!this.checkSimulator()) {
	            window.plugins.flashlight.switchOn(this.onSuccess, this.onError);
            }
        },

        switchOff: function () {
            if (!this.checkSimulator()) {
	            window.plugins.flashlight.switchOff(this.onSuccess, this.onError);
            }
        },

        toggle: function () {
            if (!this.checkSimulator()) {
	            window.plugins.flashlight.toggle(this.onSuccess, this.onError);
            }
        },

        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.plugins.flashlight === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },

        // callbacks
        onSuccess: function(msg) {
            console.log('Succes callback: ' + msg);
        },

        onError: function(msg) {
            alert('Error callback: ' + msg);
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);