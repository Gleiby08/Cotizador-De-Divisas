const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info');

    form.addEventListener('submit', async e => {
    e.preventDefault();
    
    try {
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const priceHigh = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const pricesLow = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const variation = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        console.log(price);

        if(amountValue === ''){
            const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE;
            coinInfo.innerHTML - `
            <p class="info">El precio es: <span class="price">${price}</span></p>
                <p class="info">El precio más alto es: <span class="price">${priceHigh}</span></p>
                <p class="info">El precio más bajo es: <span class="price">${priceLow}</span></p>
                <p class="info">Variación 24H: <span class="price">${variation}</span></p>
                <p class="info">Puede comprar: <span class="price">${result.toFixed}(4) ${cryptoSelected}</span></p>
                `;
         
        } else
        {
            coinInfo.innerHTML - `
            <p class="info">El precio es: <span class="price">${price}</span></p>
                <p class="info">El precio más alto es: <span class="price">${priceHigh}</span></p>
                <p class="info">El precio más bajo es: <span class="price">${priceLow}</span></p>
                <p class="info">Variación 24H: <span class="price">${variation}%</span></p>
                `;
            }
        } catch (error) {
        
        
        
        }
    });
    

        
        
       
    
        
