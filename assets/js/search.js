document.addEventListener('DOMContentLoaded', function() {
    function redirectToPage() {
        // Get the value from the input field
        var cityElement = document.getElementById('city');
        if (cityElement) {
            var city = cityElement.value;
            
            // Construct the URL based on the input value
            var url = city + '.html';
            
            // Redirect to the constructed URL
            window.location.href = url;
        } else {
            console.error('Element with id "city" not found.');
        }
    }

    // Attach the function to a button click or other event
    var button = document.getElementById('redirectButton');
    if (button) {
        button.addEventListener('click', redirectToPage);
    } else {
        console.error('Button with id "redirectButton" not found.');
    }
});
