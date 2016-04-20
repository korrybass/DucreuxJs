# DucreuxJs
Simple Frontend Utility Framework. 

This framework was created to help with normal frontend tasks such as validation, simple elem querying, custom directives, element height equalizer, videoBox (only for self hosted videos at the moment), simple UI masking, geolocation.

Still in very experimental state will be streamlined and new features added soon.

###Element Querying
du.query(name_of_elem);
example html markup to come

###Element equalizer
du.equalizer();  
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

###Form validation
du.validate("input_element_name");

###Geolocation 
du.geoLocate(callback_function);

###VideoBox
Call this in your script somewhere  
du.videoBox();  
Example 
```html
<a class="vidIframe"  href="https://www.youtube.com/watch?v=jDV5q37rGlg" >
	<span class="fi-play">Watch the video</span>
</a>
```
example html markup to come

