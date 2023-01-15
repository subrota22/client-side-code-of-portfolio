
import Swal from 'sweetalert2';

const DeleteConformation = ({modalData, deleteProject , setShowModal}) => {
 const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success mx-2 px-4 py-2 shadow-lg shadow p-3 mb-5 bg-body-tertiary rounded',
    cancelButton: 'btn btn-danger mx-2 px-4 py-2 shadow-lg shadow p-3 mb-5 bg-body-tertiary rounded',  
  },
  buttonsStyling:false
})

swalWithBootstrapButtons.fire({
  title: 'Are you sure?',
  text: `You won't be able to revert ${modalData?.projectName} data`,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it ! ',
  cancelButtonText: 'No, cancel ! ',
  reverseButtons: true ,
  background:"#40073B" ,
  color:"#EACAE8",
  padding:"12px"
}).then((result) => {
  if (result.isConfirmed) {
  deleteProject(modalData._id) ;
    swalWithBootstrapButtons.fire({
        title: 'Deleted !',
        text: 'Your data has been deleted.',
        icon: 'success' ,
        background:"#40073B" ,
        color:"#EACAE8",
        timer:3000 ,
      }) ;
    
     setShowModal(false) ;
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire( {
        title: 'Cancelled ',
        text:`Your imaginary data  ${modalData?.projectName} is safe now !!`,
        icon: 'error' ,
        background:"#40073B" ,
        color:"#EACAE8",
        timer:3000 ,
      }
    ) ;
    setShowModal(false) ;
  }
})
};

export default DeleteConformation;