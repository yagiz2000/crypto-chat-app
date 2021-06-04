import Swal from "sweetalert2";
export default {
    methods:{
        triggerSimpleAlert(content){
            const {title,text,icon} = content;//Destructring örneği
            Swal.fire({title,text,icon});
        }
    }
}
