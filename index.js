
const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info');


form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    

    
    
    
    
    // Validar selección de moneda y criptomoneda
    const coinSelected = coin.value; // Usar .value directamente
    const cryptoSelected = crypto.value; // Usar .value directamente
    
    // Validar que se hayan seleccionado opciones válidas
    if (coinSelected === '' || cryptoSelected === '') {
        alert('Por favor, selecciona una moneda y una criptomoneda');
        return;
    }

    const amountValue = amount.value || '1'; // Valor por defecto 1 si no se ingresa nada

    try {
        const response =  await  fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`);
        const data = await response.json();

        // Verificar si los datos existen
        if (!data.DISPLAY || !data.RAW) {
            throw new Error('No se encontraron datos de cotización');
        }

        const price = data.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const priceHigh = data.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const priceLow = data.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const variation = data.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        
        // Calcular cantidad de criptomoneda que se puede comprar
        const rawPrice = data.RAW[cryptoSelected][coinSelected].PRICE;
        const result = Number(amountValue) / rawPrice;

        // Actualizar interfaz
        coinInfo.innerHTML = `
            <p class="info">El precio es: <span class="price">${price}</span></p>
            <p class="info">El precio más alto es: <span class="price">${priceHigh}</span></p>
            <p class="info">El precio más bajo es: <span class="price">${priceLow}</span></p>
            <p class="info">Variación 24H: <span class="price">${variation}%</span></p>
            <p class="info">Puede comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected}</span></p>
        `;

    } catch (error) {
        console.error('Error en la cotización:', error);
        coinInfo.innerHTML = `<p class="info error">No se pudo obtener la cotización. Intenta de nuevo.</p>`;
    }
});
