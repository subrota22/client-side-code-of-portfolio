
import Swal from 'sweetalert2';

const DeleteConformation = ({ modalData , setShowModal , deleteFunction }) => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success mx-2 px-4 py-2 shadow-lg shadow p-3 mb-5 bg-body-tertiary rounded',
      cancelButton: 'btn btn-danger mx-2 px-4 py-2 shadow-lg shadow p-3 mb-5 bg-body-tertiary rounded',
    },
    buttonsStyling: false
  })
  setShowModal(false);
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: `You won't be able to revert this data`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it ! ',
    cancelButtonText: 'No, cancel ! ',
    reverseButtons: true,
    background: "#40073B",
    color: "#EACAE8",
    padding: "12px",
    timer:12000,
  }  ).then((result) => {

    if (result.isConfirmed) {
      deleteFunction(modalData._id);
       setShowModal(false);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: 'Cancelled ',
        text: `Your imaginary data is safe now !!`,
        icon: 'error',
        background: "#40073B",
        color: "#EACAE8",
        timer: 3000,
      }
      );
      setShowModal(false);
    } 
  })
};

export default DeleteConformation;