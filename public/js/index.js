// JavaScript Document
$(function () {
    $('#cc').layout('add', {
        region: 'west',
        width: 480,
        title: 'West Title',
        split: true,
        tools: [{
            iconCls: 'icon-add',
            handler: function () {
                alert('add')
            }
        }, {
            iconCls: 'icon-remove',
            handler: function () {
                alert('remove')
            }
        }]
    });

    //右键关闭选项卡
    $('#tt').tabs({
        onContextMenu: function (e, title, index) {
            e.preventDefault();
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
            $('#mm').menu({
                onClick: function (item) {
                    if (item.text == '关闭所有') {
                        var allTabs = $("#tt").tabs('tabs');
                        for (var i = 0, len = allTabs.length; i < len; i++) {
                            //因为tabs删除之后会重新对其元素进行排序，所以在删除方法时候只需要进行删除1即可(因为我想保留第一个元素，如果不想保留就改成0即可)
                            $("#tt").tabs('close', 0);
                        }
                    }
                    if (item.text == '关闭其他') {
                        var index = $('#tt').tabs('getTabIndex', $('#tt').tabs('getSelected'));
                        var allTabs = $("#tt").tabs('tabs');
                        for (var i = 0, len = allTabs.length; i < len; i++) {
                            $("#tt").tabs('close', i);
                        }
                    }
                    if (item.text == '关闭当前') {
                        $('#tt').tabs('close', title);
                    }
                }
            });
        }
    });

    $('#menu_tree_system').tree({
        data: [{
            "id":1,
            "text":"系统管理",
            "children":[{
                "id":11,
                "text":"用户管理",
                "state":"open",
                "children":[{
                    "id":111,
                    "text":"新增用户",
                    "attributes":{"url":"page/user/add.html"}
                },{
                    "id":112,
                    "text":"修改用户",
                    "attributes":{"url":"page/user/update.html"}
                },{
                    "id":113,
                    "text":"用户列表",
                    "attributes":{"url":"page/user/list.html"}
                }]
            },{
                "id":11,
                "text":"角色管理",
                "state":"closed",
                "children":[{
                    "id":111,
                    "text":"新增角色",
                    "attributes":{"url":"page/user/add.html"}
                },{
                    "id":112,
                    "text":"修改角色",
                    "attributes":{"url":"page/user/update.html"}
                },{
                    "id":113,
                    "text":"角色列表",
                    "attributes":{"url":"page/user/list.html"}
                }]
            },{
                "id":13,
                "text":"文章管理",
                "state":"open",
                "children":[{
                    "id":111,
                    "text":"添加文章",
                    "attributes":{"url":"page/article/add.html"}
                },{
                    "id":112,
                    "text":"修改文章",
                    "attributes":{"url":"page/article/update.html"}
                },{
                    "id":113,
                    "text":"文章列表",
                    "attributes":{"url":"page/article/list.html"}
                }]
            }]
        }]

    });

   $('#menu_tree_system').tree({
        animate: true,
        onClick: function (node) {
            if ($('#menu_tree_system').tree('isLeaf', node.target)) {
                sessionStorage.clear();
                var tt = $('#tt');
                if (tt.tabs('exists', node.text)) {//如果tab已经存在,则选中并刷新该tab
                    tt.tabs('select', node.text);
                    var tab = tt.tabs('getSelected');
                    tab.panel('refresh',node.attributes.url);
                } else {
                    $('#tt').tabs('add', {
                        title: node.text,
                        href: node.attributes.url,
                        closable: true,
                        cache: true
                    });
                }
            }
        }
   });
});