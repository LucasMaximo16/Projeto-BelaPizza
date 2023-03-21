import { OrderItemProps } from '@/src/pages/dashboard/index'
import { parse } from 'path'
import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'
import { string } from 'yup'
import styles from './styles.module.sass'
interface ModalOrderProps{
    isOpen: boolean
    onRequestClose: () => void
    order: OrderItemProps[]
    handleFinishOrder: (order_id:string) => void
}

export function ModalOrder({isOpen, onRequestClose, order, handleFinishOrder} : ModalOrderProps){

    const priceInitial = 0

    const multiplica = order.map((item) => {
         return parseFloat(item.amount) * parseFloat(item.product.price)
    })
    
        const total = multiplica.reduce((item, acumulador) => {
            return item + acumulador
        }, priceInitial)
   
    
    const customStyles = {
        content:{
            top: '50%',
            bottom:'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1d2e'
        }
    }
    
    return(
        <>
          <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={customStyles}>

            <button
            type='button'
            onClick={onRequestClose}
            className="react-modal-close"
            style={{background : 'transparent', border: 0}}
            >
                <FiX size={45} color='#f34748' />
            </button>

            <div className={styles.container}>
                <h2>Detalhes do Pedido</h2>
                <span className={styles.table}>
                    Mesa: <strong>{order[0].order.table}</strong>
                </span>
                {order.map((item) =>( 
                    <section key={item.id} className={styles.containerItem}>
                        <span>{item.amount} - <strong>{item.product.name}</strong></span>
                        <span className={styles.description}>{item.product.description}</span>
                    </section>
                ))}

                <span className={styles.totalOrder}>
                    Total: <strong> {total} R$</strong> 
                </span>

                <button className={styles.buttonOrder} onClick={() => handleFinishOrder(order[0].order_id)}>
                    Concluir pedido
                </button>
            </div>
            
          </Modal>
        </>
    )
}