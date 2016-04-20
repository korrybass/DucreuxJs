(function(window) {
    /////////// UTILS \\\\\\\\\\\	
    var DuQuery = function(els) {
        if (typeof els === "undefined") {
            return this;
        } else {
            for (var i = 0; i < els.length; i++) {
                this[i] = els[i];
            }
            this.length = els.length;
        }
    };
    DuQuery.prototype.forEach = function(callback) {
        this.map(callback);
        return this;
    };
    DuQuery.prototype.map = function(callback) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results; //.length > 1 ? results : results[0];
    };

    ////// DOM MANIPULATION \\\\\\\
    DuQuery.prototype.addClass = function(classes) {
        var className = "";
        if (typeof classes !== 'string') {
            for (var i = 0; i < classes.length; i++) {
                className += " " + classes[i];
            }
        } else {
            className = " " + classes;
        }
        return this.forEach(function(el) {
            el.className += className;
        });
    };
    DuQuery.prototype.removeClass = function(classes) {
        return this.forEach(function(el) {
            var cs = el.className.split(' '), i;
            while ((i = cs.indexOf(classes)) > -1) {
                cs = cs.slice(0, i).concat(cs.slice(++i));
            }
            el.className = cs.join(' ');
        });
    };
    /////////// END UTILS \\\\\\\\\\\

    ducreuxFns = {
        query: function(selector) {
            var els;
            if (typeof selector === 'string') {
                els = document.querySelectorAll(selector);
            } else if (selector.length) {
                els = selector;
            } else {
                els = [selector];
            }
            return new DuQuery(els);
        },
        validate: function(elem) {
			console.log("validate engaged");
			
            var elements = this.query(elem);
            var formElements = [];
			console.log(elements);
            for(i=0;i < elements.length; i++){
                console.log('loop ran', elements[i].nodeName);
                if(elements[i].nodeName == "FORM"){
                    formElements = elements[i].elements;
					console.log(formElements);
                }
            }
            this.query(formElements).forEach(function(e) {
                var x = e.value;
                function clearError() {
                    for (; i < nodes.length; i++) {
                        if (nodes[i].className) {
                            if (/error/.test(nodes[i].className)) {
                                //console.log('no error', elem);
                                nodes[i].style.display = "none";
                            }
                        }
                    }
                }

                if (e.hasAttribute('required')) {
                    var nodes = e.parentNode.childNodes,
                        i = 0;
                    //console.log(x);
                    for (; i < nodes.length; i++) {
                        if (nodes[i].className) {

                            switch (e.type || e.name) {
                                case 'tel':

                                    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(x)) {
                                        nodes[i].style.display = "block";
                                        return false;
                                    } else {
                                        clearError();
                                        return true;
                                    };
                                    break;
                                case 'number':
                                    if (!/^\d+$/.test(x)) {
                                        nodes[i].style.display = "block";
                                        return false;
                                    } else {
                                        clearError();
                                        return true;
                                    }
                                    break;
                                case 'text':
                                    //console.log(e);
                                    //attr should be data-date
                                    if (e.hasAttribute('data-date')) {
                                        if (!/^[0-9/]+$/.test(x)) {
                                            //		console.log('date att confirmed');
                                            nodes[i].style.display = "block";
                                            return false;
                                        } else {
                                            clearError();
                                            return true;
                                        }
                                    }
                                    //attr should be data-zipcode
                                    if (e.hasAttribute('data-zipcode')) {
                                        if (!/^[0-9]+$/.test(x)) {
                                            //console.log('date att confirmed');
                                            nodes[i].style.display = "block";
                                            return false;
                                        } else {
                                            clearError();
                                            return true;
                                        }
                                    }
                                    if (!/^[a-zA-Z]+$/.test(x)) {
                                        nodes[i].style.display = "block";
                                        return false;
                                    } else {
                                        clearError();
                                        return true;
                                    }
                                    break;
                                case 'email':
                                    if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(x)) {
                                        nodes[i].style.display = "block";
                                        return false;
                                    } else {
                                        clearError();
                                        return true;
                                    }
                                    break;
                                default:
                                    if (x == null || x == "") {
                                        console.log('empty');
                                        for (; i < nodes.length; i++) {
                                            if (nodes[i].className) {
                                                if (/error/.test(nodes[i].className)) {
                                                    nodes[i].style.display = "block";
                                                }
                                            }
                                        }
                                        return false;
                                    } else {
                                        clearError();
                                        return true;
                                    }
                                    break;
                            }
                        }
                    }
                } else {
                    return true;
                }
            });
        },
        directive: function(file, attr, callback) {
            xhr = new XMLHttpRequest();
            xhr.open("GET", file, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    var status = xhr.status;
                    if ((status >= 200 && status < 300) || status === 304) {
                        htmlDoc = xhr.responseText;
                        //console.log("response >>", xhr);
                        var directves = document.querySelectorAll('[' + attr + ']');
                        i = 0
                        for (; i < directves.length; i++) {
                            if (directves[i].hasAttribute(attr)) {
                                directves[i].innerHTML += htmlDoc;
                            }
                        }
                        callback();
                    } else {
                        console.log('failed')
                    }
                }
            };
            xhr.send(null);
        },
        equalizer: function() {
			console.log('equalizer engaged');
            var evenDiv = document.querySelector('[data-evendiv]');
            function equalizeDivs() {
                if (evenDiv) {
                    var evenChildren = evenDiv.querySelectorAll('[data-evenchild]');
                    if (evenChildren.length > 0) {
                        var childrenHeights = [];
                        for (i = 0; i <= evenChildren.length; i++) {
                            if (evenChildren[i] == undefined) {
                                break;
                            }
                            else {
                                evenChildren[i].style.height = '100%';
                                childrenHeights.push(evenChildren[i].clientHeight);
                            }
                        }
                        var highestDiv = Math.max.apply(Math, childrenHeights);

                        for (i = 0; i <= evenChildren.length; i++) {
                            if (evenChildren[i] == undefined) {
                                break;
                            }
                            else {
                                evenChildren[i].style.height = highestDiv + 'px';
                            }
                        }
                    }
                }
            }
            equalizeDivs();
            window.onresize = function() { equalizeDivs() }
        },
        videoBox: function() {
            var video = document.querySelectorAll('.vidIframe');
            for (i = 0; i < video.length; i++) {
                video[i].addEventListener('click', play);
            }
            function play(e) {
				e.preventDefault();
				currentElem = this;
                var videoBox = document.createElement('DIV'),
                    videoContainer = document.createElement("DIV"),
                    videoHolder = document.createElement("DIV"),
                    exitScreen = document.createElement("DIV");

					videoBox.className = 'videoBox-container';

                    var video = document.createElement("IFRAME");
					video.href = this.href;
                    video.style.display = 'block';

					var videoType = (function(){
						var type;
						if(currentElem.href.indexOf("youtube") != -1){
							type = "youtube";
						}else{
							type = "video";
						}
						return type;
					}());
					switch(videoType){
						case "youtube":
							var urlStart = video.href.slice(0, video.href.indexOf("/watch"));
							var urlEnd = video.href.slice(video.href.indexOf("/watch"));
							urlEnd = urlEnd.replace("watch?v=", "");
							video.href = urlStart +"/embed" + urlEnd;
							break;
						default: 
							break;
					}
				
                iframeId = Math.round(Math.random() * 9999999).toString();
                video.src = video.href;
                videoHolder.className = 'videoHolder';
                videoContainer.className = 'videoContainer';
                exitScreen.className = "exitScreen";

                //append to document
                videoBox.appendChild(videoHolder);
                videoHolder.appendChild(videoContainer);
                videoContainer.appendChild(video);
                videoContainer.appendChild(exitScreen);
                document.body.appendChild(videoBox);

                videoBox.addEventListener('click', function(e) {
                    if (e.target != e.currentTarget && e.target.nodeName == 'VIDEO') {
                        return;
                    } else {
                        document.body.removeChild(videoBox);
                    }
                });
            }
        },
        mask: function (str, textbox, loc, delim) {
            var test = this.query('[data-dumask]');
            console.log(test);
            //Begins the function with a name mask, and sets 4 parameters, as mentioned above.
            var locs = loc.split(',');
            //Creates an array out of multiple numbers (to add each separator on its own).
            for (var i = 0; i <= locs.length; i++) {
                //Begins a loop through the array of locations.
                for (var k = 0; k <= str.length; k++) {
                    //Begins a nested loop through each character to check if the delimiter is already there.
                    if (k == locs[i]) {
                        //Begins a conditional statement that checks to see what character number we are holding.
                        if (str.substring(k, k + 1) != delim) {
                            //Begins a nested conditional statement if the character we're holding is the correct character location, and checks to see if it is the same character as the delimiter.
                            str = str.substring(0, k) + delim + str.substring(k, str.length)
                            //if the character is not the same as the delimiter, it will cut the value in half and insert the delimiter
                        }
                    }
                }
            }
            textbox.value = str
        },
        geoLocate: function(callback, error) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    callback(position);
                });
            } else {
                if (typeof error === "function") { }
                error();
                console.log("is not available");
            }
        },
        pubsub: function() {
            (function(window, doc, undef) {
                var topics = {},
                    subUid = -1,
                    pubsubz = {};

                pubsubz.publish = function(topic, args) {

                    if (!topics[topic]) {
                        console.error('Event ' + topic + ' does not exist');
                        return false;
                    }
                    setTimeout(function() {
                        console.log(topics, topics[topic]);
                        var subscribers = topics[topic],
                            len = subscribers ? subscribers.length : 0;

                        while (len--) {
                            subscribers[len].func(topic, args);
                        }
                    }, 0);
                    return true;
                };

                pubsubz.subscribe = function(topic, func) {

                    if (!topics[topic]) {
                        topics[topic] = [];
                    }

                    var token = (++subUid).toString();
                    topics[topic].push({
                        token: token,
                        func: func
                    });
                    return token;
                };

                pubsubz.unsubscribe = function(token) {
                    for (var m in topics) {
                        if (topics[m]) {
                            for (var i = 0, j = topics[m].length; i < j; i++) {
                                if (topics[m][i].token === token) {
                                    topics[m].splice(i, 1);
                                    return token;
                                }
                            }
                        }
                    }
                    return false;
                };

                getPubSubz = function() {
                    return pubsubz;
                };

                window.pubsubz = getPubSubz();

            } (window, window.document));
        }
    }

    /////export to window
    window.du = ducreuxFns;
} (window));