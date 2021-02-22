
// add the shape library: with file name as parameter (have to be unique)
(function () {
    'use strict';
    var shapesGroupName = '自定义图形';     // used to organize and gropping the shapes, displayed in editor menu as label with expand/collapse 
    var typeId = 'shapes';              // used to identify shapes type, 'shapes' is binded with angular component 'ShapesComponent'
    // if you make a new type you have to implement the angular component too 

    // add in this array your schapes data, the shape object has the following attributes:
    // 'name': is unique for shape type
    // 'ico': path icon displayed in editor menu
    // 'content': array of svg element 
    // 'id': element id used if you like make a animation managed in angular component
    // 'type': svg element type (path, text, ellipse,...) see svg description
    // 'attr': element attribute, depending of type
    var shapes = [
        {
            name: '星星', ico: 'assets/lib/svgeditor/shapes/img/star.svg', content: [
                { id: '', type: 'path', attr: { d: 'M 77.007603,88.105758 49.661218,65.207892 21.823386,87.5057 35.150053,54.421912 5.3412141,34.836962 40.923933,37.287922 50.338889,2.88595 59.003552,37.484515 94.631154,35.807877 64.403491,54.740005 Z' } }]
        }
    ];

    // merge shapes groups        
    for (var i = 0; i < shapes.length; i++) {
        shapes[i].name = typeId + '-' + shapes[i].name;
    }
    if (svgEditor.shapesGrps[shapesGroupName]) {
        for (var i = 0; i < shapes.length; i++) {
            svgEditor.shapesGrps[shapesGroupName].push(shapes[i]);
        }
    } else {
        svgEditor.shapesGrps[shapesGroupName] = shapes;
    }
}());