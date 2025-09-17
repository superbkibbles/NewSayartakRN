import { calcWidth, calcHeight } from "../../config/metrics";

 const styles = {
    buttonItem: {
        width: calcWidth() /5, height: "100%",
        justifyContent: "flex-start", alignItems: "center",
        marginTop:calcHeight(25),

        elevation: 10,
        overflow: "hidden"
    }
}

export default styles