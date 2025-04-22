(async function() {
    console.log('init start');

    const res = await fetch(
        'https://script.google.com/macros/s/AKfycbzSpscnJL8uUE02AOVfuAGfofh0i_r462yVqstGs7IOhUiDc6LCGWpheGw6ghRQURF-cQ/exec',
        {
            method: 'post',
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    )
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const text = await res.text();
    console.log('body3', text);

    const target = document.querySelector('#result')
    target.textContent = text;
})()

