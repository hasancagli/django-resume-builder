// COOKIE GENERATION CODE
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// WHEN NEW EDUCATION ADDED
function createEducation() {
    const val = document.querySelector('#inputEducation').value; // GET INPUT VALUE
    // FETCH DATA
    fetch('createEducation/', {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
        body: JSON.stringify({'desc':val}) //JavaScript object of data to POST
    })
    .then(response => {
            return response.json() //Convert response to JSON
    })
    .then(data => {
        
        console.log(data);
        // IF IT BECOMES SUCCESSFULL
        if (data['message'] == "success") {
            // UPDATE HTML PAGE DYNAMICALLY
            const div = document.createElement('div');
            div.className = 'educationInfo';
            div.innerHTML = `
                <h4 class="nameEd">${data['data']['desc']}</h4>
                <button onclick="deleteEducation(${data['data']['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
            `;

            // UPDATE RESUME PREVIEW
            const h = document.createElement('h4');
            h.className = 'date';
            h.innerHTML = `${data['data']['desc']}`

            // UPDATE RELATED DIVS
            document.getElementById('educationInfos').appendChild(div);
            document.getElementById('educationsDiv').appendChild(h);

            // SET INPUT VALUE TO ""
            document.getElementById('inputEducation').value='' ; 
        }else {
            
            // IF ANY ERROR HAPPENS
            messages = data['messages'];
            for(var i =0; i < messages.length; i++) {
                
                const div = document.createElement('div');
                div.className = 'message';
                div.innerHTML = `<h4 class="messageText">${messages[i]}</h4>`
                document.getElementById('educationMessages').appendChild(div);

                // AFTER TWO SECONDS, DESTROY ERROR MESSAGES
                setTimeout(() => {
                    document.getElementById('educationMessages').innerHTML = "";
                }, 2000)
            }
        }
    })

}

function deleteEducation(id) {
    fetch('delete/' + id.toString(), {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
    })
    .then(response => {
        return response.json() //Convert response to JSON
    })
    .then(data => {
        if (data['message'] == "success") {
            general = document.getElementById('educationInfos')
            general.innerHTML = "";

            general2 = document.getElementById('educationsDiv')
            general2.innerHTML = "";

            educations = data['educations'];

            for(var i = 0; i < educations.length; i++) {
                element = educations[i];

                const div = document.createElement('div');
                div.className = 'educationInfo';

                div.innerHTML = `
                    <h4 class="nameEd">${element['description']}</h4>
                    <button onclick="deleteEducation(${element['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
                `;

                const h = document.createElement('h4');
                h.className = 'date';
                h.innerHTML = `${element['description']}`

                general.appendChild(div);
                general2.appendChild(h);
            }
        }
        

    })
}

function createSkill() {
    const val = document.querySelector('#inputSkill').value;
    fetch('createSkill/', {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
        body: JSON.stringify({'skill':val}) //JavaScript object of data to POST
    })
    .then(response => {
            return response.json() //Convert response to JSON
    })
    .then(data => {
        
        console.log(data);
        // IF IT BECOMES SUCCESSFULL
        if (data['message'] == "success") {
            const div = document.createElement('div');
            div.className = 'educationInfo';

            div.innerHTML = `
                <h4 class="nameEd">${data['data']['skill']}</h4>
                <button onclick="deleteSkill(${data['data']['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
           `;

            const h = document.createElement('h3');
            h.className = 'textResume';
            h.innerHTML = `${data['data']['skill']}`

            document.getElementById('skillInfos').appendChild(div);
            document.getElementById('skillsDiv').appendChild(h);

            document.getElementById('inputSkill').value='' ; 
        }else {
            
            // IF ANY ERROR HAPPENS
            messages = data['messages'];
            for(var i =0; i < messages.length; i++) {
                
                const div = document.createElement('div');
                div.className = 'message';

                div.innerHTML = `<h4 class="messageText">${messages[i]}</h4>`

                document.getElementById('skillMessages').appendChild(div);

                setTimeout(() => {
                    document.getElementById('skillMessages').innerHTML = "";
                }, 2000)
            }
        }
    })

}

