const form = document.getElementById('chat-form');
const responseTextarea = document.getElementById('response');

const API_KEY = 'sk-GdqyfvL2fV76v6W8FkLopn5Kdg9azETbRX75QI_AXnT3BlbkFJ7gFcIy_gYnf9AikUPOIlNsZ-7o7x-BTqWhmTWGPiMA';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = document.getElementById('city').value.trim();
    const budget = document.getElementById('budget').value.trim();
    const adults = document.getElementById('adults').value.trim();
    const children = document.getElementById('children').value.trim();
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const school = document.getElementById('school').checked;
    const crime = document.getElementById('crime').checked;
    const communityGood = document.getElementById('community-good').checked;
    const communityMulti = document.getElementById('community-multi').checked;
    const message = document.getElementById('message').value.trim();

    const mytext = `
        City: ${city}
        Budget: ${budget}
        Adults: ${adults}
        Children: ${children}
        Priority: ${priority}
        Next to School: ${school}
        Low Crime Rate: ${crime}
        Good Community: ${communityGood}
        Multi National Community: ${communityMulti}
        Additional Notes: ${message}
    `;

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [{ role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});
