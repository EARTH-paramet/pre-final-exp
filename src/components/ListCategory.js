import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, ModalBody } from 'reactstrap'
import firebase from '../services/firebase'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultImg from './assets/default-img-category.jpg'
import styles from './css/Category.module.css'
// import './css/MyBootstrap.css'

const ListCategory = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})
  const toggle = () => setModalOpen(!modalOpen)
  let group;

  const ref = firebase.firestore().collection('product')
  const [dataCategory, setDataCategory] = useState([])
  useEffect(() => {
    ref
      .where('uid', '==', data.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          group = parseInt(doc.data().defaultGroup)
        })
        ref
        .doc(data.uid)
        .collection('category')
        .where('group', '==', group)
        .onSnapshot((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
            items.push(doc.data())
            // console.log("items",doc.data())
          })
          setDataCategory(items)
        })
      })
    
  }, [])
  //   console.log("Output",ref)
  if (dataCategory.length !== 0) {
    console.log('Output_dataUser', dataCategory)
  } else {
    console.log('null')
  }
  return (
    <div className='container'>
      {dataCategory.map((item, index) => (
        <div style={{ borderRadius: '18px' }} className='row py-2' key={index}>
          <a
            href='#'
            className={`list-group-item d-flex gap-3 ${styles.item}`}
            aria-current='true'
            onClick={() => {
              setModalData(item)
              toggle()
            }}
          >
            <img
              src={defaultImg}
              alt='twbs'
              width='64'
              height='64'
              className='img-rounded flex-shrink-0'
            />
            <div
              className={`d-flex w-100 justify-content-between ${styles.itemText}`}
            >
              <div>
                <p className='mb-0'>{item.name}</p>
                <p className='mb-0' style={{ color: '#7F8E7F' }}>
                  Total {item.qty} Product
                </p>
              </div>
              <div className='opacity-50 text-nowrap py-3'>
                <FontAwesomeIcon
                  icon='fa-solid fa-ellipsis-vertical'
                  size='xl'
                />
              </div>
            </div>
          </a>
        </div>
      ))}
      
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    data: state.dataUser,
  }
}

export default connect(mapStateToProps)(ListCategory)