function deleteSkill(id) {
    fetch('deleteSkill/' + id.toString(), {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
    })
    .then(response => {
        return response.json() //Convert response to JSON
    })
    .then(data => {
        if (data['message'] == "success") {
            general = document.getElementById('skillInfos')
            general.innerHTML = "";

            general2 = document.getElementById('skillsDiv');
            general2.innerHTML = "";

            skills = data['skills'];

            for(var i = 0; i < skills.length; i++) {
                element = skills[i];

                const div = document.createElement('div');
                div.className = 'educationInfo';

                div.innerHTML = `
                    <h4 class="nameEd">${element['description']}</h4>
                    <button onclick="deleteSkill(${element['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
                `;

                const h = document.createElement('h3');
                h.className = 'textResume';
                h.innerHTML = `${element['description']}`

                general.appendChild(div);
                general2.appendChild(h);
            }
        }
        

    })
}


function createHobby() {
    const val = document.querySelector('#inputHobby').value;
    fetch('createHobby/', {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
        body: JSON.stringify({'desc':val}) //JavaScript object of data to POST
    })
    .then(response => {
            return response.json() //Convert response to JSON
    })
    .then(data => {
        
        console.log(data);
        // IF IT BECOMES SUCCESSFULL
        if (data['message'] == "success") {
            const div = document.createElement('div');
            div.className = 'educationInfo';

            div.innerHTML = `
                <h4 class="nameEd">${data['data']['desc']}</h4>
                <button onclick="deleteHobby(${data['data']['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
            `;

            const h = document.createElement('h3');
            h.className = 'textResume';
            h.innerHTML = `${data['data']['desc']}`

            document.getElementById('hobbyInfos').appendChild(div);
            document.getElementById('hobbiesDiv').appendChild(h);

            document.getElementById('inputHobby').value='' ; 
        }else {
            
            // IF ANY ERROR HAPPENS
            messages = data['messages'];
            for(var i =0; i < messages.length; i++) {
                
                const div = document.createElement('div');
                div.className = 'message';

                div.innerHTML = `<h4 class="messageText">${messages[i]}</h4>`

                document.getElementById('hobbyMessages').appendChild(div);

                setTimeout(() => {
                    document.getElementById('hobbyMessages').innerHTML = "";
                }, 2000)
            }
        }
    })

}

function deleteHobby(id) {
    fetch('deleteHobby/' + id.toString(), {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
    })
    .then(response => {
        return response.json() //Convert response to JSON
    })
    .then(data => {
        if (data['message'] == "success") {
            general = document.getElementById('hobbyInfos')
            general.innerHTML = "";

            general2 = document.getElementById('hobbiesDiv');
            general2.innerHTML = "";

            hobbys = data['hobbys'];

            for(var i = 0; i < hobbys.length; i++) {
                element = hobbys[i];

                const div = document.createElement('div');
                div.className = 'educationInfo';

                const h = document.createElement('h3');
                h.className = 'textResume';
                h.innerHTML = `${element['description']}`

                div.innerHTML = `
                    <h4 class="nameEd">${element['description']}</h4>
                    <button onclick="deleteHobby(${element['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
                `;

                general.appendChild(div);
                general2.appendChild(h);
            }
        }
        

    })
}


