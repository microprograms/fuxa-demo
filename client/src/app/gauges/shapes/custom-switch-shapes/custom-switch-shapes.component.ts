/**
 * Shape extension
 */
import { Component } from '@angular/core';
import { GaugeBaseComponent } from '../../gauge-base/gauge-base.component'
import { GaugeSettings, GaugeAction, Variable, GaugeStatus } from '../../../_models/hmi';
import { GaugeDialogType } from '../../gauge-property/gauge-property.component';
import { Utils } from '../../../_helpers/utils';

declare var SVG: any;
declare var Raphael: any;

@Component({
    selector: 'custom-switch-shapes',
    templateUrl: './custom-switch-shapes.component.html',
    styleUrls: ['./custom-switch-shapes.component.css']
})
export class CustomSwitchShapesComponent extends GaugeBaseComponent {

    static TypeId = 'custom-switch';
    static TypeTag = 'svg-ext-' + CustomSwitchShapesComponent.TypeId;      // used to identify shapes type, binded with the library svgeditor
    static LabelTag = 'AnimCustomSwitch';

    static actionsType = {
        on: 'shapes.action-custom-switch-on',
        off: 'shapes.action-custom-switch-off'
    }

    constructor() {
        super();
    }

    static getSignals(pro: any) {
        let res: string[] = [];
        if (pro.variableId) {
            res.push(pro.variableId);
        }
        if (pro.alarmId) {
            res.push(pro.alarmId);
        }
        if (pro.actions) {
            pro.actions.forEach(act => {
                res.push(act.variableId);
            });
        }
        return res;
    }

    static getActions() {
        return this.actionsType;
    }

    static getDialogType(): GaugeDialogType {
        return GaugeDialogType.RangeWithAlarm;
    }

    static processValue(ga: GaugeSettings, svgele: any, sig: Variable, gaugeStatus: GaugeStatus) {
        if (svgele.node) {
            let clr = '';
            let value = parseFloat(sig.value);
            if (Number.isNaN(value)) {
                // maybe boolean
                value = Number(sig.value);
            } else {
                value = parseFloat(value.toFixed(5));
            }
            if (ga.property) {
                if (ga.property.variableId === sig.id && ga.property.ranges) {
                    for (let idx = 0; idx < ga.property.ranges.length; idx++) {
                        if (ga.property.ranges[idx].min <= value && ga.property.ranges[idx].max >= value) {
                            clr = ga.property.ranges[idx].color;
                        }
                    }
                    if (clr) {
                        svgele.node.setAttribute('fill', clr);
                    }
                }
                // check actions
                if (ga.property.actions) {
                    ga.property.actions.forEach(act => {
                        if (act.variableId === sig.id) {
                            CustomSwitchShapesComponent.processAction(act, svgele, value, gaugeStatus);
                        }
                    });
                }
            }
        }
    }

    static processAction(act: GaugeAction, svgele: any, value: any, gaugeStatus: GaugeStatus) {
        var element = SVG.adopt(svgele.node);
        if (act.range.min <= value && act.range.max >= value) {
            CustomSwitchShapesComponent.runAction(element, act.type, gaugeStatus);
        }
    }

    static runAction(element, type, gaugeStatus: GaugeStatus) {
        if (CustomSwitchShapesComponent.actionsType[type] === CustomSwitchShapesComponent.actionsType.on) {
            SVG.adopt(Utils.searchTreeStartWith(element.node, 'on')).show();
            SVG.adopt(Utils.searchTreeStartWith(element.node, 'off')).hide();
        } else if (CustomSwitchShapesComponent.actionsType[type] === CustomSwitchShapesComponent.actionsType.off) {
            SVG.adopt(Utils.searchTreeStartWith(element.node, 'on')).hide();
            SVG.adopt(Utils.searchTreeStartWith(element.node, 'off')).show();
        }
    }

    static firstAnimation(element, moveto, movefrom) {
    }
    
    static secondAnimation(element, movefrom, moveto) {
    }
}
