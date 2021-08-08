const { Observable, pipe } = rxjs
        const { map, tap } = rxjs.operators

        function espejarInput() {
            return new Observable(suscriber => {

                function ateEventInput() {
                    let dato = document.querySelector('input').value

                    if (dato == 'error') {
                        suscriber.error('Error')
                    }
                    else if (dato == 'complete') {
                        suscriber.complete()
                    }
                    else {
                        suscriber.next(dato)
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

        
        let suscriptorEspejarInput = espejarInput().pipe(
            tap(dato => console.log('pipe:', dato)),
            map(dato => dato.split('').reverse()),
            map(array => {
                
                return array
            }),
            map(array => array.join('')),
        )
            .subscribe(
                dato => {
                    
                    document.querySelector('label').innerText = dato
                },   
                error => console.error(error), 
                () => console.log('complete ') 
            )

        setTimeout(() => {
            console.log('Desuscripción ')
            suscriptorEspejarInput.unsubscribe()
        }, 30000)