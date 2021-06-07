'use strict';

const GObject                = imports.gi.GObject;
const GLib                   = imports.gi.GLib;
const St                     = imports.gi.St;
const DND                    = imports.ui.dnd;
const Clutter                = imports.gi.Clutter;
const Main                   = imports.ui.main;
const Meta                   = imports.gi.Meta;

var   WindowThumbnail = GObject.registerClass(
class WindowThumbnail extends St.Bin {
    _init(winActor, that) {
        this.reverseTmbWheelFunc = false;
        this.parent = that;
        this.w = winActor.get_meta_window();
        super._init({visible: true, reactive: true, can_focus: true, track_hover: true});
        this.connect('button-release-event', this._onBtnReleased.bind(this));
        this.connect('button-press-event', this._onBtnPressed.bind(this));
        this.connect('scroll-event', this._onScrollEvent.bind(this));
        //this.connect('motion-event', this._onMouseMove.bind(this));

        this._delegate = this;
        this._draggable = DND.makeDraggable(this, {dragActorOpacity: 200});

        this.saved_snap_back_animation_time = DND.SNAP_BACK_ANIMATION_TIME;

        this._draggable.connect('drag-end', this._end_drag.bind(this));
        this._draggable.connect('drag-cancelled', this._end_drag.bind(this));

        this.clone = new Clutter.Clone({reactive: true});
        this.set_child(this.clone);
        //this._remove();
        Main.layoutManager.addChrome(this);


        this.window = this.w.get_compositor_private();

            //if (this.window_thumbnail.window && this.window_thumbnail.window.get_size()[0] && this.window_thumbnail.window.get_texture()) {
        this.max_width = 25 / 100 * global.display.get_size()[0];
        this.max_height = 25 / 100 * global.display.get_size()[1];

        this.clone.set_source(this.window);
        this._setThumbnailSize(true);

        this.set_position(winActor.x,winActor.y);
        this.show();
        this.window_id = this.w.get_id();

        // remove thumbnail content and hide thumbnail if its window is destroyed
        this.windowConnect = this.window.connect('destroy', () => {
            if (this) {
                this._remove();
            }
        });
    }

    _setThumbnailSize(resetScale = false) {
        [this.owidth, this.oheight] = this.window.get_size();
        if (resetScale)
            this.scale = Math.min(1.0, this.max_width / this.owidth, this.max_height / this.oheight);
        let size = [this.scale * this.owidth, this.scale * this.oheight];
        //this.clone.set_size(...size);
        this.set_size(...size);
    }

    _setSize() {
        //this.clone.set_size(this.scale * this.owidth * 2, this.scale * this.oheight * 2);
        this.set_size(this.scale * this.owidth, this.scale * this.oheight);
    }

    _onMouseMove(actor, event) {
        let [pos_x,pos_y] = event.get_coords();
        let state = event.get_state();
        if (this._ctrlPressed(state)) {
            print (pos_x, pos_y);

        }
    }

    _onBtnPressed(actor, event) {
        let doubleclick = event.get_click_count() === 2;
        if (doubleclick) this.w.activate(global.get_current_time());
    }

    _onBtnReleased(actor, event) {
        let button = event.get_button();
        switch (button) {
            case Clutter.BUTTON_PRIMARY:
                //if (this._ctrlPressed(state))
                this.reverseTmbWheelFunc = !this.reverseTmbWheelFunc;
                print (this.reverseTmbWheelFunc);
                    return;
                break;
            case Clutter.BUTTON_SECONDARY:
                //if (this._ctrlPressed(state))
                this._remove();
                    return;
                break;
            case Clutter.BUTTON_MIDDLE:
                //if (this._ctrlPressed(state))
                this.w.delete(global.get_current_time());
                    return;
                break;
            default:
                return Clutter.EVENT_PROPAGATE;
        }
    }

    _onScrollEvent(actor, event) {
        let direction = event.get_scroll_direction();
        let state = event.get_state();
        switch (direction) {
            case Clutter.ScrollDirection.UP:
                if (this._shiftPressed(state))
                    this.opacity = Math.min(255, this.opacity += 24);
                else if (this.reverseTmbWheelFunc !== this._ctrlPressed(state)){
                    this._switchSourceWin(-1);
                }
                else if (this.reverseTmbWheelFunc === this._ctrlPressed(state))
                    this.scale = Math.max(0.1, this.scale -= 0.025);
                break;
            case Clutter.ScrollDirection.DOWN:
                if (this._shiftPressed(state))
                    this.opacity = Math.max(48, this.opacity -= 24);
                else if (this.reverseTmbWheelFunc !== this._ctrlPressed(state)){
                    this._switchSourceWin(+1);
                }
                else if (this.reverseTmbWheelFunc === this._ctrlPressed(state))
                    this.scale = Math.min(1, this.scale += 0.025);
                break;
            default:
                return Clutter.EVENT_PROPAGATE;
        }
        this._setSize();
        //this.scale = Math.min(1.0, this.max_width / this.width, this.max_height / this.height);
        return Clutter.EVENT_STOP;
    }

    _remove() {
        if (this.clone) {
            this.w.disconnect(this.windowConnect);
            this.clone.set_source(null);
        }
        this.parent.windowThumbnails.splice(this.parent.windowThumbnails.indexOf(this), 1);
        this.window.disconnect(this.windowConnect);
        this.destroy();
    }

    _end_drag() {
        this.set_position(this._draggable._dragOffsetX + this._draggable._dragX, this._draggable._dragOffsetY + this._draggable._dragY);
        DND.SNAP_BACK_ANIMATION_TIME = 0;
        this.timeout = GLib.timeout_add_seconds(GLib.PRIORITY_DEFAULT, 0, () => {
            DND.SNAP_BACK_ANIMATION_TIME = this.saved_snap_back_animation_time;
        });
    }

    _ctrlPressed(state) {
        return (state & Clutter.ModifierType.CONTROL_MASK) != 0;
    }

    _shiftPressed(state) {
        return (state & Clutter.ModifierType.SHIFT_MASK) != 0;
    }

    _switchSourceWin(direction) {
        let windows = global.display.get_tab_list(Meta.TabList.NORMAL_ALL, null);
            windows = windows.filter( w => !(w.skip_taskbar || w.minimized));
        let idx = -1;
        for (let i = 0; i < windows.length; i++){
            if (windows[i] === this.w) {
                idx = i + direction;
                break;
            }
        }
        idx = idx >= windows.length ? 0 : idx;
        idx = idx < 0 ? windows.length - 1 : idx;
        let w = windows[idx];
        let win = w.get_compositor_private();
        this.clone.set_source(win);
        this.window.disconnect(this.windowConnect);
        this.window = win;
        this.windowConnect = this.window.connect('destroy', () => {
            if (this) {
                this._remove();
            }
        });
        this.w = w;
        this._setThumbnailSize();
    }

});