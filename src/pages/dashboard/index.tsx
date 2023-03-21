import Head from 'next/head';
import styles from './styles.module.sass';

import { Header } from '../../components/Header'
import { FiRefreshCcw } from 'react-icons/fi'
import { canSSRAuth } from '@/src/utils/SSR/canSSRAuth';
import api, { setupAPIClient } from '@/src/services/api';
import { useState } from 'react';
import apiOrder from '../../services/http/order/index'
import Modal from 'react-modal'
import { ModalOrder } from '@/src/components/Modal';
import { useUser } from '@/src/hooks/useUser/useUsers';


interface OrderProps{
    id:string
    table: string | number
    status: boolean
    draft: boolean 
    name: string | null
}

interface HomeProps{
    orders: OrderProps[]
}

export interface OrderItemProps {
  id: string
  amount: string
  order_id: string
  product_id: string
  product:{
    id: string
    name:string
    description: string
    price:string
    banner: string
  }
  order: {
    id: string
    table: string
    status: boolean
    name: string | null
    total: number
  }
}

export default function Dashboard({orders} : HomeProps){
    const [ordersList, setOrderList] = useState(orders || [])
    const {authorization} = useUser()

    
    const [modalItem, setModalItem] = useState<OrderItemProps[]>([])
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal(){
      setModalVisible(false)
    }
    
    async function handleOpenModal(order_id:string){
      console.log(order_id);
      
      // const response  =  await apiOrder.getOrder(order_id, authorization)

      const response = await api.get(`/order/detail/` + order_id,{
        headers: {
          Authorization: authorization
        }
      })
      console.log(response.data);

      setModalItem(response.data)
      setModalVisible(true)      
    }

    async function finishModal(order_id:string) {
      // const response = await api.delete(`/order/` + order_id,{
      //   headers:{
      //     Authorization: authorization
      //   }
      // })
      const response = await api.put('/order',{
        headers:{
          Authorization:authorization
        }
      })
      setModalVisible(false)
    }


    Modal.setAppElement("#__next")
  return(
    <>
    <Head>
      <title>Painel - Sujeito Pizzaria</title>  
    </Head>
    <div>
      <Header/>
    
      <main className={styles.container}>

        <div className={styles.containerHeader}>
          <h1>Últimos pedidos</h1>
          <button>
            <FiRefreshCcw size={25} color="#3fffa3"/>
          </button>
        </div>

        <article className={styles.listOreders}>
            {
                ordersList.map((item) => (
                    <section key={item.id} className={styles.orderItem}> 
                        <button onClick={() => handleOpenModal(item.id)}>
                            <div className={styles.tag}></div>
                            <span>Mesa {item.table}</span>
                        </button>
                    </section>                  
                ))
            }

        </article>

      </main>
      {modalVisible && (
        <ModalOrder
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
          handleFinishOrder={finishModal}
        />
      )}

    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(ctx) => {
  const apiClient = setupAPIClient(ctx)
  const response = await apiClient.get('/order/all')
        return{
            props:{
                orders: response.data
            }
        }
    })