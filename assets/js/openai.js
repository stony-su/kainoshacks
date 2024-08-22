const form = document.getElementById('chat-form');
const responseTextarea = document.getElementById('response');

const API_KEY = 'sk-NYOi90yf4D0Ulf85RDXJq9GFmFrI-gLrusJwR0_VkPT3BlbkFJ8w7ToXb2a7IipyAdVaxxL2EwGAQHSCFAjHdi1xV04A';

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
        Recommendations for neighborhoods in ${city} with a budget of ${budget} that accommodate ${adults} adults and ${children} children, prioritize a size of ${priority} and are next to a school, have a low crime rate, a good community, and a multi-national community. Additional notes: ${message}
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
                let result = data.choices[0].message.content;
                
                // Remove `**` symbols
                result = result.replace(/\*\*/g, '');
                
                responseTextarea.value = result;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});
