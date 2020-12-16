jQuery(document).ready(function($){
     
    const gameConsoleRequest = axios.get('http://csc225.mockable.io/consoles'); //get consoles API
    gameConsoleRequest.then(function(response){
        
        const consoleData = response.data; //save data

        const displayConsoles = consoleData.map(function(console){ //Display basic console information

            const {id, name, image} = console;

            return`
            <div data-id="${id}" class="media m-3 border border-white">
                <img src="${image}" class="w-25" alt="Image of ${name}">
                <div id="body" class="media-body text-center p-2">
                    <h2>${name}</h2>
                    <button type="button" class="btn btn-dark btn-outline-light btn-lg">Click For More Information
                    </button>
                </div>
            </div>
            `;

        }).join('');
        $('#console-list').html(displayConsoles); //Appends console images + name to console-info
        $('#loading-animation').toggleClass('d-none'); //hides loader
    });
        
    jQuery('#console-list').on('click', '.media', function(){ //Show card with more console information
        $('#loading-animation').toggleClass('d-none'); //shows loader on click
        const id = $(this).attr('data-id');
        const consoleUrl = `http://csc225.mockable.io/consoles/${id}`;

        axios.get(consoleUrl).then(function(response){
            $('#loading-animation').toggleClass('d-none');
            
            const {id, name, price, country, releaseYear, image} = response.data; 
            
            $('#console').html(`
                <div class="card border-white text-center m-3" style="width: 18rem;">
                    <img class="card-img-top" src="${image}" alt="Image of ${name}">
                    <div class="card-body border">
                        <h5 class="card-title border-white">${name}</h5>
                        <p class="card-text">Information about your desired console shown below.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Country of origin: ${country}</li>
                        <li class="list-group-item">Release Year: ${releaseYear} </li>
                        <li class="list-group-item">Price: $${price}</li>
                 </ul>
                </div>
            `);                                                       
        });
    });
    
});