function redirectToPage() {
    // Get the value from the input field
    var city = document.getElementById('demo-city').value;

    // Construct the URL based on the input value
    var url = city + '.html';

    // Redirect to the constructed URL
    window.location.href = url;
}