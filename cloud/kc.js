/**
 * Created by admin on 2015/3/28.
 */
var KC = AV.Object.extend("KeCheng");
AV.Cloud.define("addCK", function(request, response) {
    console.log(request.params);
    var file = request.params.file;
    var avFile = new AV.File("title.jpg", file);
    var kcN = new KC();
    kcN.set("kcpic", avFile);
    kcN.save(null, {
        success: function(kcN) {
            console.log(kcN.id);
            response.success(kcN.id);
        },
        error: function(kcN, error) {
            console.log(error.description);
            response.error(error.description);
        }
    });
});