function createExperience() {
    const start = document.querySelector('#startEx').value;
    const end = document.querySelector('#endEx').value;
    const company = document.querySelector('#companyEx').value;
    const title = document.querySelector('#titleEx').value;
    const desc = document.querySelector('#descriptionEx').value;
    fetch('createExperience/', {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
        body: JSON.stringify({'start':start, 'end': end, 'company': company, 'title': title, 'description': desc}) //JavaScript object of data to POST
    })
    .then(response => {
            return response.json() //Convert response to JSON
    })
    .then(data => {
        // IF IT BECOMES SUCCESSFULL
        if (data['message'] == "success") {
            // ADD TO INPUT AREA
            const div = document.createElement('div');
            div.className = 'educationInfo';

            div.innerHTML = `
                <h4 class="nameEd">${data['data']['company']} - ${data['data']['title']}</h4>
                <button onclick="deleteExperience(${data['data']['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
            `;

            document.getElementById('experienceInfos').appendChild(div);

            // ADD TO RESUME PREVIEW
            const div2 = document.createElement('div');
            div2.className = 'experienceRow';

            div2.innerHTML = `
            <div class="exLeft">
                <h4 class="date">${data['data']['start']} - ${data['data']['end']}</h4>
                <h4 class="company">${data['data']['company']}</h4>
            </div>
            <div class="exRight">
                <h4 class="date">${data['data']['title']}</h4>
                <h4 class="description">${data['data']['desc']}</h4>

            </div>
            `;

            document.getElementById('workExperiences').appendChild(div2);

            document.getElementById('startEx').value='' ; 
            document.getElementById('endEx').value='' ; 
            document.getElementById('companyEx').value='' ; 
            document.getElementById('titleEx').value='' ; 
            document.getElementById('descriptionEx').value='' ; 
        }else {
            
            // IF ANY ERROR HAPPENS
            messages = data['messages'];
            for(var i =0; i < messages.length; i++) {
                
                const div = document.createElement('div');
                div.className = 'message';

                div.innerHTML = `<h4 class="messageText">${messages[i]}</h4>`

                document.getElementById('experienceMessages').appendChild(div);

                setTimeout(() => {
                    document.getElementById('experienceMessages').innerHTML = "";
                }, 2000)
            }
        }
    })

}

function deleteExperience(id) {
    fetch('deleteExperience/' + id.toString(), {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
    })
    .then(response => {
        return response.json() //Convert response to JSON
    })
    .then(data => {
        if (data['message'] == "success") {
            // DELETE FROM INPUTS
            general = document.getElementById('experienceInfos')
            general.innerHTML = "";

            // DELETE FROM RESUME PREVIEW
            general2 = document.getElementById('workExperiences')
            general2.innerHTML = "";

            experiences = data['experiences'];

            for(var i = 0; i < experiences.length; i++) {
                element = experiences[i];

                const div = document.createElement('div');
                div.className = 'educationInfo';

                const div2 = document.createElement('div');
                div2.className = 'experienceRow';


                div2.innerHTML = `
                    <div class="exLeft">
                        <h4 class="date">${element['startDate']} - ${element['endDate']}</h4>
                        <h4 class="company">${element['company']}</h4>
                    </div>
                    <div class="exRight">
                        <h4 class="date">${element['title']}</h4>
                        <h4 class="description">${element['description']}</h4>

                    </div>
                `;

                div.innerHTML = `
                    <h4 class="nameEd">${element['company']} - ${element['title']}</h4>
                    <button onclick="deleteExperience(${element['id']})" class="btn btn-outline-danger btn-sm" type="submit">Delete</button>
                `;

                general.appendChild(div);
                general2.appendChild(div2);
            }

            


        }
        

    })
}

function updateInfos(){
    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const phoneNumber = document.querySelector('#phoneNumber').value;
    const email = document.querySelector('#email').value;
    const title = document.querySelector('#title').value;
    const location = document.querySelector('#location').value;
    const introduce = document.querySelector('#introduce').value;

    fetch('updateInfos/', {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
            'X-CSRFToken': csrftoken,
    },
        body: JSON.stringify({'name':name, 'surname': surname, 'phoneNumber': phoneNumber, 'email': email, 'title': title, 'location': location, 'introduce': introduce}) //JavaScript object of data to POST
    })
    .then(response => {
            return response.json() //Convert response to JSON
    })
    .then(data => {
        nameArea = document.querySelector('#nameArea');
        surnameArea = document.querySelector('#surnameArea');
        emailArea = document.querySelector('#emailArea');
        phoneNumberArea = document.querySelector('#phoneNumberArea');
        titleArea = document.querySelector('#titleArea');
        introduceArea = document.querySelector('#introduceArea');
        locationArea = document.querySelector('#locationArea');

        nameArea.innerHTML = data['data']['name']
        surnameArea.innerHTML = data['data']['surname']
        emailArea.innerHTML = data['data']['email']
        phoneNumberArea.innerHTML = data['data']['phoneNumber']
        locationArea.innerHTML = data['data']['location']
        titleArea.innerHTML = data['data']['title']
        introduceArea.innerHTML = data['data']['introduce']

    })

}

setInterval(() => {
    updateInfos();
}, 10000)