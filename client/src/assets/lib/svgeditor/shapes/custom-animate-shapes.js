
// add the shape library: with file name as parameter (have to be unique)
(function () {
    'use strict';
    var shapesGroupName = '自定义动画';     // used to organize and gropping the shapes, displayed in editor menu as label with expand/collapse 
    var typeId = 'custom-switch';              // used to identify shapes type, 'shapes' is binded with angular component 'ShapesComponent'
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
            name: '开关', ico: 'assets/lib/svgeditor/shapes/img/switch.svg', content: [
                { id: '', type: 'path', attr: { d: 'M 0,11 8,11 Z' } },
                { id: '', type: 'circle', attr: { cx: '8', cy: '11', r: '0.4' } },
                { id: 'on', type: 'path', attr: { d: 'M 8,11 16,11 Z' } },
                { id: 'off', type: 'path', attr: { d: 'M 8,11 16,6 Z' } },
                { id: '', type: 'path', attr: { d: 'M 16,11 24,11 Z' } }
            ]
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