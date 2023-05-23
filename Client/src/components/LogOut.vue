
<script>
import router from "@/router";

export default {

    created() {
        localStorage.removeItem("token")
        router.push('/Login')
    },
    name: "LogOut",
};
</script>

