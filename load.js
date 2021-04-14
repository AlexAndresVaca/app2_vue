if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then(
        reg => console.log("Se registro con éxito!")
    ).catch(
        err => console.log(err)
    )

}