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

        sos: function () {
            if (!this.checkSimulator()) {
              // OK, LOL, this is a very poor SOS implementation, but here we go to produce the ...---... effect:
	            window.plugins.flashlight.switchOn(); // .
              setTimeout(window.plugins.flashlight.switchOff,  400);
              setTimeout(window.plugins.flashlight.switchOn,   700); // ..
              setTimeout(window.plugins.flashlight.switchOff, 1000);
              setTimeout(window.plugins.flashlight.switchOn,  1300); // ...
              setTimeout(window.plugins.flashlight.switchOff, 1600);
              setTimeout(window.plugins.flashlight.switchOn,  1900); // ...-
              setTimeout(window.plugins.flashlight.switchOff, 2700);
              setTimeout(window.plugins.flashlight.switchOn,  3100); // ...--
              setTimeout(window.plugins.flashlight.switchOff, 3900);
              setTimeout(window.plugins.flashlight.switchOn,  4300); // ...---
              setTimeout(window.plugins.flashlight.switchOff, 5100);
              setTimeout(window.plugins.flashlight.switchOn,  5500); // ...---.
              setTimeout(window.plugins.flashlight.switchOff, 5800);
              setTimeout(window.plugins.flashlight.switchOn,  6100); // ...---..
              setTimeout(window.plugins.flashlight.switchOff, 6400);
              setTimeout(window.plugins.flashlight.switchOn,  6700); // ...---...
              setTimeout(window.plugins.flashlight.switchOff, 7000);
            }
        },

        stroboscope: function () {
            if (!this.checkSimulator()) {
              var inter = setInterval(
                function() {
                  window.plugins.flashlight.toggle()
                }, 100
              );

              setTimeout(function() {
                clearInterval(inter);
                // let's make sure it's off
  	            window.plugins.flashlight.switchOff();
              }, 5000);
            }
        },

        toggleAfter: function(ms) {
          setTimeout(function() {
	            window.plugins.flashlight.toggle(this.onSuccess, this.onError);
          }, ms);
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