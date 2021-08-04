const { Observable, pipe } = rxjs
const { map } = rxjs.operators

function espejarInput() {
    return new Observable(suscriber => {
        function ateEventInput() {
            let dato = document.querySelector('input').value
            if (dato == 'error') {
                suscriber.error('Ingresa Error')
            }
            else if (dato == 'complete') {
                suscriber.complete()
            }
            else {
                let datoEspejado = [];       
                let array = dato.split("").reverse().join("")              
                datoEspejado.push(array)
                suscriber.next(datoEspejado)
            }
        }

        document.querySelector('input').addEventListener('input', ateEventInput)
        return () => {
            document.querySelector('input').removeEventListener('input', ateEventInput)
            document.querySelector('input').disabled = true
            document.querySelector('label').innerText = ''
        }
    })
}

let suscriptorEspejarInput = espejarInput()
    .subscribe(
        dato => {
            document.querySelector('label').innerText = dato
        },   
        error => console.error(error), 
        () => console.warn('Completo ') 
    )

setTimeout(() => {
    console.warn('Realiza Unsubscribe ')
    suscriptorEspejarInput.unsubscribe()
}, 30000)