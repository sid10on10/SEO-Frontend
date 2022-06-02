let main = document.body
let main_div = document.getElementById('resultsDiv')

function submitData(){
    let keyword1 = document.getElementById('keyword1').value
    let keyword2 = document.getElementById('keyword2').value
    let keyword3 = document.getElementById('keyword3').value
    let keyword4 = document.getElementById('keyword4').value
    let keyword5 = document.getElementById('keyword5').value
    let keyword6 = document.getElementById('keyword6').value
    let keyword7 = document.getElementById('keyword7').value
    let keyword8 = document.getElementById('keyword8').value
    let keyword9 = document.getElementById('keyword9').value
    let keyword10 = document.getElementById('keyword10').value
    let geography = document.getElementById('geography').value
    let domain = document.getElementById('domain').value

    let keywords = [keyword1, keyword2, keyword3, keyword4, keyword5, keyword6, keyword7, keyword8, keyword9, keyword10]
    document.getElementById('loader').style.display = 'block';
    document.getElementById('errorblock').style.display = 'none';
    processData(keywords, geography, domain)
}

async function getData(url, keywords, geography, domain){
    let data = await await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({keywords:keywords, geography: geography, domain: domain})
      });
    let response = await data.json()
    if(response['message']==='failed'){
        document.getElementById('errorblock').style.display = 'block';
        return
    }
    document.getElementById('loader').style.display = 'none';
    return response
}

async function processData(keywords, geography, domain){
    main_div.innerHTML = ""
    let response = await getData(`http://127.0.0.1:3000/`, keywords, geography, domain)
    data = response["results"]
    for(i of data){
        var container = document.createElement("div");
        container.setAttribute("class","container");
        container.setAttribute("style","margin-top:30px;width:100%;")

        var row = document.createElement("div");
        row.setAttribute("class","row");

        var card = document.createElement("div");
        card.setAttribute("class","card");
        card.setAttribute("style","width:100%;")

        var left = document.createElement("div");
        left.setAttribute("class","col-md-8");

        var sec_card = document.createElement("div");
        sec_card.setAttribute("class","sectioncard");
        sec_card.innerHTML = "Keyword - " + i["keyword"];

        var domaincard = document.createElement("div");
        domaincard.setAttribute("class","titlecard");
        domaincard.innerHTML = "Domain - " + domain

        if(i['found']){
            var rankcard = document.createElement("div");
            rankcard.setAttribute("class","titlecard");
            rankcard.innerHTML = "Rank - " + i['rank']

            var titlecard = document.createElement("div");
            titlecard.setAttribute("class","datecard");
            titlecard.innerHTML = "Title - " + i['title']

            var abstractcard = document.createElement("div");
            abstractcard.setAttribute("class","abstractcard");
            abstractcard.innerHTML = "Description - " + i['description'];
        }else{

            var rankcard = document.createElement("div");
            rankcard.setAttribute("class","titlecard");
            rankcard.innerHTML = "Rank - " + i['message']

            var titlecard = document.createElement("div");
            titlecard.setAttribute("class","datecard");
            titlecard.innerHTML = "Not Found"

            var abstractcard = document.createElement("div");
            abstractcard.setAttribute("class","abstractcard");
            abstractcard.innerHTML = "Not Found"
        }
        

        //append all the elements in the left
        left.append(sec_card, domaincard, rankcard, titlecard, abstractcard);

        var innerrow = document.createElement("div");
        innerrow .setAttribute("class","row card-body");

        innerrow.append(left)
        card.append(innerrow);
        row.append(card);
        container.append(row);

        main_div.append(container);
        main.append(main_div)
        console.log('---------------> container added------------->')

    }

}

