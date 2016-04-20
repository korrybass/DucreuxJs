# DucreuxJs
Simple Frontend Utility Framework. 

This framework was created to help with normal frontend tasks such as validation, simple elem querying, custom directives, element height equalizer, videoBox (only for self hosted videos at the moment), simple UI masking, geolocation.

Still in very experimental state will be streamlined and new features added soon.

###Element Querying
du.query(name_of_elem);
example html markup to come

###Element equalizer
du.equalizer();
example html markup to come

###Form validation
du.validate("input_element_name");
Example
```html
<div class="row " data-evendiv>
                <h2>Equalizer for Even DIVS</h2>
                <div class="">
                    <div class=" panel" data-evenchild>
                        your text here
                    </div>
                </div>
                <div class="">
                    <div class="panel" data-evenchild>
                    </div>
                </div>
                <div class="">
                    <div class="panel" data-evenchild>
                        your text here
                    </div>
                </div>
            </div>
```
###Geolocation 
du.geoLocate(callback_function);

###VideoBox
du.videoBox();
example html markup to come

