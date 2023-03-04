import React from 'react'
import { Link } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CHeaderDivider,
  CBreadcrumb, 
  CBreadcrumbItem,
  CContainer,
} from '@coreui/react'

import DataTable  from 'react-data-table-component';


function Billhistorys() {
  const tabledata = [
    {
        id: 1,
        billingNo: '123',
        customerName: 'Kai',
        orderDate:"2023-1-1",
        amount:"100"
    },
    {
      id: 2,
      billingNo: '455',
      customerName: 'Rowan',
      orderDate:"2023-1-2",
      amount:"100"
    },
    {
      id: 3,
      billingNo: '466',
      customerName: 'Ezra',
      orderDate:"2023-1-3",
      amount:"100"
    },
    {
      id: 4,
      billingNo: '7642',
      customerName: 'Jayden',
      orderDate:"2023-1-4",
      amount:"100"
    },
    {
      id: 5,
      billingNo: '142',
      customerName: 'Eliana',
      orderDate:"2023-1-5",
      amount:"100"
    },
    {
      id: 6,
      billingNo: '78',
      customerName: 'Amara',
      orderDate:"2023-1-6",
      amount:"100"
    },
    {
      id: 7,
      billingNo: '75',
      customerName: 'Nova',
      orderDate:"2023-1-7",
      amount:"100"
    },
    {
      id: 8,
      billingNo: '36',
      customerName: 'Kai',
      orderDate:"2023-1-8",
      amount:"100"
    },
    {
      id: 9,
      billingNo: '123',
      customerName: 'Kai',
      orderDate:"2023-1-9",
      amount:"100"
    },
    {
      id: 10,
      billingNo: '127573',
      customerName: 'Kai',
      orderDate:"2023-1-10",
      amount:"100"
    },
    {
      id: 11,
      billingNo: '42',
      customerName: 'Kai',
      orderDate:"2023-1-11",
      amount:"100"
    },
    {
      id: 12,
      billingNo: '35',
      customerName: 'Nova',
      orderDate:"2023-1-12",
      amount:"100"
    },
    {
      id: 13,
      billingNo: '42',
      customerName: 'Kai',
      orderDate:"2023-1-13",
      amount:"100"
    },
  
  ]
  

  const columns = [
    {
      name: 'Sr No',
      selector: row => row.id,
  },
    {
        name: 'Order No',
        selector: row => row.billingNo,
    },
    {
        name: 'Date',
        selector: row => row.orderDate,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
  },
  
  ];
  return (
    <div>
      <CHeaderDivider />
      <CContainer fluid>
      <CRow >
      <CCol xs={12}>
          <h5 className="main-title">History </h5>
      </CCol>
        <CCol xs={8}>
         
      <CBreadcrumb className="m-0 ms-2 text-decoration-none" style={{"--cui-breadcrumb-divider": "'>'"}}  >
      <CBreadcrumbItem > <Link to="/dashboard">Home</Link></CBreadcrumbItem>
         <CBreadcrumbItem  actives>Bill History</CBreadcrumbItem>
      </CBreadcrumb>
      </CCol>
      <CCol xs={4}>
      <div class="text-end">  
     <Link to="/totaloutstanding"> <CButton color="warning"  size="sm" className="px-4 text-end text-white" type="button" style={{marginTop: "-52px"}}>
         Back
      </CButton></Link>

      </div>
      </CCol>
      </CRow>
      </CContainer> 
      <br/> 
    
    <div>
    <CCard>
    <CCardHeader>
            <strong>Customer Bill History</strong> 
    </CCardHeader>
     <CCardBody>
    
          <CRow className="">
  
     <CCol md={3} className="position-relative">
     <br/>
            <CFormLabel >Customer</CFormLabel>
             <CFormSelect 
               aria-label="Default select example"
               options={[
             'Please select customer',
                { label: 'One', value: '1' },
                 { label: 'Two', value: '2' },
                 { label: 'Three', value: '3', disabled: true }
                 ]}
                />
            
      </CCol>
      <CCol md={4}>
      <br/>
                    <CFormLabel >Order Start/End Date</CFormLabel>
                    <CInputGroup className="mb-3">
                        <CFormInput
                          type="date"
                        placeholder="Start Date" />
                          <CButton color="primary"  className='' type="button">
                             To
                           </CButton>
                        <CFormInput 
                          type="date"
                        placeholder="End Date"/>
                    </CInputGroup>
                  </CCol>
     
<br/>
      <CCol xs={12}>
      <div className='text-center '>
            <CButton color="success"  className='m-2 text-white' type="button">
              Search
             </CButton>
             <CButton color="dark" type="button" className='text-white'>
              Clear
            </CButton>
      </div>
     </CCol>
     </CRow>
      {/* <CCol xs={12}>
             <CButton color="primary" type="submit">
              Clear
            </CButton>
       </CCol> */}
     </CCardBody>
    </CCard>
    <br/>
    <CCard>
     <CCardBody>
     <DataTable
                    className='tableTopSpace  border border-table'
                      columns={columns}
                      responsive={true}
                      data={tabledata}
                      pagination 
                  />
     </CCardBody>
  </CCard>
  </div>
  </div>
  );
}

export default Billhistorys;
