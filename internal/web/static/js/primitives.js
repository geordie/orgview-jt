/**
 * @typedef {number} AdviserPlacementType
 **/


/**
 * The adviser placement type controls assistants and advisers placement relative
 * to the parent node, on the left or the right side of the parent's hierarchy
 * in the organizational chart. In the case of the family diagram,
 * the position is defined relative to siblings. 
 *  
 * @enum {AdviserPlacementType}
 */
const AdviserPlacementType = {
    /**
     * Auto select by layout manager
     */
    Auto: 0,
    /**
     * Left side
     */
    Left: 2,
    /**
     * Right side
     */
    Right: 3
};

/**
 * @typedef {number} AnnotationType
 **/


/**
 * Annotation type defines the type of on-screen and in-layout annotation object.
 * Annotations are geometrical figures drawn around or bound to existing nodes of the diagram.
 *
 * @enum {AnnotationType}
 */
const AnnotationType = {
    /**
     * The connector annotation displays a spline between two nodes of the diagram.
     * They are drawn on top and across the existing diagram layout, and they don't affect nodes placement.
     * If available space between nodes is not enough to display connector annotation,
     * then control draws it outside on the side of them.
     */
    Connector: 0,
    /**
     * Shape annotation lets draw some geometrical figures over nodes of the diagram. 
     */
    Shape: 1,
    /**
     * Highlight path annotation traces a path between a given sequence of nodes over existing relation lines in the diagram.
     */
    HighlightPath: 2,
    /**
     * The in-layout label annotations display values over relation lines between nodes.
     * The control reserves space for labels in the diagram layout to not overlap nodes.
     * Label annotations are designed for auto-placement and bundling connection lines between nodes when needed.
     */
    Label: 3,
    /**
     * The background annotation highlights nodes via drawing the rectangular shape in the node's background.
     * If annotations of neighboring nodes overlap, control merges them into one continuous polygon geometry. 
     */
    Background: 4,
    /**
     * Level annotation highlights the row of nodes of the diagram by drawing a continuous rectangular shape
     * from side to side in their background. The level annotation has the optional title on the side of
     * the diagram view area. The level's title is optionally placed inside or outside of the diagram.
     * If placed inside, it is drawn in the background and does not occupy space. 
     */
    Level: 5
};

/**
 * @typedef {number} ChildrenPlacementType
 **/


/**
 * The children's placement type enumeration defines the shape of children's formation.
 * Control places children in a horizontal line below the parent node by default.
 * In the case of many child nodes, this may result in the end-user having to scroll screens to
 * view all of them. To compensate, we provide the option of placing all of the parent node's
 * children in a square/matrix formation. That will reduce sideways screen scrolling by compacting
 * the child nodes into a much smaller area on the screen.
 *  
 * @enum {ChildrenPlacementType}
 */
const ChildrenPlacementType = {
    /**
     * Sets nodes layout at the component level
     */
    Auto: 0,
    /**
     * Vertical layout
     */
    Vertical: 1,
    /**
     * Horizontal layout
     */
    Horizontal: 2,
    /**
     * Matrix formation of the nodes
     */
    Matrix: 3
};

/**
 * @typedef {string} Colors
 **/

/**
 * List of named colors.
 * 
 * @ignore
 * @enum {Colors}
 */
const Colors = {
    AliceBlue: "#f0f8ff",
    AntiqueWhite: "#faebd7",
    Aqua: "#00ffff",
    Aquamarine: "#7fffd4",
    Azure: "#f0ffff",
  
    Beige: "#f5f5dc",
    Bisque: "#ffe4c4",
    Black: "#000000",
    BlanchedAlmond: "#ffebcd",
    Blue: "#0000ff",
    BlueViolet: "#8a2be2",
    Brown: "#a52a2a",
    BurlyWood: "#deb887",
    Bronze: "#cd7f32",
  
    CadetBlue: "#5f9ea0",
    ChartReuse: "#7fff00",
    Chocolate: "#d2691e",
    Coral: "#ff7f50",
    CornflowerBlue: "#6495ed",
    Cornsilk: "#fff8dc",
    Crimson: "#dc143c",
    Cyan: "#00ffff",
    DarkBlue: "#00008b",
    DarkCyan: "#008b8b",
    DarkGoldenrod: "#b8860b",
    DarkGray: "#a9a9a9",
    DarkGreen: "#006400",
    DarkKhaki: "#bdb76b",
    DarkMagenta: "#8b008b",
    DarkOliveGreen: "#556b2f",
    Darkorange: "#ff8c00",
    DarkOrchid: "#9932cc",
    DarkRed: "#8b0000",
    DarkSalmon: "#e9967a",
    DarkSeaGreen: "#8fbc8f",
    DarkSlateBlue: "#483d8b",
    DarkSlateGray: "#2f4f4f",
    DarkTurquoise: "#00ced1",
    DarkViolet: "#9400d3",
    DeepPink: "#ff1493",
    DeepSkyBlue: "#00bfff",
    DimGray: "#696969",
    DodgerBlue: "#1e90ff",
  
    FireBrick: "#b22222",
    FloralWhite: "#fffaf0",
    ForestGreen: "#228b22",
    Fuchsia: "#ff00ff",
  
    Gainsboro: "#dcdcdc",
    GhostWhite: "#f8f8ff",
    Gold: "#ffd700",
    Goldenrod: "#daa520",
    Gray: "#808080",
    Green: "#008000",
    GreenYellow: "#adff2f",
  
    Honeydew: "#f0fff0",
    Hotpink: "#ff69b4",
  
    IndianRed: "#cd5c5c",
    Indigo: "#4b0082",
    Ivory: "#fffff0",
    Khaki: "#f0e68c",
  
    Lavender: "#e6e6fa",
    LavenderBlush: "#fff0f5",
    Lawngreen: "#7cfc00",
    Lemonchiffon: "#fffacd",
    LightBlue: "#add8e6",
    LightCoral: "#f08080",
    LightCyan: "#e0ffff",
    LightGoldenrodYellow: "#fafad2",
  
    LightGray: "#d3d3d3",
    LightGreen: "#90ee90",
    LightPink: "#ffb6c1",
    LightSalmon: "#ffa07a",
    LightSeaGreen: "#20b2aa",
    LightSkyBlue: "#87cefa",
    LightSlateGray: "#778899",
    LightSteelBlue: "#b0c4de",
  
    LightYellow: "#ffffe0",
    Lime: "#00ff00",
    Limegreen: "#32cd32",
    Linen: "#faf0e6",
  
    Magenta: "#ff00ff",
    Maroon: "#800000",
    MediumAquamarine: "#66cdaa",
    MediumBlue: "#0000cd",
    MediumOrchid: "#ba55d3",
    MediumPurple: "#9370d8",
    MediumSeaGreen: "#3cb371",
    MediumSlateBlue: "#7b68ee",
  
    MediumSpringGreen: "#00fa9a",
    MediumTurquoise: "#48d1cc",
    MediumVioletRed: "#c71585",
    MidnightBlue: "#191970",
    MintCream: "#f5fffa",
    MistyRose: "#ffe4e1",
    Moccasin: "#ffe4b5",
  
    NavajoWhite: "#ffdead",
    Navy: "#000080",
  
    Oldlace: "#fdf5e6",
    Olive: "#808000",
    Olivedrab: "#6b8e23",
    Orange: "#ffa500",
    OrangeRed: "#ff4500",
    Orchid: "#da70d6",
  
    PaleGoldenRod: "#eee8aa",
    PaleGreen: "#98fb98",
    PaleTurquoise: "#afeeee",
    PaleVioletRed: "#d87093",
    Papayawhip: "#ffefd5",
    Peachpuff: "#ffdab9",
    Peru: "#cd853f",
    Pink: "#ffc0cb",
    Plum: "#dda0dd",
    PowderBlue: "#b0e0e6",
    Purple: "#800080",
  
    Red: "#ff0000",
    RosyBrown: "#bc8f8f",
    RoyalBlue: "#4169e1",
  
    SaddleBrown: "#8b4513",
    Salmon: "#fa8072",
    SandyBrown: "#f4a460",
    SeaGreen: "#2e8b57",
    Seashell: "#fff5ee",
    Sienna: "#a0522d",
    Silver: "#c0c0c0",
    SkyBlue: "#87ceeb",
    SlateBlue: "#6a5acd",
    SlateGray: "#708090",
    Snow: "#fffafa",
    SpringGreen: "#00ff7f",
    SteelBlue: "#4682b4",
  
    Tan: "#d2b48c",
    Teal: "#008080",
    Thistle: "#d8bfd8",
    Tomato: "#ff6347",
    Turquoise: "#40e0d0",
  
    Violet: "#ee82ee",
  
    Wheat: "#f5deb3",
    White: "#ffffff",
    WhiteSmoke: "#f5f5f5",
  
    Yellow: "#ffff00",
    YellowGreen: "#9acd32"
};

/**
 * @typedef {number} ConnectorLabelPlacementType
 **/


/**
 * Connector label placement type defines label placement relative to connector annotation endpoints.
 * Connector annotation is bound and drawn between two nodes defined by the `fromItem` and the `toItem`
 * properties. The label can be placed close to the start, end, or between them along the connector line. 
 *
 * @enum {ConnectorLabelPlacementType}
 */
const ConnectorLabelPlacementType = {
    From: 0,
    Between: 1,
    To: 2
};

/**
 * @typedef {number} ConnectorPlacementType
 **/


/**
 * Connector placement type defines style and shape of the connector line. 
 *
 * @enum {ConnectorPlacementType}
 */
const ConnectorPlacementType = {
    /**
     * The offbeat connection line style places the connector line not to overlap or parallel
     * the underlying diagram connector lines. If nodes are close to each other and the gap
     * between them cannot fit annotation, it will be traced around the nodes to have enough space for arrows and labels.
     */
    Offbeat: 0,
    /**
     * The straight option is a classic direct line connecting two nodes. The component provides conflict
     * resolution between annotations overlapping each other. If two or more annotations overlap,
     * the layout engine will add offset to them to be drawn parallel.
     */
    Straight: 1
};

/**
 * @typedef {number} ConnectorShapeType
 **/


/**
 * Connector shape type defines the number of lines and arrows at their ends drawn between
 * nodes of the connector annotation. The possibility to draw single lines, combined with
 * conflict resolution, which places overlapping annotations in parallel when they overlap
 * each other, provides flexibility to create an infinite variety of parallel lines and
 * styles between nodes. 
 *
 * @enum {ConnectorShapeType}
 */
const ConnectorShapeType = {
    /**
     * Single line with one arrow
     */
    OneWay: 0,
    /**
     * Two parallel lines with single arrows
     */
    TwoWay: 1,
    /**
     * Single line with 2 arrows.
     */
    BothWay: 2
};

const ConnectorStyleType = {
    Extra: 0,
    Regular: 1,
    Highlight: 2
};

/**
 * @typedef {number} ConnectorType
 **/

/**
 * The connector type option defines the base connection lines in the diagram.
 * It is only applicable to nodes minimized to markers or lines.
 * The templated nodes are always connected with squared connection lines
 *  
 * @enum {ConnectorType}
 */
const ConnectorType = {
    /**
     * Orthogonal
     */
    Squared: 0,
    /**
     * Angular
     */
    Angular: 1,
    /**
     * Curved
     */
    Curved: 2
};

/**
 * @typedef {number} ElbowType
 **/

/**
 * Elbow style of connection lines
 *  
 * @enum {ElbowType}
 */
const ElbowType = {
    /**
     * No elbow
     */
    None: 0,
    /**
     * Dot marker at the intersection
     */
    Dot: 1,
    /**
     * Bevel elbow
     */
    Bevel: 2,
    /**
     * Round elbow
     */
    Round: 3
};
  
/**
 * Defines option state.
 * 
 * @readonly
 * @enum {number}
 */
const Enabled = {
    /**
     * Option state is auto defined.
     */
    Auto: 0,
    /**
     * Enabled
     */
    True: 1,
    /**
     * Disabled
     */
    False: 2
};
  
/**
 * @typedef {number} GroupByType
 **/

/**
 * The group by type enumeration defines direction towards parents or children.
 * For example, connection lines arrows direction can be towards parents or down
 * towards children in the hierarchy. The other example is the placement of nodes
 * close to their parents or children when we have multiple empty levels between
 * parents and children of the node.
 *  
 * @enum {GroupByType}
 */
const GroupByType = {
    None: 0,
    Parents: 1,
    Children: 2
};

/**
 * @typedef {number} HorizontalAlignmentType
 **/

/**
 * Horizontal alignment
 *  
 * @enum {HorizontalAlignmentType}
 */
const HorizontalAlignmentType = {
    Center: 0,
    Left: 1,
    Right: 2
};

/**
 * @typedef {number} ItemType
 **/

/**
 * The enumeration defines child nodes' placement relative to their parents. 
 * By default, all children of the same parent node are of the same rank and
 * status are aligned below the parent in a horizontal line. However,
 * for exceptional cases where the end-user wishes to have a child separate
 * from the rest of its siblings, we provide custom child types that
 * the end-user can use to place different ranking nodes anywhere around
 * the parent node. These placement options give a lot of space for creating
 * roles such as an Assistant, Adviser, various Partners,
 * and co-heads in the organization.
 * 
 * @enum {ItemType}
 */
const ItemType = {
    /**
     * The regular type places node below the parent.
     */
    Regular: 0,
    /**
     * The assistant type places node at the row on the side of the connection line going from parent to its children.
     */
    Assistant: 1,
    /**
     * The sub-assistant node type is a variation of the assistant type. 
     * It is placed on the side of the connection line going from parent 
     * to regular children and attached to it with the connection 
     * line going from the top of the node.
     */
    SubAssistant: 4,
    /**
     * The adviser type places node on the right or left side of the parent
     * and attaches to it with a horizontal connection line.
     */
    Adviser: 2,
    /**
     * The sub-adviser type places node on the right or left side of the
     * parent and attaches to it with the connection line that goes out of
     * the top side of the sub-adviser node.
     */
    SubAdviser: 5,
    /**
     * The general partner type is an imitation of multiple inheritances in the organizational chart hierarchy.
     * The general-partner node is drawn side by side with its logical parent, and control places
     * regular children below them, so they visually look like parents. Another layout specifics
     * of the general partner is that it is connected to its logical parent's parent.
     * So visually, it becomes an immediate child of its grandparent.
     */
    GeneralPartner: 6,
    /**
     * The limited partner is a variation of the general partner.
     * The only difference is that it is not connected to its logical grandparent.
     */
    LimitedPartner: 7,
    /**
     * The adviser partner is a variation of the limited partner. 
     * The difference is that it has an extra connection line to its logical parent.
     */
    AdviserPartner: 8
};

const LabelType =
{
  Regular: 0,
  Dummy: 1,
  Fixed: 2,
  None: 3
};

const Layers =
{
  LevelAnnotation: 1,
  BackgroundAnnotation: 2,
  BackgroundAnnotations: 3,
  BackgroundConnectorAnnotation: 4,
  BackgroundHighlightPathAnnotations: 5,
  Connector: 6,
  ForegroundHighlightPathAnnotations: 7,
  Highlight: 8,
  Marker: 9,
  Label: 10,
  Cursor: 11,
  Item: 12,
  ForegroundAnnotations: 13,
  ForegroundConnectorAnnotation: 14,
  Annotation: 15,
  Controls: 16
};

/**
 * @typedef {number} LineType
 **/

/**
 * Line style of connection lines.
 *  
 * @enum {LineType}
 */
const LineType = {
    Solid: 0,
    Dotted: 1,
    Dashed: 2
};

/**
 * @typedef {number} NavigationMode
 **/

/**
 * It is possible to disable control interactivity depending on application requirements.
 * The control implements the standard behavior of collection controls. It supports single
 * node selection, mouse over visual feedback, and multiple node selection. 
 *  
 * @enum {NavigationMode}
 */
const NavigationMode = {
    /**
     * Everything is on.
     */
    Default: 0,
    /**
     * Cursor selection only without highlight. 
     */
    CursorOnly: 1,
    /**
     * Mouse over feedback only
     */
    HighlightOnly: 3,
    /**
     * No interactivity
     */
    Inactive: 2
};

/**
 * @typedef {number} NavigationMode
 **/

/**
 * Neighbors selection method defines the neighbors of the cursor node in the autofit mode.
 * The auto-fit mode replaces nodes with small markers to fit the diagram into the screen view.
 * Small nodes fit the diagram into the screen space, but they have no details.
 * So our solution is to show the cursor, neighbors, and selected diagram items
 * with templates and draw all others as markers.
 *
 * @enum {NavigationMode}
 */
const NeighboursSelectionMode = {
    /**
     * Parents and children of the cursor item
     */
    ParentsAndChildren: 0,
    /**
     * Parents, children, and siblings of the cursor item.
     */
    ParentsChildrenSiblingsAndSpouses: 1
};
  
/**
 * @typedef {number} OrientationType
 **/

/**
 * The orientation type defines diagram layout direction.
 * The control can rotate diagrams in any direction; this is needed for Arabic support and other layouts.
 *  
 * @enum {OrientationType}
 */
const OrientationType = {
    Top: 0,
    Bottom: 1,
    Left: 2,
    Right: 3,
    None: 4
};

/**
 * @typedef {number} PageFitMode
 **/

/**
 * The page fit method defines how the control fits the diagram into available screen space.
 * When the diagram size is significantly larger than the screen space, its scrolling and navigation
 * become problematic, so the component automatically fits the diagram into the screen space via
 * rendering some of its nodes in the form of small markers. The control supports several page fit
 * method options which can match your requirements depending on the diagram layout, orientation,
 * and the number of nodes.
 *  
 * @enum {PageFitMode}
 */
const PageFitMode = {
    /**
     * Disabled. All nodes are being rendered using their templates.
     */
    None: 0,
    /**
     * Fits the diagram into the view width, so it has no horizontal scrollbar.
     */
    PageWidth: 1,
    /**
     * fits the diagram into the view hight, so it has no vertical scrollbar.
     */
    PageHeight: 2,
    /**
     * Fits diagram into the view so it has no scroll bars.
     */
    FitToPage: 3,
    /**
     * The auto size option is opposite to the fit-to-page. It expands the control placeholder to fit the entire diagram without scrolling.
     */
    AutoSize: 5,
    /**
     * It renders all nodes as markers regardless of available screen space, and only the cursor node,
     * neighbors, and selected nodes are rendered with templates. Don't forget to disable the selection
     * path mode, which forces all nodes from the cursor up to the root to be shown with templates.
     */
    SelectionOnly: 6
};

/**
 * @typedef {number} PlacementType
 **/


/**
 * Defines element placement around the rectangular area it is bound to.
 *  
 * @enum {PlacementType}
 */
const PlacementType = {
    /**
     * Defined by other control options.
     */
    Auto: 0,
    TopLeft: 8,
    Top: 1,
    TopRight: 2,
    RightTop: 11,
    Right: 3,
    RightBottom: 12,
    BottomRight: 4,
    Bottom: 5,
    BottomLeft: 6,
    LeftBottom: 10,
    Left: 7,
    LeftTop: 9
};

/**
 * @typedef {number} RenderingMode
 **/

/**
 * This enumeration is used to tell rendering callback functions the current state
 * of the template. It is needed for proper events binding and content updates.
 *
 * @enum {RenderingMode}
 */
const RenderingMode = {
    Create: 0,
    Update: 1
};

const SegmentType = {
  Line: 0,
  Move: 1,
  QuadraticArc: 2,
  CubicArc: 3,
  Dot: 4
};

/**
 * @typedef {number} SelectionPathMode
 **/

/**
 * The selection path enumeration controls nodes visibility between the cursor node and
 * the root of the diagram in the auto-fit mode. It forces drawing of them with templates.
 *
 * @enum {SelectionPathMode}
 */
const SelectionPathMode = {
    /**
     * Disabled
     */
    None: 0,
    /**
     * Snow all parent nodes with templates
     */
    FullStack: 1
};

/**
 * @typedef {number} ShapeType
 **/

/**
 * Shapes
 *  
 * @enum {ShapeType}
 */
const ShapeType = {
    Rectangle: 0,
    Oval: 1,
    Triangle: 2,
    CrossOut: 3,
    Circle: 4,
    Rhombus: 5,
    Wedge: 7,
    FramedOval: 8,
    FramedTriangle: 9,
    FramedWedge: 10,
    FramedRhombus: 11,
    None: 6
};

const SideFlag = {
  Top: 1,
  Right: 2,
  Bottom: 4,
  Left: 8
};

/**
 * @typedef {number} TextOrientationType
 **/

/**
 * Text rotation
 *  
 * @enum {TextOrientationType}
 */
const TextOrientationType = {
    /**
     * Horizontal text
     */
    Horizontal: 0,
    /**
     * Rotate text left for 90 degree.
     */
    RotateLeft: 1,
    /**
     * Rotate text right for 90 degree.
     */
    RotateRight: 2,
    /**
     * Depends on other options.
     */
    Auto: 3
};

/**
 * @typedef {number} UpdateMode
 **/

/**
 * Defines update method of the diagram
 *
 * @enum {UpdateMode}
 */
const UpdateMode = {
    /**
     * Forces control to make a full chart redraw. It is equivalent to initial chart creation.
     * It removes everything from the placeholder and renders all elements again.
     */
    Recreate: 0,
    /**
     * Optimized refresh. It only updates visual elements which need to be updated.
     */
    Refresh: 1,
    /**
     * Updates highlight position only
     */
    PositonHighlight: 2
};

/**
 * @typedef {number} VectorRelationType
 **/

/**
 * Defines relation between two vectors
 *
 * @enum {VectorRelationType}
 */
const VectorRelationType = {
    None: 0,
    Null: 1,
    Collinear: 2,
    Opposite: 3
};

/**
 * @typedef {number} VerticalAlignmentType
 **/

/**
 * The vertical alignment defines nodes alignment inside row's vertical boundaries.
 * If a row of nodes contains nodes of multiple sizes, small nodes
 * are vertically aligned relative to their bigger siblings.
 *  
 * @enum {VerticalAlignmentType}
 */
const VerticalAlignmentType = {
    Top: 0,
    Middle: 1,
    Bottom: 2
};

/**
 * @typedef {number} Visibility
 **/


/**
 * The enumeration defines nodes visibility in the diagram.
 * If the diagram's auto-fit is enabled, this option controls the minimum allowed size of diagram nodes.
 *  
 * @enum {Visibility}
 */
const Visibility = {
    /**
     * Selects best visibility mode.
     */
    Auto: 0,
    /**
     * All nodes shown with templates
     */
    Normal: 1,
    /**
     * Nodes are allowed to be replaced with markers
     */
    Dot: 2,
    /**
     * The component displays only connection lines, no nodes or markers visible in layout
     */
    Line: 3,
    /**
     * It hides the node and shows only its connection lines.
     * If the node has no parents, its connection lines are hidden as well.
     * 
     * @ignore
     */
    Invisible: 4
};

/**
 * @typedef {number} ZOrderType
 **/

/**
 * Z-order type defines the annotation layer in the foreground or the background of diagram nodes.
 *  
 * @enum {ZOrderType}
 */
const ZOrderType = {
    /**
     * Depends on annotation type.
     */
    Auto: 0,
    /**
     * Background
     */
    Background: 1,
    /**
     * Foreground
     */
    Foreground: 2
};

/**
 * Indicates whether the specified number is even or not.
 * 
 * @param {number} value The number to test.
 * @returns {boolean} Returns true if the value is even.
 * @ignore
 */
function isEven(value) {
    return value % 2 == 0;
}  
/**
 * Indicates whether the specified string is null or an Empty string.
 * 
 * @ignore
 * @param {string} value The string to test.
 * @returns {boolean} Returns true if the value is null or an empty string(""); otherwise, false.
 */
function isNullOrEmpty(value) {
    var result = true,
        string;
    if (value !== undefined && value !== null) {
        string = value.toString();
        if (string.length > 0) {
        result = false;
        }
    }
    return result;
}

/**
 * Callback for looping collection items
 *
 * @callback onLoopItemCallback
 * @param {number} index An index of the collection item
 * @param {Object} item A collection item
 * @returns {boolean} Returns true to break iteration process
 */

/**
 * Loops array elements or object properties.
 *
 * @param {Object} thisArg The callback function invocation context
 * @param {Object|Object[]} items - Array of items or object with properties to iterate on
 * @param {onLoopItemCallback} onItem A call back function to call on each item in the array or object.
 * @ignore
 */
function loop(thisArg, items, onItem) {
var key, index, len;
if (onItem != null) {
    if (Array.isArray(items)) {
    for (index = 0, len = items.length; index < len; index += 1) {
        if (onItem.call(thisArg, index, items[index])) {
        break;
        }
    }
    } else {
    for (key in items) {
        if (items.hasOwnProperty(key)) {
        if (onItem.call(thisArg, key, items[key])) {
            break;
        }
        }
    }
    }
}
}
/**
 * Splits string of merged cameled words into array.
 * 
 * @param {string} name String of cameled words
 * @returns {string[]} Returns array of cameled words
 * @ignore
 */
function splitCamelCaseName(name) {
    var result = [];
    var word = "";
    for (var i = 0; i < name.length; i += 1) {
        var c = name[i];
        if (c >= 'A' && c <= 'Z') {
        if (word !== "") {
            result.push(word);
        }
        word = c;
        } else {
        word += c;
        }
    }
    if (word !== "") {
        result.push(word);
    }
    return result;
}
/**
 * Indicates whether the specified value is object
 * 
 * @param {string} item The value to test.
 * @returns {boolean} Returns true if the item is object otherwise, false.
 * @ignore
 */
function isObject(item) {
    return item !== null && typeof item == 'object';
}
/**
 * Indicates whether the specified object is empty.
 * 
 * @param {string} item The object to test.
 * @returns {boolean} Returns true if the item is empty object otherwise, false.
 * @ignore
 */
function isEmptyObject(item) {
    var key;
    for (key in item) {
        if (item.hasOwnProperty(key)) {
        return false;
        }
    }
    return true;
}
/**
 * Makes deep copy of the object.
 * 
 * @param {object} source The source object to take values from
 * @param {boolean} isShallow If true then method makes shallow copy
 * @returns {object} Returns cloned copy of the object
 * @ignore
 */
function cloneObject(source, isShallow) {
    var result;
    if (source === null) {
        result = null;
    } else if (Array.isArray(source)) {
        if (isShallow) {
        result = source.slice(0);
        } else {
        result = [];
        for (var index = 0, len = source.length; index < len; index += 1) {
            result.push(cloneObject(source[index], isShallow));
        }
        }
    } else {
        switch (typeof source) {
        case 'object':
            result = {};
            for (var property in source) {
            if (source.hasOwnProperty(property)) {
                if (isShallow) {
                result[property] = source[property];
                } else {
                result[property] = cloneObject(source[property], isShallow);
                }
            }
            }
            break;
        default:
            result = source;
            break;
        }
    }
    return result;
}
/**
 * Shallow copy of source object properites into destination
 * 
 * @param {object} destination The object to add properties to
 * @param {object} source The source object to take values from
 * @returns {object} Returns reference to destination object
 * @ignore
 */
function mergeObjects(destination, source) {
    for (var index = 1; index < arguments.length; index += 1) {
        var src = arguments[index];
        if (src !== undefined) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    destination[key] = src[key];
                }
            }
        }
    }
    return destination;
}
/**
 * Returns hash code for specified string value. This function is not needed because 
 * JavaScript supports near unlimited length of object property names.
 * 
 * @param {string} value The string to calculate hash code for.
 * @returns {number} Returns hash code for the given string
 * @ignore
 */
function getHashCode(value) {
    var hash = 0,
        character,
        i;
    /*ignore jslint start*/
    if (value.length > 0) {
        for (i = 0; i < value.length; i += 1) {
        character = value.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash;
        }
    }
    /*ignore jslint end*/
    return hash;
}

/**
 * Callback for getting item key for an element of the array
 *
 * @callback getKeyFuncCallback
 * @param {Object} item A collection item
 * @returns {number} Returns key of the item 
 */

/**
 * Compares non-sorted arrays.
 *
 * @param {Object[]} array1 - The first collection of elements.
 * @param {Object[]} array2 - The second collection of elements.
 * @param {getKeyFuncCallback|undefined} getKeyFunc If callback function is defined it is used to get a key for an array element
 * @returns {boolean} Returns true if the arrays are identical.
 */
function compareArrays(array1, array2, getKeyFunc) {
    var result = true,
        index, len, value,
        hashArray1;
    if (array1.length != array2.length) {
        result = false;
    } else {
        hashArray1 = {};
        for (index = 0, len = array1.length; index < len; index += 1) {
        value = getKeyFunc != null ? getKeyFunc(array1[index]) : array1[index];
        if (hashArray1.hasOwnProperty(value)) {
            hashArray1[value] += 1;
        } else {
            hashArray1[value] = 1;
        }
        }
        for (index = 0, len = array2.length; index < len; index += 1) {
        value = getKeyFunc != null ? getKeyFunc(array2[index]) : array2[index];
        if (!hashArray1.hasOwnProperty(value)) {
            result = false;
            break;
        } else {
            hashArray1[value] -= 1;
            if (hashArray1[value] < 0) {
            result = false;
            break;
            }
        }
        }
    }
    return result;
}

let ColorHexs;

/**
 * Converts color string into HEX color string.
 * 
 * @param {string} color Regular HTML color string.
 * @returns {string} Returns color value in form of HEX string.
 */
function getColorHexValue(color) {
    var digits,
        red,
        green,
        blue,
        rgb,
        colorKey;
    if (color.substr(0, 1) === '#') {
        return color;
    }

    /*ignore jslint start*/
    digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    /*ignore jslint end*/
    if (digits !== null && digits.length > 0) {
        red = parseInt(digits[2], 10);
        green = parseInt(digits[3], 10);
        blue = parseInt(digits[4], 10);

        /*ignore jslint start*/
        rgb = ((red << 16) | (green << 8) | blue).toString(16);
        /*ignore jslint end*/
        return digits[1] + "000000".substr(0, 6 - rgb.length) + rgb;
    }
    if (ColorHexs === undefined) {
        ColorHexs = {};
        for (colorKey in Colors) {
            if (Colors.hasOwnProperty(colorKey)) {
                ColorHexs[colorKey.toUpperCase()] = Colors[colorKey];
            }
        }
    }

    return ColorHexs[color.toUpperCase()];
}
let ColorNames;

/**
 * Converts color string into HTML color name string or return hex color string.
 * 
 * @param {string} color Regular HTML color string
 * @returns {string} Returns HTML Color name or HEX string.
 */
function getColorName(color) {
    var colorKey;
    color = getColorHexValue(color);

    if (ColorNames === undefined) {
        ColorNames = {};
        for (colorKey in Colors) {
        if (Colors.hasOwnProperty(colorKey)) {
            ColorNames[Colors[colorKey]] = colorKey;
        }
        }
    }

    return ColorNames[color];
}
/**
 * Gets red value of HEX color string.
 * 
 * @param {string} color Color
 * @returns {number} Returns red value of the HEX color string. 
 */
function getRed(color) {
    if (color.substr(0, 1) === '#' && color.length === 7) {
        return parseInt(color.substr(1, 2), 16);
    }
    return null;
}
/**
 * Gets green value of HEX color string.
 * 
 * @param {string} color Color
 * @returns {number} Returns green value of the HEX color string. 
 */
function getGreen(color) {
    if (color.substr(0, 1) === '#' && color.length === 7) {
        return parseInt(color.substr(3, 2), 16);
    }
    return null;
}
/**
 * Gets blue value of HEX color string.
 * 
 * @param {string} color Color
 * @returns {number} Returns blue value of the HEX color string. 
 */
function getBlue(color) {
    if (color.substr(0, 1) === '#' && color.length === 7) {
        return parseInt(color.substr(5, 2), 16);
    }
    return null;
}
/**
 * Calculates before opacity color value producing color you need after applying opacity.
 * 
 * @param {string} color The color you want to get after applying opacity.
 * @param {number} opacity Opacity
 * @returns {string} The HEX color before opacity
 */
function beforeOpacity(color, opacity) {
    var red,
        green,
        blue,
        rgb;
    color = getColorHexValue(color);

    red = Math.ceil((getRed(color) - (1.0 - opacity) * 255.0) / opacity);
    green = Math.ceil((getGreen(color) - (1.0 - opacity) * 255.0) / opacity);
    blue = Math.ceil((getBlue(color) - (1.0 - opacity) * 255.0) / opacity);

    /*ignore jslint start*/
    rgb = ((red << 16) | (green << 8) | blue).toString(16);
    /*ignore jslint end*/
    return '#' + "000000".substr(0, 6 - rgb.length) + rgb;
}
const highestContrasts = {};

/**
 * Finds contrast between base color and two optional first and second colors and returns the one which has highest contrast.
 * 
 * @param {string} baseColor Base color to compare with
 * @param {string} firstColor First color.
 * @param {string} secondColor Second color.
 * 
 * @returns {string} Returns highest contrast color compared to base color.
 */
function highestContrast(baseColor, firstColor, secondColor) {
    var result = firstColor,
        key = baseColor + "," + firstColor + "," + secondColor;

    if (highestContrasts.hasOwnProperty(key)) {
        result = highestContrasts[key];
    } else {
        if (luminosity(firstColor, baseColor) < luminosity(secondColor, baseColor)) {
            result = secondColor;
        }
        highestContrasts[key] = result;
    }
    return result;
}
/**
 * Calculates luminosity between two HEX string colors.
 * 
 * @param {string} firstColor First color.
 * @param {string} secondColor Second color.
 * 
 * @returns {number} Returns luminosity value
 */
function luminosity(firstColor, secondColor) {
    var result,
        first = getColorHexValue(firstColor),
        second = getColorHexValue(secondColor),
        firstLuminosity =
        0.2126 * Math.pow(getRed(first) / 255.0, 2.2) +
        0.7152 * Math.pow(getRed(first) / 255.0, 2.2) +
        0.0722 * Math.pow(getRed(first) / 255.0, 2.2),
        secondLuminosity =
        0.2126 * Math.pow(getRed(second) / 255.0, 2.2) +
        0.7152 * Math.pow(getRed(second) / 255.0, 2.2) +
        0.0722 * Math.pow(getRed(second) / 255.0, 2.2);

    if (firstLuminosity > secondLuminosity) {
        result = (firstLuminosity + 0.05) / (secondLuminosity + 0.05);
    }
    else {
        result = (secondLuminosity + 0.05) / (firstLuminosity + 0.05);
    }

    return result;
}

/**
 * @class Size
 * @classdesc Size object defines width and height.
 * 
 * @param {Size} arg0 Size object to clone.
 * 
 * @param {number} arg0 Width.
 * @param {number} arg1 Height.
 */
function Size(arg0, arg1) {
  /**
   * The width
   * @type {number}
   */
  this.width = 0;

  /**
   * The height
   * @type {number}
   */
  this.height = 0;

  switch (arguments.length) {
    case 1:
      this.width = arg0.width;
      this.height = arg0.height;
      break;
    case 2:
      this.width = arg0;
      this.height = arg1;
      break;
  }
}
/**
 * Checks if size is empty. Size is empty if one of its dimensions is undefined or less than zero.
 * 
 * @returns {boolean} Returns true if size is empty.
 */
 Size.prototype.isEmpty = function () {
  return this.width === null || this.height === null || this.width < 0 || this.height < 0;
};

/**
 * Inverts size dimensions
 * 
 * @returns {Size} Returns reference to the current size.
 */
Size.prototype.invert = function () {
  var width = this.width;
  this.width = this.height;
  this.height = width;
  return this;
};

/**
 * Scales the size by the specified value
 * 
 * @param {number} scale
 * @returns {Size} Returns reference to the current size.
 */
Size.prototype.scale = function (scale) {
  this.width = this.width * scale;
  this.height = this.height * scale;
  return this;
};

/**
 * Returns square size
 * 
 * @returns {number} Returns square size.
 */
Size.prototype.space = function () {
  return this.width * this.height;
};


/**
 * Returns size in form of CSS style object.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {object} CSS style object
 */
Size.prototype.getCSS = function (units) {
  units = (units !== undefined) ? units : "px";

  var result = {
    width: this.width + units,
    height: this.height + units
  };
  return result;
};

/**
 * Crops the size by the other size object.
 * 
 * @param {Size} size The size to use as the crop boundaries.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.cropBySize = function (size) {
  this.width = Math.min(this.width, size.width);
  this.height = Math.min(this.height, size.height);

  return this;
};

/**
 * Extends the current size by the other size.
 * 
 * @param {Size} size The size to use as extension.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.maxSize = function (size) {
  this.width = Math.max(this.width, size.width);
  this.height = Math.max(this.height, size.height);

  return this;
};

/**
 * Expands the current size by the thickness object.
 * 
 * @param {Thickness} thickness The thickness to use for expansion.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.addThickness = function (thickness) {
  this.width = Math.max(0, this.width + thickness.left + thickness.right);
  this.height = Math.max(0, this.height + thickness.top + thickness.bottom);

  return this;
};

/**
 * Shrinks the current size by the thickness object.
 * 
 * @param {Thickness} thickness The thickness to use for contraction.
 * @returns {Size} Returns reference to the current size object
 */
Size.prototype.removeThickness = function (thickness) {
  this.width = Math.max(0, this.width - thickness.left - thickness.right);
  this.height = Math.max(0, this.height - thickness.top - thickness.bottom);

  return this;
};

/**
 * Validates size properties
 * 
 * @returns {boolean} Returns true if size properties are valid.
 */
Size.prototype.validate = function () {
  if (isNaN(this.width) || isNaN(this.height)) {
    throw "Invalid size.";
  }
};

function getElementsByName(thisArg, parent, name, onNode) {
  var nodes = parent.getElementsByTagName("*");
  for (var index = 0; index < nodes.length; index += 1) {
    var node = nodes[index];
    if (node.name == name) {
      onNode.call(thisArg, node);
    }
  }
}
function getFixOfPixelAlignment(element) {
  var elementClientRectangle = element.getBoundingClientRect(),
    top = elementClientRectangle.top + document.body.scrollTop,
    left = elementClientRectangle.left + document.body.scrollLeft;
  return new Size(-left + Math.floor(left), -top + Math.floor(top));
}
function getElementOffset(element) {
  var rect = element.getBoundingClientRect();
  var ownerDocument = element.ownerDocument;
  var documentElement = ownerDocument.documentElement;

  return {
    top: rect.top + window.pageYOffset - documentElement.clientTop,
    left: rect.left + window.pageXOffset - documentElement.clientLeft
  };
}
function hasClass(element, className) {
  var classNames = element.className;
  if (classNames != null && typeof classNames == "string") {
    var list = classNames.split(" ");
    for (var index = 0; index < list.length; index += 1) {
      if (list[index] == className) {
        return true;
      }
    }
  }
  return false;
}
/**
 * This method uses various approaches used in different browsers to stop event propagation.
 * @param {object} event Event to be stopped
 * @ignore
 */
function stopPropagation(event) {
  if (event.stopPropagation !== undefined) {
    event.stopPropagation();
  } else if (event.cancelBubble !== undefined) {
    event.cancelBubble = true;
  } else if (event.preventDefault !== undefined) {
    event.preventDefault();
  }
}
function getInnerSize(element) {
  var size = window.getComputedStyle(element);

  return new Size(parseInt(size.width, 10), parseInt(size.height, 10));
}

/*
  jsonml-html.js
  JsonML to HTML utility

  Created: 2006-11-09-0116
  Modified: 2012-11-24-1051

  Copyright (c)2006-2012 Stephen M. McKamey
  Distributed under The MIT License: http://jsonml.org/license

  This file ensures a global JsonML object adding these methods:

    JsonML.toHTML(JsonML, filter)

      This method produces a tree of DOM elements from a JsonML tree. The
      array must not contain any cyclical references.

      The optional filter parameter is a function which can filter and
      transform the results. It receives each of the DOM nodes, and
      its return value is used instead of the original value. If it
      returns what it received, then structure is not modified. If it
      returns undefined then the member is deleted.

      This is useful for binding unobtrusive JavaScript to the generated
      DOM elements.

      Example:

      // Parses the structure. If an element has a specific CSS value then
      // takes appropriate action: Remove from results, add special event
      // handlers, or bind to a custom component.

      var myUI = JsonML.toHTML(myUITemplate, function (elem) {
        if (elem.className.indexOf('Remove-Me') >= 0) {
          // this will remove from resulting DOM tree
          return null;
        }

        if (elem.tagName && elem.tagName.toLowerCase() === 'a' &&
          elem.className.indexOf('External-Link') >= 0) {
          // this is the equivalent of target='_blank'
          elem.onclick = function(evt) {
            window.open(elem.href); return false;
          };

        } else if (elem.className.indexOf('Fancy-Widgit') >= 0) {
          // bind to a custom component
          FancyWidgit.bindDOM(elem);
        }
        return elem;
      });

    JsonML.toHTMLText(JsonML)
      Converts JsonML to HTML text

    // Implement onerror to handle any runtime errors while binding:
    JsonML.onerror = function (ex, jml, filter) {
      // display inline error message
      return document.createTextNode('['+ex+']');
    };
*/

const JsonML = {};

if (typeof document !== 'undefined') {

  (function (JsonML, document) {

    /**
     * Attribute name map
     * 
     * @private
     * @constant
     * @type {Object.<string>}
     */
    var ATTR_MAP = {
      'accesskey': 'accessKey',
      'bgcolor': 'bgColor',
      'cellpadding': 'cellPadding',
      'cellspacing': 'cellSpacing',
      'checked': 'defaultChecked',
      'class': 'className',
      'colspan': 'colSpan',
      'contenteditable': 'contentEditable',
      'defaultchecked': 'defaultChecked',
      'for': 'htmlFor',
      'formnovalidate': 'formNoValidate',
      'hidefocus': 'hideFocus',
      'ismap': 'isMap',
      'maxlength': 'maxLength',
      'novalidate': 'noValidate',
      'readonly': 'readOnly',
      'rowspan': 'rowSpan',
      'spellcheck': 'spellCheck',
      'tabindex': 'tabIndex',
      'usemap': 'useMap',
      'willvalidate': 'willValidate'
      // can add more attributes here as needed
    };

    /**
     * Attribute duplicates map
     * 
     * @private
     * @constant
     * @type {Object.<string>}
     */
    var ATTR_DUP = {
      'enctype': 'encoding',
      'onscroll': 'DOMMouseScroll'
      // can add more attributes here as needed
    };

    /**
     * Attributes to be set via DOM
     * 
     * @private
     * @constant
     * @type {Object.<number>}
     */
    var ATTR_DOM = {
      'autocapitalize': 1,
      'autocomplete': 1,
      'autocorrect': 1
      // can add more attributes here as needed
    };

    /**
     * Boolean attribute map
     * 
     * @private
     * @constant
     * @type {Object.<number>}
     */
    var ATTR_BOOL = {
      'async': 1,
      'autofocus': 1,
      'checked': 1,
      'defaultchecked': 1,
      'defer': 1,
      'disabled': 1,
      'formnovalidate': 1,
      'hidden': 1,
      'indeterminate': 1,
      'ismap': 1,
      'multiple': 1,
      'novalidate': 1,
      'readonly': 1,
      'required': 1,
      'spellcheck': 1,
      'willvalidate': 1
      // can add more attributes here as needed
    };

    /**
     * Leading SGML line ending pattern
     * 
     * @private
     * @constant
     * @type {RegExp}
     */
    var LEADING = /^[\r\n]+/;

    /**
     * Trailing SGML line ending pattern
     * 
     * @private
     * @constant
     * @type {RegExp}
     */
    var TRAILING = /[\r\n]+$/;

    /**
     * @private
     * @const
     * @type {number}
     */
    var NUL = 0;

    /**
     * @private
     * @const
     * @type {number}
     */
    var FUN = 1;

    /**
     * @private
     * @const
     * @type {number}
     */
    var ARY = 2;

    /**
     * @private
     * @const
     * @type {number}
     */
    var OBJ = 3;

    /**
     * @private
     * @const
     * @type {number}
     */
    var VAL = 4;

    /**
     * @private
     * @const
     * @type {number}
     */
    var RAW = 5;

    /**
     * Wraps a data value to maintain as raw markup in output
     * 
     * @private
     * @this {Markup}
     * @param {string} value The value
     * @constructor
     */
    function Markup(value) {
      /**
       * @type {string}
       * @const
       * @protected
       */
      this.value = value;
    }

    /**
     * Renders the value
     * 
     * @public
     * @ignore
     * @override
     * @this {Markup}
     * @return {string} value
     */
    Markup.prototype.toString = function () {
      return this.value;
    };

    /**
     * @ignore
     * @param {string} value
     * @return {Markup}
     */
    JsonML.raw = function (value) {
      return new Markup(value);
    };

    /**
     * @ignore
     * @param {*} value
     * @return {boolean}
     */
    var isMarkup = JsonML.isRaw = function (value) {
      return (value instanceof Markup);
    };

    /**
     * Determines if the value is an Array
     * 
     * @private
     * @param {*} val the object being tested
     * @return {boolean}
     */
    var isArray = Array.isArray || function (val) {
      return (val instanceof Array);
    };

    /**
     * Determines if the value is a function
     * 
     * @private
     * @param {*} val the object being tested
     * @return {boolean}
     */
    function isFunction(val) {
      return (typeof val === 'function');
    }

    /**
     * Determines the type of the value
     * 
     * @private
     * @param {*} val the object being tested
     * @return {number}
     */
    function getType(val) {
      switch (typeof val) {
        case 'object':
          return !val ? NUL : (isArray(val) ? ARY : (isMarkup(val) ? RAW : ((val instanceof Date) ? VAL : OBJ)));
        case 'function':
          return FUN;
        case 'undefined':
          return NUL;
        default:
          return VAL;
      }
    }

    /**
     * Creates a DOM element 
     * 
     * @private
     * @param {string} tag The element's tag name
     * @return {Node}
     */
    var createElement = function (tag) {
      if (!tag) {
        // create a document fragment to hold multiple-root elements
        if (document.createDocumentFragment) {
          return document.createDocumentFragment();
        }

        tag = '';

      } else if (tag.charAt(0) === '!') {
        return document.createComment(tag === '!' ? '' : tag.substr(1) + ' ');
      }

      if (tag.toLowerCase() === 'style' && document.createStyleSheet) {
        // IE requires this interface for styles
        return document.createStyleSheet();
      }

      return document.createElement(tag);
    };

    /**
     * Adds an event handler to an element
     * 
     * @private
     * @param {Node} elem The element
     * @param {string} name The event name
     * @param {function(Event)} handler The event handler
     */
    var addHandler = function (elem, name, handler) {
      if (name.substr(0, 2) === 'on') {
        name = name.substr(2);
      }

      switch (typeof handler) {
        case 'function':
          if (elem.addEventListener) {
            // DOM Level 2
            elem.addEventListener(name, handler, false);

          } else if (elem.attachEvent && getType(elem[name]) !== NUL) {
            // IE legacy events
            elem.attachEvent('on' + name, handler);

          } else {
            // DOM Level 0
            var old = elem['on' + name] || elem[name];
            elem['on' + name] = elem[name] = !isFunction(old) ? handler :
              function (e) {
                return (old.call(this, e) !== false) && (handler.call(this, e) !== false);
              };
          }
          break;

        case 'string':
          // inline functions are DOM Level 0
          /*jslint evil:true */
          elem['on' + name] = new Function('event', handler);
          /*jslint evil:false */
          break;
      }
    };

    /**
     * Apply styles to element
     * 
     * @public
     * @ignore
     * @param {Node} elem The element
     * @param {Object} css styles object
     * @return {Node}
     */
    var applyStyles = JsonML.applyStyles = function (elem, css) {
      for (var key in css) {
        if (css.hasOwnProperty(key)) {
          elem.style[key] = css[key];
        }
      }
      return elem;
    };

    /**
     * Appends an attribute to an element
     * 
     * @private
     * @param {Node} elem The element
     * @param {Object} attr Attributes object
     * @return {Node}
     */
    var addAttributes = function (elem, attr) {
      if (attr.name && document.attachEvent && !elem.parentNode) {
        try {
          // IE fix for not being able to programatically change the name attribute
          var alt = createElement('<' + elem.tagName + ' name="' + attr.name + '">');
          // fix for Opera 8.5 and Netscape 7.1 creating malformed elements
          if (elem.tagName === alt.tagName) {
            elem = alt;
          }
        } catch (ex) { }
      }

      // for each attributeName
      for (var name in attr) {
        if (attr.hasOwnProperty(name)) {
          // attributeValue
          var value = attr[name],
            type = getType(value);

          if (name) {
            if (type === NUL) {
              value = '';
              type = VAL;
            }

            name = ATTR_MAP[name.toLowerCase()] || name;

            if (name === '$') {
              value(elem);
            }
            else if (name == 'className') {
              if (isArray(value)) {
                for (var index = 0; index < value.length; index += 1) {
                  elem.className += " " + value[index];
                }
              } else {
                elem.className += " " + value;
              }
            }
            else if (name === 'style') {
              if (getType(elem.style.cssText) !== NUL) {
                if (typeof value == "string") {
                  elem.style.cssText = value;
                } else {
                  applyStyles(elem, value);
                }
              } else {
                elem.style = value;
              }

            } else if (name.substr(0, 2) === 'on') {
              addHandler(elem, name, value);

              // also set duplicated events
              name = ATTR_DUP[name];
              if (name) {
                addHandler(elem, name, value);
              }

            } else if (!ATTR_DOM[name.toLowerCase()] && (type !== VAL || name.charAt(0) === '$' || getType(elem[name]) !== NUL || getType(elem[ATTR_DUP[name]]) !== NUL)) {
              // direct setting of existing properties
              elem[name] = value;

              // also set duplicated properties
              name = ATTR_DUP[name];
              if (name) {
                elem[name] = value;
              }

            } else if (ATTR_BOOL[name.toLowerCase()]) {
              if (value) {
                // boolean attributes
                elem.setAttribute(name, name);

                // also set duplicated attributes
                name = ATTR_DUP[name];
                if (name) {
                  elem.setAttribute(name, name);
                }
              }

            } else {
              // http://www.quirksmode.org/dom/w3c_core.html#attributes

              // custom and 'data-*' attributes
              elem.setAttribute(name, value);

              // also set duplicated attributes
              name = ATTR_DUP[name];
              if (name) {
                elem.setAttribute(name, value);
              }
            }
          }
        }
      }
      return elem;
    };

    /**
     * Appends a child to an element
     * 
     * @private
     * @param {Node} elem The parent element
     * @param {Node} child The child
     */
    var appendDOM = JsonML.appendDOM = function (elem, child) {
      if (child) {
        var tag = (elem.tagName || '').toLowerCase();
        if (elem.nodeType === 8) { // comment
          if (child.nodeType === 3) { // text node
            elem.nodeValue += child.nodeValue;
          }
        } else if (tag === 'table' && elem.tBodies) {
          if (!child.tagName) {
            // must unwrap documentFragment for tables
            if (child.nodeType === 11) {
              while (child.firstChild) {
                appendDOM(elem, child.removeChild(child.firstChild));
              }
            }
            return;
          }

          // in IE must explicitly nest TRs in TBODY
          var childTag = child.tagName.toLowerCase();// child tagName
          if (childTag && childTag !== 'tbody' && childTag !== 'thead') {
            // insert in last tbody
            var tBody = elem.tBodies.length > 0 ? elem.tBodies[elem.tBodies.length - 1] : null;
            if (!tBody) {
              tBody = createElement(childTag === 'th' ? 'thead' : 'tbody');
              elem.appendChild(tBody);
            }
            tBody.appendChild(child);
          } else if (elem.canHaveChildren !== false) {
            elem.appendChild(child);
          }

        } else if (tag === 'style' && document.createStyleSheet) {
          // IE requires this interface for styles
          elem.cssText = child;

        } else if (elem.canHaveChildren !== false) {
          elem.appendChild(child);

        } else if (tag === 'object' &&
          child.tagName && child.tagName.toLowerCase() === 'param') {
          // IE-only path
          try {
            elem.appendChild(child);
          } catch (ex1) { }
          try {
            if (elem.object) {
              elem.object[child.name] = child.value;
            }
          } catch (ex2) { }
        }
      }
    };

    /**
     * Tests a node for whitespace
     * 
     * @private
     * @param {Node} node The node
     * @return {boolean}
     */
    var isWhitespace = function (node) {
      return !!node && (node.nodeType === 3) && (!node.nodeValue || !/\S/.exec(node.nodeValue));
    };

    /**
     * Trims whitespace pattern from the text node
     * 
     * @private
     * @param {Node} node The node
     */
    var trimPattern = function (node, pattern) {
      if (!!node && (node.nodeType === 3) && pattern.exec(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(pattern, '');
      }
    };

    /**
     * Removes leading and trailing whitespace nodes
     * 
     * @private
     * @param {Node} elem The node
     */
    var trimWhitespace = function (elem) {
      if (elem) {
        while (isWhitespace(elem.firstChild)) {
          // trim leading whitespace text nodes
          elem.removeChild(elem.firstChild);
        }
        // trim leading whitespace text
        trimPattern(elem.firstChild, LEADING);
        while (isWhitespace(elem.lastChild)) {
          // trim trailing whitespace text nodes
          elem.removeChild(elem.lastChild);
        }
        // trim trailing whitespace text
        trimPattern(elem.lastChild, TRAILING);
      }
    };

    /**
     * Converts the markup to DOM nodes
     * 
     * @private
     * @param {string|Markup} value The node
     * @return {Node}
     */
    var toDOM = function (value) {
      var wrapper = createElement('div');
      wrapper.innerHTML = '' + value;

      // trim extraneous whitespace
      trimWhitespace(wrapper);

      // eliminate wrapper for single nodes
      if (wrapper.childNodes.length === 1) {
        return wrapper.firstChild;
      }

      // create a document fragment to hold elements
      var frag = createElement('');
      while (wrapper.firstChild) {
        frag.appendChild(wrapper.firstChild);
      }
      return frag;
    };

    /**
     * Default error handler
     * @ignore
     * @param {Error} ex
     * @return {Node}
     */
    var onError = function (ex) {
      return document.createTextNode('[' + ex + ']');
    };

    /* override this to perform custom error handling during binding */
    JsonML.onerror = null;

    /**
     * also used by JsonML.BST
     * @ignore
     * @param {Node} elem
     * @param {*} jml
     * @param {function} filter
     * @return {Node}
     */
    var patch = JsonML.patch = function (elem, jml, filter) {

      for (var i = 1; i < jml.length; i += 1) {
        if (isArray(jml[i]) || 'string' === typeof jml[i]) {
          // append children
          appendDOM(elem, toHTML(jml[i], filter));

        } else if (isMarkup(jml[i])) {
          appendDOM(elem, toDOM(jml[i].value));

        } else if ('object' === typeof jml[i] && jml[i] !== null && elem.nodeType === 1) {
          // add attributes
          elem = addAttributes(elem, jml[i]);
        }
      }

      return elem;
    };

    /**
     * Main builder entry point
     * @ignore
     * @param {string|array} jml
     * @param {function} filter
     * @return {Node}
     */
    var toHTML = JsonML.toHTML = function (jml, filter) {
      try {
        if (!jml) {
          return null;
        }
        if ('string' === typeof jml) {
          return document.createTextNode(jml);
        }
        if (isMarkup(jml)) {
          return toDOM(jml.value);
        }
        if (!isArray(jml) || ('string' !== typeof jml[0])) {
          throw new SyntaxError('invalid JsonML');
        }

        var tagName = jml[0]; // tagName
        if (!tagName) {
          // correctly handle a list of JsonML trees
          // create a document fragment to hold elements
          var frag = createElement('');
          for (var i = 1; i < jml.length; i += 1) {
            appendDOM(frag, toHTML(jml[i], filter));
          }

          // trim extraneous whitespace
          trimWhitespace(frag);

          // eliminate wrapper for single nodes
          if (frag.childNodes.length === 1) {
            return frag.firstChild;
          }
          return frag;
        }

        if (tagName.toLowerCase() === 'style' && document.createStyleSheet) {
          // IE requires this interface for styles
          patch(document.createStyleSheet(), jml, filter);
          // in IE styles are effective immediately
          return null;
        }

        var elem = patch(createElement(tagName), jml, filter);

        // trim extraneous whitespace
        trimWhitespace(elem);
        return (elem && isFunction(filter)) ? filter(elem) : elem;
      } catch (ex) {
        try {
          // handle error with complete context
          var err = isFunction(JsonML.onerror) ? JsonML.onerror : onError;
          return err(ex, jml, filter);
        } catch (ex2) {
          return document.createTextNode('[' + ex2 + ']');
        }
      }
    };

    /**
     * Not super efficient.
     * TODO: port render.js from DUEL
     * @ignore
     * @param {string|array} jml JsonML structure
     * @return {string} HTML text
     */
    JsonML.toHTMLText = function (jml, filter) {
      var elem = toHTML(jml, filter);
      if (elem.outerHTML) {
        return elem.outerHTML;
      }

      var parent = createElement('div');
      parent.appendChild(elem);

      var html = parent.innerHTML;
      parent.removeChild(elem);

      return html;
    };

  })(JsonML, document);
}

var JsonML$1 = JsonML;

/**
 * @class Point
 * @classdesc Class represents pair of x and y coordinates that define a point in 2D plane.
 * 
 * @param {Point} arg0 Point object to clone.
 * 
 * @param {number} arg0 The x coordinate.
 * @param {number} arg1 The y coordinate.
 */
function Point(arg0, arg1) {
  /**
   * The x coordinate
   * @type {number}
   */
  this.x = null;
  /**
   * The y coordinate
   * @type {number}
   */
  this.y = null;

  /**
   * Reference to the context object associated with this point.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.x = arg0.x;
      this.y = arg0.y;
      this.context = arg0.context;
      break;
    case 2:
      this.x = arg0;
      this.y = arg1;
      break;
  }
}
/**
 * Scales the point location by the specified value
 * 
 * @param {number} scale
 * @returns {Point} Returns reference to the current point.
 */
Point.prototype.scale = function (scale) {
  this.x = this.x * scale;
  this.y = this.y * scale;
  return this;
};

/**
 * Calculates distance to the specified point
 * 
 * @param {Point} arg0 Point
 * 
 * @param {number} arg0 X coordinate
 * @param {number} arg1 Y coordinate
 * 
 * @returns {number} Returns distance to the specified point
 */
Point.prototype.distanceTo = function (arg0, arg1) {
  var x2 = 0,
    y2 = 0,
    a,
    b;
  switch (arguments.length) {
    case 1:
      x2 = arg0.x;
      y2 = arg0.y;
      break;
    case 2:
      x2 = arg0;
      y2 = arg1;
      break;
  }
  a = this.x - x2;
  b = this.y - y2;
  return Math.sqrt(a * a + b * b);
};

/**
 * Checks if points are equal
 * 
 * @param {Point} point Point
 * @returns {boolean} Returns true if points are equal.
 */
Point.prototype.equalTo = function (point) {
  return this.x == point.x && this.y == point.y;
};

/**
 * Swaps values of 2 points
 * 
 * @param {Point} point The point to swap values with
 */
Point.prototype.swap = function (point) {
  var x = point.x,
    y = point.y;

  point.x = this.x;
  point.y = this.y;

  this.x = x;
  this.y = y;
};

/**
 * Clones the point
 * 
 * @returns {Point} Returns copy of the point.
 */
Point.prototype.clone = function () {
  return new Point(this);
};

/**
 * Returns point in form of CSS style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */
Point.prototype.toString = function (units) {
  var result = "";

  units = (units !== undefined) ? units : "px";

  result += "left:" + this.x + units + ";";
  result += "top:" + this.y + units + ";";

  return result;
};

/**
 * Returns size in form of CSS style object.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {object} CSS style object
 */
Point.prototype.getCSS = function (units) {
  units = (units !== undefined) ? units : "px";

  var result = {
    left: this.x + units,
    top: this.y + units
  };
  return result;
};

/**
 * @class Matrix
 * @classdesc Square matrix having 2 rows and 2 columns.
 * 
 * @param {Matrix} arg0 Matrix to clone
 * 
 * @param {number} arg0 A1 - top left.
 * @param {number} arg1 B1 - top right.
 * @param {number} arg2 A2 - bottom left.
 * @param {number} arg3 B2 - bottom right.
 */
function Matrix(arg0, arg1, arg2, arg3) {

  this.a1 = null;
  this.b1 = null;
  this.a2 = null;
  this.b2 = null;

  switch (arguments.length) {
    case 1:
      this.a1 = arg0.a1;
      this.b1 = arg0.b1;
      this.a2 = arg0.a2;
      this.b2 = arg0.b2;
      break;
    case 4:
      this.a1 = arg0;
      this.b1 = arg1;
      this.a2 = arg2;
      this.b2 = arg3;
      break;
  }
}
/**
 * Finds matrix determinant
 * 
 * @returns {number} Returns matrix determinant
 */
Matrix.prototype.determinant = function () {
  return this.a1 * this.b2 - this.b1 * this.a2;
};

/**
 * @class Vector
 * @classdesc Class defines a vector in 2D plane.
 * 
 * @param {Vector} arg0 Vector object to clone.
 * 
 * @param {Point} arg0 From point.
 * @param {Point} arg1 To point
 */
function Vector(arg0, arg1) {
  /**
   * The start point
   */
  this.from = null;

  /**
   * The end point
   */
  this.to = null;

  /**
   * Reference to context object associated with this vector.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.from = arg0.from;
      this.to = arg0.to;
      break;
    case 2:
      this.from = arg0;
      this.to = arg1;
      break;
  }
}
/**
 * Checks if start and end points are the same
 * 
 * @returns {boolean} Returns true if start and end points are the same.
 */
Vector.prototype.isNull = function () {
  return this.from.x == this.to && this.from.y == this.to.y;
};

/**
 * Vector length
 * 
 * @returns {number} Returns vector length
 */
Vector.prototype.length = function () {
  return this.from.distanceTo(this.to);
};

/**
 * Checks if vectors are equal
 * 
 * @param {Vector} vector Vector
 * @returns {boolean} Returns true if vectors are equal.
 */
Vector.prototype.equalTo = function (vector) {
  return this.from.equalTo(vector.from) && this.to.equalTo(vector.to);
};

/**
 * Returns middle point of the current vector
 * 
 * @returns {Point} Returns middle point
 */
Vector.prototype.getMiddlePoint = function () {
  return new Point((this.from.x + this.to.x) / 2, (this.from.y + this.to.y) / 2);
};

/**
 * Finds how two vectors relate to each other
 * 
 * @param {Vector} vector The vector to relate with
 * @returns {VectorRelationType} Returns how the vector relates to the specified vector
 */
Vector.prototype.relateTo = function (vector) {
  var result = VectorRelationType.None,
    x1 = this.to.x - this.from.x,
    y1 = this.to.y - this.from.y,
    x2 = vector.to.x - vector.from.x,
    y2 = vector.to.y - vector.from.y,
    key = (x1 ? 8 : 0) + (y1 ? 4 : 0) + (x2 ? 2 : 0) + (y2 ? 1 : 0);

  switch (key) {
    case 0: //0000
    case 1: //0001
    case 2: //0010
    case 3: //0011
    case 4: //0100
    case 8: //1000
    case 12://1100
      result = VectorRelationType.Null;
      break;
    case 5: //0101
      if (y1 * y2 > 0) {
        result = VectorRelationType.Collinear;
      } else {
        result = VectorRelationType.Opposite;
      }
      break;
    case 10://1010
      if (x1 * x2 > 0) {
        result = VectorRelationType.Collinear;
      } else {
        result = VectorRelationType.Opposite;
      }
      break;
    case 15://1111
      if (x1 / x2 == y1 / y2) {
        if (x1 / x2 > 0) {
          result = VectorRelationType.Collinear;
        } else {
          result = VectorRelationType.Opposite;
        }
      }
      break;
  }
  return result;
};

/**
 * Offsets vector coordinates
 * 
 * @param {number} offset Offset
 */
Vector.prototype.offset = function (offset) {
  var length = this.length(),
    /* in order to rotate right multiply vector on 3D vector (0, 0, -1)*/
    x = (this.to.y - this.from.y) * offset / length,
    y = - (this.to.x - this.from.x) * offset / length;

  this.from.x += x;
  this.from.y += y;
  this.to.x += x;
  this.to.y += y;
};

/**
 * Gets line
 * 
 * @returns {number[]} Returns line coefficients
 */
Vector.prototype.getLine = function () {
  var x1 = this.from.x,
    y1 = this.from.y,
    x2 = this.to.x,
    y2 = this.to.y,
    a = y2 - y1,
    b = x1 - x2,
    c = x1 * (y1 - y2) + y1 * (x2 - x1);

  return [a, b, c];
};

/**
 * Gets line key
 * 
 * @returns {string} Returns unique line key
 */
Vector.prototype.getLineKey = function () {
  var line = this.getLine(),
    a = line[0],
    b = line[1],
    c = line[2],
    r = 10000;
  if (b !== 0) {
    line = [Math.floor(a / b * r), 1, Math.floor(c / b * r)];
  } else {
    line = [1, 0, Math.floor(c / a * r)];
  }
  return line.toString();
};

/**
 * Checks if two vectors have intersection point
 * 
 * @param {vector} vector The vector to check intersection with
 * @returns {boolean} Returns true if vectors intersect
 */
Vector.prototype.intersect = function (vector) {
  var v1 = this.getLine(),
    v2 = vector.getLine(),
    m = new Matrix(v1[0], v1[1], v2[0], v2[1]),
    d = m.determinant(),
    mx, my, dx, dy,
    x, y,
    result = false;

  if (d !== 0) {
    mx = new Matrix(-v1[2], v1[1], -v2[2], v2[1]);
    dx = mx.determinant();
    my = new Matrix(v1[0], -v1[2], v2[0], -v2[2]);
    dy = my.determinant();
    x = dx / d;
    y = dy / d;

    vector.to.x = x;
    vector.to.y = y;

    this.from.x = x;
    this.from.y = y;

    result = true;
  }

  return result;
};

/**
 * Finds intersection point of two vectors
 * 
 * @param {Vector} vector The vector to find intersection with
 * @param {boolean} strict If true then intersection point should belong to both vectors
 * @param {number} rounding The precision of calculations
 * @returns {Point|null} Returns intersection point or null if intersection does not exists
 */
Vector.prototype.getIntersectionPoint = function (vector, strict, rounding) {
  var v1 = this.getLine(),
    v2 = vector.getLine(),
    m = new Matrix(v1[0], v1[1], v2[0], v2[1]),
    d = m.determinant(),
    mx, my, dx, dy,
    x, y,
    result = null;

  if (d !== 0) {
    mx = new Matrix(-v1[2], v1[1], -v2[2], v2[1]);
    dx = mx.determinant();
    my = new Matrix(v1[0], -v1[2], v2[0], -v2[2]);
    dy = my.determinant();
    x = dx / d;
    y = dy / d;

    if (strict) {
      if (vector._contains(x, y, rounding) && this._contains(x, y, rounding)) {
        result = new Point(x, y);
      }
    } else {
      result = new Point(x, y);
    }
  }

  return result;
};

/**
 * @ignore
 */
Vector.prototype._contains = function (x, y, rounding) {
  var x1 = Math.min(this.from.x, this.to.x),
    y1 = Math.min(this.from.y, this.to.y),
    x2 = Math.max(this.from.x, this.to.x),
    y2 = Math.max(this.from.y, this.to.y);

  return x1 - rounding <= x && x <= x2 + rounding && y1 - rounding <= y && y <= y2 + rounding;
};

/**
 * @class Interval
 * @classdesc Class represents interval defined by two values.
 * 
 * @param {Interval} arg0 Interval object to clone.
 * 
 * @param {number} arg0 The from value.
 * @param {number} arg1 The to value.
 */
function Interval(arg0, arg1, arg2) {
  /**
   * The from value
   * @type {number}
   */
  this.from = null;
  /**
   * The to value
   * @type {number}
   */
  this.to = null;

  /**
   * Reference to the context object associated with this Interval.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.from = arg0.from;
      this.to = arg0.to;
      this.context = arg0.context;
      break;
    case 2:
      this.from = arg0;
      this.to = arg1;
      break;
    case 3:
      this.from = arg0;
      this.to = arg1;
      this.context = arg2;
      break;
  }
}
/**
 * Width
 * 
 * @returns {number} Returns interval width
 */
Interval.prototype.width = function () {
  return this.to - this.from;
};

/**
 * Checks if intervals are equal
 * 
 * @param {Interval} interval Interval
 * @returns {boolean} Returns true if intervals are equal.
 */
Interval.prototype.equalTo = function (interval) {
  return this.from == interval.from && this.to == interval.to;
};


/**
 * Clones the interval
 * 
 * @returns {Interval} Returns copy of the interval.
 */
Interval.prototype.clone = function () {
  return new Interval(this);
};

/**
 * Returns interval in form of user friendly string 
 * 
 * @returns {string} Returns string interval representation.
 */
Interval.prototype.toString = function () {
  return this.from + ", " + this.to;
};

/**
 * Checks if the interval overlaps the specified interval
 * 
 * @param {Interval} interval The interval to check overlapping for.
 * @returns {boolean} Returns true if two intervals overlap each other.
 */
Interval.prototype.overlaps = function (interval) {
  var result = true;
  if (this.to < interval.from || interval.to < this.from) {
    result = false;
  }
  return result;
};

/**
 * @class Rect
 * @classdesc Class describes the width, height and location of rectangle.
 * 
 * @param {Rect} arg0 Rectangle to clone.
 * 
 * @param {Point} arg0 The top left point.
 * @param {Point} arg1 The bottom right point.
 * 
 * @param {number} arg0 The x coordinate of top left corner.
 * @param {number} arg1 The y coordinate of top left corner.
 * @param {number} arg2 Rect width.
 * @param {number} arg3 Rect height.
 */
function Rect(arg0, arg1, arg2, arg3) {
  /**
   * The location x coordinate
   * @type {number}
   */
  this.x = null;
  /**
   * The location y coordinate
   * @type {number}
   */
  this.y = null;
  /**
   * The width of rectangle.
   * @type {number}
   */
  this.width = null;
  /**
   * The height of rectangle.
   * @type {number}
   */
  this.height = null;
  /**
   * Reference to context object associated with this rectangle.
   * @type {object}
   */
  this.context = null;

  switch (arguments.length) {
    case 1:
      this.x = arg0.x;
      this.y = arg0.y;
      this.width = arg0.width;
      this.height = arg0.height;
      break;
    case 2:
      this.x = Math.min(arg0.x, arg1.x);
      this.y = Math.min(arg0.y, arg1.y);
      this.width = Math.abs(arg1.x - arg0.x);
      this.height = Math.abs(arg1.y - arg0.y);
      break;
    case 4:
      this.x = arg0;
      this.y = arg1;
      this.width = arg2;
      this.height = arg3;
      break;
  }
}
/**
 * Left
 * 
 * @returns {number} Returns x coordinate of the rectangle
 */
Rect.prototype.left = function () {
  return this.x;
};

/**
 * Top
 * 
 * @returns {number} Returns y coordinate of the rectangle
 */
Rect.prototype.top = function () {
  return this.y;
};

/**
 * Right
 * 
 * @returns {number} Returns x-axis coordinate of the right side of the rectangle
 */
Rect.prototype.right = function () {
  return this.x + this.width;
};

/**
 * Bottom
 * 
 * @returns {number} Returns y-axis coordinate of the bottom side of the rectangle
 */
Rect.prototype.bottom = function () {
  return this.y + this.height;
};

/**
 * Vertical center
 * 
 * @returns {number} Returns y-axis coordinate of the center point of the rectangle.
 */
Rect.prototype.verticalCenter = function () {
  return this.y + this.height / 2.0;
};

/**
 * Horizontal center
 * 
 * @returns {number} Returns x-axis coordinate of the center point of the rectangle.
 */
Rect.prototype.horizontalCenter = function () {
  return this.x + this.width / 2.0;
};

/**
 * Center point
 * 
 * @returns {Point} Returns center point of the rectangle.
 */
Rect.prototype.centerPoint = function () {
  return new Point(this.horizontalCenter(), this.verticalCenter());
};

/**
 * Checks if rectangle is empty. Rectangle is empty if one of its sizes is undefined or less than zero.
 * 
 * @returns {boolean} Returns true if rectangle is empty.
 */
Rect.prototype.isEmpty = function () {
  return this.x === null || this.y === null || this.width === null || this.height === null || this.width < 0 || this.height < 0;
};

/**
 * Expands rectangle boundaries by using specified value in all directions. Value can be negative.
 * 
 * @param {number} arg0 The amount by which to expand or shrink the sides of the rectangle.
 * @param {number} arg0 Left side
 * @param {number} arg1 Top side
 * @param {number} arg2 Right side
 * @param {number} arg3 Bottom side
 */
Rect.prototype.offset = function (arg0, arg1, arg2, arg3) {
  switch (arguments.length) {
    case 1:
      if (arg0 !== null && typeof arg0 == "object") {
        this.x = this.x - arg0.left;
        this.y = this.y - arg0.top;

        this.width = this.width + arg0.left + arg0.right;
        this.height = this.height + arg0.top + arg0.bottom;
      } else {
        this.x = this.x - arg0;
        this.y = this.y - arg0;

        this.width = this.width + arg0 * 2.0;
        this.height = this.height + arg0 * 2.0;
      }
      break;
    case 4:
      this.x = this.x - arg0;
      this.y = this.y - arg1;

      this.width = this.width + arg0 + arg2;
      this.height = this.height + arg1 + arg3;
      break;
  }
  return this;
};

/**
 * Scales the rectangle by the specified value
 * 
 * @param {number} scale
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.scale = function (scale) {
  this.x = this.x * scale;
  this.y = this.y * scale;
  this.width = this.width * scale;
  this.height = this.height * scale;
  return this;
};

/**
 * Moves the rectangle by the specified horizontal and vertical offsets.
 * 
 * @param {number} x Horizontal offset
 * @param {number} y Vertical offset
 * 
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.translate = function (x, y) {
  this.x = this.x + x;
  this.y = this.y + y;

  return this;
};

/**
 * Inverts rectangle coordinates
 * 
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.invert = function () {
  var width = this.width,
    x = this.x;
  this.width = this.height;
  this.height = width;
  this.x = this.y;
  this.y = x;
  return this;
};

/**
 * Callback for iterating rectangle's sides
 *
 * @callback loopRectEdgesCallback
 * @param {Vector} vector Vector connecting two corners of the rectangle's side
 * @param {PlacementType} placementType The current side
 * @returns {boolean} Returns true to break iteration process
 */

/**
 * Loops edges of the rectangle in the clockwise order: Top, Right, Bottom, Left
 *
 * @param {loopRectEdgesCallback} callback A callback function to iterate over sides of the rectangle. 
 * @returns {Rect} Returns reference to the current rectangle.
*/
Rect.prototype.loopEdges = function (callback) { // function(vector, placementType) {}
  var vertexes = [
    new Point(this.left(), this.top()),
    new Point(this.right(), this.top()),
    new Point(this.right(), this.bottom()),
    new Point(this.left(), this.bottom())
  ],
    placements = [
      PlacementType.Top,
      PlacementType.Right,
      PlacementType.Bottom,
      PlacementType.Left
    ];

  vertexes.push(vertexes[0]);



  if (callback != null) {
    for (var index = 1, len = vertexes.length; index < len; index += 1) {
      if (callback(new Vector(vertexes[index - 1], vertexes[index]), placements[index - 1])) {
        break;
      }
    }
  }
  return this;
};

/**
 * Checks if the rectangle contains given point
 * 
 * @param {Point} arg0 The point to check.
 * 
 * @param {number} arg0  The x coordinate of the point to check.
 * @param {number} arg1  The y coordinate of the point to check.
 * @returns {boolean} Returns true if the rectangle contains the specified point; otherwise, false.
 */
Rect.prototype.contains = function (arg0, arg1) {
  switch (arguments.length) {
    case 1:
      return this.x <= arg0.x && arg0.x <= this.x + this.width && this.y <= arg0.y && arg0.y <= this.y + this.height;
    case 2:
      return this.x <= arg0 && arg0 <= this.x + this.width && this.y <= arg1 && arg1 <= this.y + this.height;
    default:
      return false;
  }
};

/**
 * Crops the rectangle by the boundaries of the specified rectangle.
 * 
 * @param {Rect} rect The rectangle that is used to crop boundaries by
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.cropByRect = function (rect) {
  if (this.x < rect.x) {
    this.width -= (rect.x - this.x);
    this.x = rect.x;
  }

  if (this.right() > rect.right()) {
    this.width -= (this.right() - rect.right());
  }

  if (this.y < rect.y) {
    this.height -= (rect.y - this.y);
    this.y = rect.y;
  }

  if (this.bottom() > rect.bottom()) {
    this.height -= this.bottom() - rect.bottom();
  }

  if (this.isEmpty()) {
    this.x = null;
    this.y = null;
    this.width = null;
    this.height = null;
  }

  return this;
};

/**
 * Checks if the rectangle overlaps the specified rectangle
 * 
 * @param {Rect} rect The rectangle to check overlapping for.
 * @returns {boolean} Returns true if two rectangles overlap each other.
 */
Rect.prototype.overlaps = function (rect) {
  var result = true;
  if (this.x + this.width < rect.x || rect.x + rect.width < this.x || this.y + this.height < rect.y || rect.y + rect.height < this.y) {
    result = false;
  }
  return result;
};

/**
 * Expands the rectangle boundaries to contain the specified rectangle.
 * 
 * @param {Rect} arg0 The rectangle to contain.
 * 
 * @param {number} arg0 The x coordinate of top left corner.
 * @param {number} arg1 The y coordinate of top left corner.
 * @param {number} [arg2=undefined] Width.
 * @param {number} [arg3=undefined] Height.
 * @returns {Rect} Returns reference to the current rectangle.
 */
Rect.prototype.addRect = function (arg0, arg1, arg2, arg3) {
  var right,
    bottom;
  switch (arguments.length) {
    case 1:
      if (!arg0.isEmpty()) {
        if (this.isEmpty()) {
          this.x = arg0.x;
          this.y = arg0.y;
          this.width = arg0.width;
          this.height = arg0.height;
        }
        else {
          right = Math.max(this.right(), arg0.right());
          bottom = Math.max(this.bottom(), arg0.bottom());

          this.x = Math.min(this.x, arg0.x);
          this.y = Math.min(this.y, arg0.y);
          this.width = right - this.x;
          this.height = bottom - this.y;
        }
      }
      break;
    case 2:
      if (this.isEmpty()) {
        this.x = arg0;
        this.y = arg1;
        this.width = 0;
        this.height = 0;
      }
      else {
        right = Math.max(this.right(), arg0);
        bottom = Math.max(this.bottom(), arg1);

        this.x = Math.min(this.x, arg0);
        this.y = Math.min(this.y, arg1);
        this.width = right - this.x;
        this.height = bottom - this.y;
      }
      break;
    case 4:
      if (this.isEmpty()) {
        this.x = arg0;
        this.y = arg1;
        this.width = arg2;
        this.height = arg3;
      }
      else {
        right = Math.max(this.right(), arg0 + arg2);
        bottom = Math.max(this.bottom(), arg1 + arg3);

        this.x = Math.min(this.x, arg0);
        this.y = Math.min(this.y, arg1);
        this.width = right - this.x;
        this.height = bottom - this.y;
      }
      break;
  }

  return this;
};

/**
 * Returns rectangle location and size in form of CSS style object.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {object} CSS style object
 */
Rect.prototype.getCSS = function (units) {
  units = (units !== undefined) ? units : "px";

  var result = {
    left: this.x + units,
    top: this.y + units,
    width: this.width + units,
    height: this.height + units
  };
  return result;
};

/**
 * Returns rectangle location and size in form of CSS style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */
Rect.prototype.toString = function (units) {
  var result = "";

  units = (units !== undefined) ? units : "px";

  result += "left:" + this.x + units + ";";
  result += "top:" + this.y + units + ";";
  result += "width:" + this.width + units + ";";
  result += "height:" + this.height + units + ";";

  return result;
};

/**
 * Validates rectangle properties
 * 
 * @returns {boolean} Returns true if rectangle properties are valid.
 */
Rect.prototype.validate = function () {
  if (isNaN(this.x) || isNaN(this.y) || isNaN(this.width) || isNaN(this.height)) {
    throw "Invalid rect position.";
  }
};

/**
 * Checks if rectangles are equal
 * 
 * @param {Rect} rect Rectangle
 * @returns {boolean} Returns true if rectangles are equal.
 */
Rect.prototype.equalTo = function (rect) {
  return this.x == rect.x && this.y == rect.y && this.width == rect.width && this.height == rect.height;
};

/**
 * Find intersection point between rectangle's perimeter and line connecting the given point and center of the rectangle
 * 
 * @param {Point} point Point to project
 * @returns {Point} Returns point or null if point is inside rectangle.
 */
Rect.prototype.getProjectionPoint = function (point) {
  var result = null;
  if(!this.contains(point)) {
    var vector = new Vector(this.centerPoint(), point);
    this.loopEdges(function(edge) {
      result = vector.getIntersectionPoint(edge, true, 1.0);
      return (result != null);
    });
  }
  return result;
};

/**
 * Vertical Interval
 * 
 * @returns {Interval} Returns vertical interval of the rectangle
 */
Rect.prototype.verticalInterval = function () {
  return new Interval( this.y, this.bottom() );
};

/**
 * @class Thickness
 * @classdesc Class describes the thickness of a frame around rectangle.
 * 
 * @param {number} left Left.
 * @param {number} top Top.
 * @param {number} right Right.
 * @param {number} bottom Bottom.
 */
function Thickness(arg0, arg1, arg2, arg3) {
  /**
   * The thickness for the left side of the rectangle.
   */
  this.left = 0;

  /**
   * The thickness for the upper side of the rectangle.
   */
  this.top = 0;

  /**
   * The thickness for the right side of the rectangle.
   */
  this.right = 0;

  /**
   * The thickness for the bottom side of the rectangle.
   */
  this.bottom = 0;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null && typeof arg0 == "object") {
        this.left = arg0.left;
        this.top = arg0.top;
        this.right = arg0.right;
        this.bottom = arg0.bottom;
      } else {
        this.left = arg0;
        this.top = arg0;
        this.right = arg0;
        this.bottom = arg0;
      }
      break;
    case 4:
      this.left = arg0;
      this.top = arg1;
      this.right = arg2;
      this.bottom = arg3;
      break;
  }
  return this;
}
/**
 * Checks object is empty
 * 
 * @returns {boolean} Returns true if object has no thickness defined for any of its sides
 */
Thickness.prototype.isEmpty = function () {
  return this.left === 0 && this.top === 0 && this.right === 0 && this.bottom === 0;
};

/**
 * Checks if at least one side is positive
 * 
 * @returns {boolean} Returns true if any of its sides is positive
 */
Thickness.prototype.isPositive = function () {
  return this.left > 0 || this.top > 0 || this.right > 0 || this.bottom > 0;
};

/**
 * Checks if at least one side is negative
 * 
 * @returns {boolean} Returns true if any of its sides is negative
 */
Thickness.prototype.isNegative = function () {
  return this.left < 0 || this.top < 0 || this.right < 0 || this.bottom < 0;
};

/**
 * Maximum thickness.
 * 
 * @param {Thickness} thickness The thickness to compare with.
 * @returns {Thickness} Returns reference to the current thickness object
 */
Thickness.prototype.maxThickness = function (thickness) {
  this.left = Math.max(this.left, thickness.left);
  this.top = Math.max(this.top, thickness.top);
  this.right = Math.max(this.right, thickness.right);
  this.bottom = Math.max(this.bottom, thickness.bottom);

  return this;
};

/**
 * Add thickness.
 * 
 * @param {Thickness} thickness The thickness to add.
 * @returns {Thickness} Returns reference to the current thickness object
 */
Thickness.prototype.addThickness = function (arg0, arg1, arg2, arg3) {
  switch (arguments.length) {
    case 1:
      if (arg0 !== null && typeof arg0 == "object") {
        this.left += arg0.left;
        this.top += arg0.top;
        this.right += arg0.right;
        this.bottom += arg0.bottom;
      } else {
        this.left += arg0;
        this.top += arg0;
        this.right += arg0;
        this.bottom += arg0;
      }
      break;
    case 4:
      this.left += arg0;
      this.top += arg1;
      this.right += arg2;
      this.bottom += arg3;
      break;
  }

  return this;
};

/**
 * Scales the thickness by the specified value
 * 
 * @param {number} scale
 * @returns {Thickness} Returns reference to the current size.
 */
Thickness.prototype.scale = function (scale) {
  this.left = this.left * scale;
  this.top = this.top * scale;
  this.right = this.right * scale;
  this.bottom = this.bottom * scale;
  return this;
};

/**
 * Returns thickness object in form of CSS style string. It is conversion to padding style string.
 * 
 * @param {string} [units="px"] The string name of units.
 * @returns {string} CSS style string.
 */
Thickness.prototype.toString = function (units) {
  units = (units !== undefined) ? units : "px";

  return this.top + units + " " + this.right + units + " " + this.bottom + units + " " + this.left + units;
};

/**
 * Callback for finding distance for a collection item
 *
 * @callback funcDistance
 * @param {Object} item A collection item
 * @param {number} index An index of the collection item
 * @returns {number} Returns a distance for the item 
 */

/**
* @typedef {Object} BinarySearchResult
* @property {number} index The index of the nearest item in the collection
* @property {Object} item The nearest item
*/

/**
 * Search sorted list of elements for the nearest item.
 *
 * @param {Object[]} items - The collection of elements.
 * @param {funcDistance} callback - A callback function to get distance for the collection item. 
 * @param {number} [startMinimum=undefined] - The minimum index in the array to start search from
 * @param {number} [startMaximum=undefined] - The maximum index in the array to start search from
 * @returns {BinarySearchResult} Returns an item of the collection, which is nearest to optimal measured by callback function
*/
function binarySearch(items, callback, startMinimum, startMaximum) {
  var result = null,
    distance,
    bestDistance,
    minimum = startMinimum || 0,
    maximum = startMaximum || (items.length - 1),
    middle,
    item;

  if (items.length > 0) {
    item = items[minimum];
    result = { index: minimum, item: item };
    distance = callback(item, minimum);
    if (distance > 0) {
      bestDistance = Math.abs(distance);

      item = items[maximum];
      distance = callback(item, maximum);
      if (distance >= 0) {
        result = { index: maximum, item: item };
      } else {
        distance = Math.abs(distance);
        if (bestDistance > distance) {
          bestDistance = distance;
          result = { index: maximum, item: item };
        }
        while (minimum + 1 < maximum) {
          middle = Math.round((minimum + maximum) / 2.0);
          item = items[middle];
          distance = callback(item, middle);
          if (distance === 0) {
            result = { index: middle, item: item };
            break;
          } else {
            if (distance > 0) {
              minimum = middle;
            } else {
              maximum = middle;
            }
            distance = Math.abs(distance);
            if (bestDistance > distance) {
              bestDistance = distance;
              result = { index: middle, item: item };
            }
          }
        }
      }
    }
  }
  return result;
}

/**
 * Creates self-balancing binary search tree structure.
 * @class SortedList
 * 
 * @returns {SortedList} Returns sorted list collection. 
 */
function SortedList() {
  var _rootNode = null;

  function Node(value, context) {
    this.value = value;
    this.context = context;

    this.left = null;
    this.right = null;

    this.balance = 0;
  }

  function _rebalance(node) {
    var balance;
    if (node.balance == 2) {
      var right = node.right;
      balance = right.balance;
      if (balance >= 0) {
        _rotateSmallLeft(right, node);
      } else {
        _rotateBigLeft(right, node);
      }
    } else if (node.balance == -2) {
      var left = node.left;
      balance = left.balance;
      if (balance <= 0) {
        _rotateSmallRight(node.left, node);
      } else {
        _rotateBigRight(node.left, node);
      }
    }
    return balance;
  }

  function _rotateSmallLeft(node, parent) {
    _rotateLeft(node, parent);

    if (node.balance == 1) {
      parent.balance = 0;
      node.balance = 0;
    } else {
      parent.balance = -1;
      node.balance = 1;
    }
  }

  function _rotateLeft(node, parent) {
    _swap(node, parent);
    parent.right = node.right;
    node.right = node.left;
    node.left = parent.left;
    parent.left = node;
  }

  function _rotateSmallRight(node, parent) {
    _rotateRight(node, parent);

    if (node.balance == -1) {
      parent.balance = 0;
      node.balance = 0;
    } else {
      parent.balance = 1;
      node.balance = -1;
    }
  }

  function _rotateRight(node, parent) {
    _swap(node, parent);
    parent.left = node.left;
    node.left = node.right;
    node.right = parent.right;
    parent.right = node;
  }

  function _rotateBigLeft(node, parent) {
    var bottom = node.left;
    _rotateRight(bottom, node);
    _rotateLeft(node, parent);

    parent.balance = 0;
    switch (bottom.balance) {
      case 1:
        node.balance = -1;
        bottom.balance = 0;
        break;
      case 0:
        bottom.balance = 0;
        node.balance = 0;
        break;
      default:
        bottom.balance = 1;
        node.balance = 0;
        break;
    }
  }

  function _rotateBigRight(node, parent) {
    var bottom = node.right;
    _rotateLeft(bottom, node);
    _rotateRight(node, parent);

    parent.balance = 0;
    switch (bottom.balance) {
      case -1:
        bottom.balance = 0;
        node.balance = 1;
        break;
      case 0:
        bottom.balance = 0;
        node.balance = 0;
        break;
      default:
        bottom.balance = -1;
        node.balance = 0;
        break;
    }
  }

  /**
   * Callback function to notify about duplicate values
   * 
   * @callback onSortedListDuplicateCallback
   * @param {object} context The context object of the duplicate value
   */

  /**
   * Adds value to sorted list collection
   * @param {number} value The value 
   * @param {object} context The value context object
   * @param {object} thisArg The callback function invocation context 
   * @param {onSortedListDuplicateCallback} onDuplicate Callback function for duplicates values notification
   */
  function add(value, context, thisArg, onDuplicate) {
    if (_rootNode == null) {
      _rootNode = new Node(value, context);
    } else {
      var trace = [];
      var node = null;
      var next = _rootNode;
      while (next != null) {
        if (node != null) {
          trace.push(node);
        }
        node = next;
        if (node.value == value) {
          if (onDuplicate != null) {
            onDuplicate.call(thisArg, node.context);
          } else {
            throw "Structure does not support duplicates.";
          }
        } else {
          if (node.value > value) {
            next = node.left;
          } else {
            next = node.right;
          }
        }
      }
      trace.push(node);
      var newNode = new Node(value, context);
      if (node.value > value) {
        node.left = newNode;
      } else {
        node.right = newNode;
      }
      node = newNode;

      while ((next = trace.pop()) != null) {
        if (node.value < next.value) {
          if (next.balance < 0) {
            next.balance -= 1;
            _rebalance(next);
            break;
          } else {
            if (next.balance > 0) {
              next.balance -= 1;
              break;
            }
            next.balance -= 1;
          }
        } else {
          if (next.balance > 0) {
            next.balance += 1;
            _rebalance(next);
            break;
          } else {
            if (next.balance < 0) {
              next.balance += 1;
              break;
            }
            next.balance += 1;
          }
        }
        node = next;
      }
    }
  }

  function _delete(node, parent) {
    var child = node.right != null ? node.right : node.left;
    if (parent != null) {
      if (parent.value > node.value) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    } else {
      _rootNode = child;
    }
  }

  function _swap(node1, node2) {
    var value = node1.value;
    node1.value = node2.value;
    node2.value = value;

    var context = node1.context;
    node1.context = node2.context;
    node2.context = context;
  }

  function _copy(fromNode, toNode) {
    toNode.value = fromNode.value;
    toNode.context = fromNode.context;
  }

  /**
   * Removes value from the sorted list
   * @param {number} value The removed value 
   */
  function remove(value) {
    var trace = [];
    var node = _rootNode;
    while (node != null) {
      if (node.value == value) {
        if (node.right != null && node.left != null) {
          trace.push(node);
          var next = node.right;
          while (next.left != null) {
            trace.push(next);
            next = next.left;
          }
          _copy(next, node);
          _delete(next, trace[trace.length - 1]);
          trace.push(next);
        } else {
          _delete(node, trace[trace.length - 1]);
          trace.push(node);
        }
        for (var index = trace.length - 2; index >= 0; index -= 1) {
          var parent = trace[index];
          node = trace[index + 1];
          if (parent.value > node.value) {
            if (parent.balance > 0) {
              parent.balance += 1;
              if (_rebalance(parent) === 0) {
                break;
              }
            } else {
              if (parent.balance === 0) {
                parent.balance += 1;
                break;
              }
              parent.balance += 1;
            }
          } else {
            if (parent.balance < 0) {
              parent.balance -= 1;
              if (_rebalance(parent) === 0) {
                break;
              }
            } else {
              if (parent.balance === 0) {
                parent.balance -= 1;
                break;
              }
              parent.balance -= 1;
            }
          }
        }
        break;
      } else {
        trace.push(node);
        if (node.value > value) {
          node = node.left;
        } else {
          node = node.right;
        }
      }
    }
  }

  /**
   * Returns context object of the next value following the given one
   * @param {number} fromValue The value to start search from
   * @returns {object} Returns context object of the first value in sorted list greater than the start value.
   */
  function nextContext(fromValue) {
    var result = null;
    loopForward(this, fromValue, function (value, context) {
      result = context;
      return true;
    });
    return result;
  }

  /**
   * Callback function for iterating values of the sorted list
   * 
   * @callback onSortedListItemCallback
   * @param {number} value The value
   * @param {object} context The value context object
   * @returns {boolean} Returns true to break loop operation  
   */

  /**
   * Loops sorted list values
   * @param {object} thisArg The callback function invocation context 
   * @param {number} fromValue The start value to loop items of sorted list
   * @param {onSortedListItemCallback} onItem Callback function to iterate over sorted list values
   */
  function loopForward(thisArg, fromValue, onItem) { //function onItem(value, context)
    if (onItem != null) {
      var trace = [];
      var node = null;
      var next = _rootNode;
      while (next != null) {
        node = next;
        if (node.value >= fromValue || fromValue == null) {
          trace.push(node);
          next = node.left;
        } else {
          next = node.right;
        }
      }
      while ((node = trace.pop()) != null) {
        if (onItem.call(thisArg, node.value, node.context)) {
          return;
        }
        next = node.right;
        while (next != null) {
          node = next;
          if (node.left != null) {
            trace.push(node);
            next = node.left;
          } else {
            if (onItem.call(thisArg, node.value, node.context)) {
              return;
            }
            next = node.right;
          }
        }
      }
    }
  }

  /**
   * Returns context object of the previous value preceding the given one
   * @param {number} fromValue The value to start search from
   * @returns {object} Returns context object of the first value in sorted list less than the start value.
   */
  function previousContext(fromValue) {
    var result = null;
    loopBackward(this, fromValue, function (nextValue, context) {
      result = context;
      return true;
    });
    return result;
  }

  /**
   * Loops sorted list values backward
   * @param {object} thisArg The callback function invocation context 
   * @param {number} fromValue The start value to loop items of sorted list
   * @param {onSortedListItemCallback} onItem Callback function to iterate over sorted list values
   */
  function loopBackward(thisArg, fromValue, onItem) {
    if (onItem != null) {
      var trace = [];
      var node = null;
      var next = _rootNode;
      while (next != null) {
        node = next;
        if (node.value <= fromValue || fromValue == null) {
          trace.push(node);
          next = node.right;
        } else {
          next = node.left;
        }
      }
      while ((node = trace.pop()) != null) {
        if (onItem.call(thisArg, node.value, node.context)) {
          return;
        }
        next = node.left;
        while (next != null) {
          node = next;
          if (node.right != null) {
            trace.push(node);
            next = node.right;
          } else {
            if (onItem.call(thisArg, node.value, node.context)) {
              return;
            }
            next = node.left;
          }
        }
      }
    }
  }

  function _getValidationDepth(node) {
    var level = [],
      result = 0;
    if (node != null) {
      level.push(node);
      while (level.length > 0) {
        var newLevel = [];

        for (var index = 0; index < level.length; index += 1) {
          node = level[index];

          if (node.left != null) {
            newLevel.push(node.left);
          }

          if (node.right != null) {
            newLevel.push(node.right);
          }
        }

        level = newLevel;
        result += 1;
      }
    }
    return result;
  }

  /**
   * Validate internal data consistency of the self-balancing binary search tree structure
   * 
   * @returns {boolean} Returns true if structure pass validation
   */
  function validate() {
    if (_rootNode != null) {
      var level = [_rootNode];
      while (level.length > 0) {
        var newLevel = [];

        for (var index = 0; index < level.length; index += 1) {
          var node = level[index];

          if (node.value == null) {
            return false;
          }

          if (node.left != null) {
            newLevel.push(node.left);
            if (node.left.value >= node.value) {
              return false;
            }
          }

          if (node.right != null) {
            newLevel.push(node.right);
            if (node.right.value <= node.value) {
              return false;
            }
          }

          if (node.balance != (_getValidationDepth(node.right) - _getValidationDepth(node.left))) {
            // eslint-disable-next-line no-console
            console.log("Disbalanced node: " + node.value + " - " + JSON.stringify(_rootNode));
            return false;
          }
        }

        level = newLevel;
      }
    }
    return true;
  }

  return {
    add: add,
    remove: remove,
    loopForward: loopForward,
    loopBackward: loopBackward,
    nextContext: nextContext,
    previousContext: previousContext,
    validate: validate
  };
}

/**
 * Callback function to iterate over pairs of crossing rectangles
 * 
 * @callback onCrossingRectanglesItemCallback
 * @param {Rect} rect1 First rectangle
 * @param {Rect} rect2 Second rectangle
 */

/**
 * Finds pairs of crossing rectangles.
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {Rect[]} rectangles Collection of rectangles.
 * @param {onCrossingRectanglesItemCallback} onCrossing Callback function to pass pair of crossing rectangles.
 */
function getCrossingRectangles(thisArg, rectangles, onCrossing) {
  function Action(isStart, index, x, rect) {
    this.isStart = isStart;
    this.index = index;
    this.x = x;
    this.rect = rect;
  }

  function Level() {
    this.count = 0;
    this.rectangles = {};

    this.add = function (index) {
      this.count += 1;
      this.rectangles[index] = true;
    };

    this.remove = function (index) {
      this.count -= 1;
      delete this.rectangles[index];
      return this.count == 0;
    };
  }

  function _findCrossedRectangles(buffer, from, to, rectIndex, rect) {
    buffer.loopForward(this, from, function (value, level) {
      if (value > to) {
        return true;
      }
      for (var index in level.rectangles) {
        if (level.rectangles.hasOwnProperty(index)) {
          var key = rectIndex > index ? rectIndex + "-" + index : index + "-" + rectIndex;
          if (!processed.hasOwnProperty(key)) {
            processed[key] = true;
            onCrossing.call(thisArg, rect, rectangles[index]);
          }
        }
      }
    });
  }

  if (onCrossing != null) {

    // Create action items out of rectangles
    var actions = [];
    for (var index = 0; index < rectangles.length; index += 1) {
      var rect = rectangles[index];

      actions.push(new Action(1, index, rect.x, rect));
      actions.push(new Action(0, index, rect.right(), rect));
    }

    actions.sort(function (a, b) {
      if (a.x == b.x) {
        return b.isStart - a.isStart;
      }
      return a.x - b.x;
    });

    /* find intersections */
    var buffer = SortedList();
    var levels = {};
    var processed = {};

    for (index = 0; index < actions.length; index += 1) {
      var action = actions[index];
      var actionLevels = [action.rect.y, action.rect.bottom()];

      if (action.isStart == 1) {
        // Search for intersections of the left side of the rectangle with existing horizontal segments
        _findCrossedRectangles(buffer, actionLevels[0], actionLevels[1], action.index, action.rect);

        // add rectangle's horizontal segments
        for (var index2 = 0, len2 = actionLevels.length; index2 < len2; index2 += 1) {
          var value = actionLevels[index2];
          var level = levels[value];
          if (level == null) {
            level = new Level();
            levels[value] = level;

            buffer.add(value, level);
          }
          level.add(action.index);
        }
      } else {
        // remove rectangle's horizontal segments
        for (index2 = 0, len2 = actionLevels.length; index2 < len2; index2 += 1) {
          value = actionLevels[index2];
          level = levels[value];
          if (level.remove(action.index)) {
            delete levels[value];
            buffer.remove(value);
          }
        }

        // Search for intersections of the right side of rectangle with existing horizontal segments
        _findCrossedRectangles(buffer, actionLevels[0], actionLevels[1], action.index, action.rect);
      }
    }
  }
}

/**
 * Graph edge structure
 * @class Edge
 * @property {string} from From node id
 * @property {string} to To node id
 */
function Edge(from, to) {
  this.from = from;
  this.to = to;
}

/**
 * This function finds [optimal collection of feedback edges](https://en.wikipedia.org/wiki/Feedback_arc_set) needed to be cut in 
 * order to eliminate loops in family structure.
 * 
 * @param {Family} family Family structure
 * @returns {Edge[]} Returns optimal collection of feedback loops 
 */
function getFamilyLoops(family, debug) {
  var loops = [], loop,
    index, len,
    index2, len2,
    fromNode, toNode, edge;

  var tempFamily = family.clone();

  family.loopTopo(this, function (itemid) {
    tempFamily.removeNode(itemid);
  });
  family.loopTopoReversed(this, function (itemid) {
    tempFamily.removeNode(itemid);
  });
  var cleanFamily = tempFamily.clone();

  cleanFamily.loop(this, function (itemid) {
    if (tempFamily.node(itemid) != null) {
      tempFamily.loopParents(this, itemid, function (parentid) {
        loops.push(new Edge(parentid, itemid));
        tempFamily.removeChildRelation(parentid, itemid);
        return tempFamily.SKIP;
      });
      var itemsToRemove = [];
      tempFamily.loopTopo(this, function (itemid) {
        itemsToRemove.push(itemid);
      });
      tempFamily.loopTopoReversed(this, function (itemid) {
        itemsToRemove.push(itemid);
      });
      for (var index = 0; index < itemsToRemove.length; index += 1) {
        tempFamily.removeNode(itemsToRemove[index]);
      }
    }
  });

  /* Invert loops */
  for (index = 0, len = loops.length; index < len; index += 1) {
    loop = loops[index];
    if (!cleanFamily.removeChildRelation(loop.from, loop.to)) {
      throw "Relation does not exists";
    }
  }

  if (debug && cleanFamily.hasLoops()) {
    throw "Failed to clean loops in family";
  }

  var graph = cleanFamily.getGraph(this, function (from, to) {
    return { from: from, to: to, capacity: 1, flow: 0 };
  });

  var from = "__1000__";
  var to = "__2000__";
  var defaultMinimalFlow = loops.length;
  for (index = 0, len = loops.length; index < len; index += 1) {
    loop = loops[index];
    edge = graph.edge(loop.from, to);
    if (edge == null) {
      graph.addEdge(loop.from, to, { from: loop.from, to: to, capacity: 1, flow: 0, tos: [loop.to] });
    } else {
      edge.capacity += 1;
      edge.tos.push(loop.to);
    }
    edge = graph.edge(from, loop.to);
    if (edge == null) {
      graph.addEdge(from, loop.to, { from: from, to: loop.to, capacity: 1, flow: 0, froms: [loop.from] });
    } else {
      edge.capacity += 1;
      edge.froms.push(loop.from);
    }
  }

  var totalFlow = 0;
  var levelGraph = null;
  while (true) {
    levelGraph = graph.getLevelGraph(this, from, function (fromNode, toNode, edge) {
      if (fromNode == edge.from) {
        return edge.capacity > edge.flow;
      } else {
        return edge.flow > 0;
      }
    });

    if (!levelGraph.hasNode(to)) {
      break;
    }

    while (true) {
      var connectionPath = graph.dfsPath(this, from, to, function (fromNode, toNode, edge) {
        if (fromNode == edge.from) {
          return edge.capacity > edge.flow;
        } else {
          return edge.flow > 0;
        }
      });

      if (connectionPath.length == 0) {
        break;
      }

      // Find maximum flow for given path
      var flow = Infinity;
      for (index = 0, len = connectionPath.length; index < len - 1; index += 1) {
        fromNode = connectionPath[index];
        toNode = connectionPath[index + 1];
        edge = graph.edge(fromNode, toNode);
        var edgeFlow = 0;
        if (edge.from == fromNode) {
          edgeFlow = edge.capacity - edge.flow;
        } else {
          edgeFlow = edge.flow;
        }
        if (edgeFlow == 0) {
          throw "Broken flow path";
        }
        flow = Math.min(flow, edgeFlow);
      }

      // Update graph
      for (index = 0, len = connectionPath.length; index < len - 1; index += 1) {
        fromNode = connectionPath[index];
        toNode = connectionPath[index + 1];
        edge = graph.edge(fromNode, toNode);
        if (edge.from == fromNode) {
          edge.flow += flow;
        } else {
          edge.flow -= flow;
        }
      }
      totalFlow += flow;
    }
  }

  if (totalFlow < defaultMinimalFlow) {
    var residueGraph = graph.getLevelGraph(this, from, function (fromNode, toNode, edge) {
      if (fromNode == edge.from) {
        return edge.capacity > edge.flow;
      }
      return false;
    });

    // graph.loopNodes(this, from, function (nodeid) {
    //   console.log("Nodeid: " + nodeid);
    //   graph.loopNodeEdges(this, nodeid, function (neighbour, edge) {
    //     if (edge.to == neighbour) {
    //       console.log("neighbour: " + neighbour + ", edge=" + JSON.stringify(edge));
    //     }
    //   })
    // });

    // var resedueNodes = [];
    // residueGraph.loopNodes(this, from, function (nodeid) {
    //   resedueNodes.push(nodeid);
    // });
    // console.log("Residue graph: " + resedueNodes.join(", "));

    var edgesToBreak = [];
    residueGraph.loopNodes(this, from, function (nodeid) {
      graph.loopNodeEdges(this, nodeid, function (toNode, edge) {
        if (edge.to == toNode) {
          if (!residueGraph.hasNode(toNode)) {
            // console.log("Edge to test: from: " + nodeid + ", to " + toNode);
            var isIsolated = false;
            graph.dfsLoop(this, toNode, function (fromNode, toNode2, edge) {
              if (edge.from == fromNode && !residueGraph.hasNode(fromNode)) {
                return true;
              }
              return false;
            }, function (foundid) {
              if (foundid == to) {
                // console.log("Isolated: " + toNode + ", may access exit node" + foundid);
                isIsolated = true;
                return true;
              }
              return false;
            });
            if (isIsolated) {
              edgesToBreak.push(new Edge(nodeid, toNode));
            }
          }
        }
      });
    });

    // collect loops to break
    var optimizedLoops = [];
    var validatedFlow = 0;
    for (index = 0, len = edgesToBreak.length; index < len; index += 1) {
      var edgeToBreak = edgesToBreak[index];

      if (edgeToBreak.from == from) {
        edge = graph.edge(edgeToBreak.from, edgeToBreak.to);
        for (index2 = 0, len2 = edge.froms.length; index2 < len2; index2 += 1) {
          optimizedLoops.push(new Edge(edge.froms[index2], edgeToBreak.to));
          validatedFlow += 1;
        }
      } else if (edgeToBreak.to == to) {
        edge = graph.edge(edgeToBreak.from, edgeToBreak.to);
        for (index2 = 0, len2 = edge.tos.length; index2 < len2; index2 += 1) {
          optimizedLoops.push(new Edge(edgeToBreak.from, edge.tos[index2]));
          validatedFlow += 1;
        }
      } else {
        optimizedLoops.push(edgeToBreak);
        validatedFlow += 1;
      }
    }
    if (validatedFlow == totalFlow) {
      loops = optimizedLoops;
    }
  }
  return loops;
}

function getFamilyUnits(family) {
  var familyUnits = [],
    familyUnitByParent = {},
    index,
    len;

  function FamilySiblings() {
    this.fromIndex = 0;
    this.toIndex = 0;
    this.items = [];
    this.hash = {};
  }

  function FamilyUnit(id) {
    this.id = id;
    this.parents = new FamilySiblings();
    this.children = new FamilySiblings();

    this.loopSiblings = function (thisArg, itemid, onItem) {
      this._loop(thisArg, this.parents.hash.hasOwnProperty(itemid) ? this.parents.items : this.children.items, onItem);
    };

    this.loopNonSiblings = function (thisArg, itemid, onItem) {
      this._loop(thisArg, !this.parents.hash.hasOwnProperty(itemid) ? this.parents.items : this.children.items, onItem);
    };

    this.loop = function (thisArg, onItem) {
      this._loop(thisArg, this.parents.items, onItem);
      this._loop(thisArg, this.children.items, onItem);
    };

    this._loop = function (thisArg, items, onItem) {
      if (onItem != null) {
        for (var index = 0, len = items.length; index < len; index += 1) {
          var sibling = items[index];
          onItem.call(thisArg, sibling);
        }
      }
    };

    this.addParent = function (itemid) {
      this._add(itemid, this.parents);
    };

    this.addChild = function (itemid) {
      this._add(itemid, this.children);
    };

    this._add = function (itemid, siblings) {
      if (!siblings.hash.hasOwnProperty(itemid)) {
        siblings.items.push(itemid);
        siblings.hash[itemid] = true;
      }
    };
  }

  index = 0;
  family.loop(this, function (itemid, item) {
    var childrenCount = family.countChildren(itemid);
    if (childrenCount > 0) {
      if (!familyUnitByParent.hasOwnProperty(itemid)) {
        var familyUnit = new FamilyUnit(index);
        index += 1;
        familyUnit.addParent(itemid);
        family.loopChildren(this, itemid, function (childid, child) {
          familyUnit.addChild(childid);
          if (childrenCount == 1) {
            family.loopParents(this, childid, function (parentid) {
              familyUnit.addParent(parentid);
              familyUnitByParent[parentid] = familyUnit;
              return family.SKIP;
            });
          }
          return family.SKIP;
        });
        familyUnits.push(familyUnit);
        familyUnitByParent[itemid] = familyUnit;
      }
    }
  });

  var familyUnitByItemId = {};
  for (index = 0, len = familyUnits.length; index < len; index += 1) {
    var familyUnit = familyUnits[index];
    familyUnit.loop(this, function (itemid) {
      if (!familyUnitByItemId.hasOwnProperty(itemid)) {
        familyUnitByItemId[itemid] = [familyUnit];
      } else {
        familyUnitByItemId[itemid].push(familyUnit);
      }
    });
  }

  return familyUnitByItemId;
}

/**
 * Breaks collection of values into 3 intervals, so values stay close to each other within interval.
 * 
 * @param {number[]} values Array of values
 * @returns {number[]} Returns array containing 3 indexes. The first 2 break values into 3 intervals, 
 * the last index is actual index of the last element in the values collection. 
 */
function getLiniarBreaks(values) {
  var _leftTotal = [],
    _len = values.length;

  // Sum up values from left to right
  var total = 0;
  for (var index = 0; index < _len; index += 1) {
    total += values[index];
    _leftTotal[index] = total;
  }

  function getLinearDeviation(leftIndex, rightIndex) {
    var result = 0;

    var avg = (_leftTotal[rightIndex] - _leftTotal[leftIndex] + values[leftIndex]) / (rightIndex - leftIndex + 1);

    var median = binarySearch(values, function (item) {
      return avg - item;
    }, leftIndex, rightIndex);

    if (median.item <= avg) {
      result += (avg * (median.index + 1 - leftIndex) - (_leftTotal[median.index] - _leftTotal[leftIndex] + values[leftIndex]));
      result += (_leftTotal[rightIndex] - _leftTotal[median.index] - avg * (rightIndex - median.index));
    } else {
      result += (avg * (median.index - leftIndex) - (_leftTotal[median.index] - _leftTotal[leftIndex] - values[median.index] + values[leftIndex]));
      result += (_leftTotal[rightIndex] - _leftTotal[median.index] + values[median.index] - avg * (rightIndex - median.index + 1));
    }

    return result;
  }

  function getScore(leftIndex, rightIndex) {
    var score = 0;

    score += getLinearDeviation(0, leftIndex);
    if (rightIndex > leftIndex + 1) {
      score += getLinearDeviation(leftIndex + 1, rightIndex - 1);
    }
    score += getLinearDeviation(rightIndex, _len - 1);

    return score;
  }

  var leftIndex = 0,
    rightIndex = _len - 1;

  var score = getScore(leftIndex, rightIndex);

  while (leftIndex < rightIndex + 1) {
    var leftScore = getScore(leftIndex + 1, rightIndex);
    var rightScore = getScore(leftIndex, rightIndex - 1);

    if (leftScore < rightScore) {
      if (leftScore >= score) {
        break;
      }
      leftIndex += 1;
      score = leftScore;
    } else {
      if (rightScore >= score) {
        break;
      }
      rightIndex -= 1;
      score = rightScore;
    }
  }

  return [leftIndex, rightIndex - 1, _len - 1];
}

/**
 * Creates linked hash list collection.
 * @class LinkedHashItems
 * 
 * @returns {LinkedHashItems} Returns linked hash list structure
 */
function LinkedHashItems() {
  var segmentsHash = {},
    nextKeys = {},
    prevKeys = {},
    startSegmentKey = null,
    endSegmentKey = null;

  /**
   * Adds new item to collection
   * @param {string} key The new item key 
   * @param {object} item The new item context object value
   */
  function add(key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }
    segmentsHash[key] = item;
    nextKeys[key] = null;
    if (endSegmentKey == null) {
      startSegmentKey = key;
      prevKeys[key] = null;
    } else {
      nextKeys[endSegmentKey] = key;
      prevKeys[key] = endSegmentKey;
    }
    endSegmentKey = key;
  }

  /**
   * Checks if collection is empty
   * 
   * @returns {boolean} Returns true if collection is empty
   */
  function isEmpty() {
    return startSegmentKey == null;
  }

  /**
   * Item context object
   * 
   * @param {string} key The item's key
   * @returns {object} Returns context object
   */
  function item(key) {
    return segmentsHash[key];
  }

  /**
   * Gets next key
   * 
   * @param {string} key The item key
   * @returns {string} Returns key of the next collection item
   */
  function nextKey(key) {
    return nextKeys[key];
  }

  /**
   * Gets previous key
   * 
   * @param {string} key The item key
   * @returns {string} Returns key of the previous collection item
   */
  function prevKey(key) {
    return prevKeys[key];
  }

  /**
   * First collection item key
   * 
   * @returns {string} Returns the key of the first item in the collection
   */
  function startKey() {
    return startSegmentKey;
  }

  /**
   * Last collection item key
   * 
   * @returns {string} Returns key of the last item in the collection
   */
  function endKey() {
    return endSegmentKey;
  }

  /**
  * Adds new item to the head of the list
  * 
  * @param {string} key The new item key 
  * @param {object} item The new item context object value
  * @returns {string} Returns key of the last item in the collection
  */
  function unshift(key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }
    segmentsHash[key] = item;
    prevKeys[key] = null;
    if (startSegmentKey == null) {
      endSegmentKey = key;
      nextKeys[key] = null;
    } else {
      prevKeys[startSegmentKey] = key;
      nextKeys[key] = startSegmentKey;
    }
    startSegmentKey = key;
  }

  /**
  * Inserts new item into the list after the given key 
  *  
  * @param {string} afterKey The key that the new element is placed after 
  * @param {string} key The new item key 
  * @param {object} item The new item context object value
  */
  function insertAfter(afterKey, key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }

    if (afterKey == null) {
      unshift(key, item);
    } else {
      var nextKey = nextKeys[afterKey];
      if (nextKey == null) {
        add(key, item);
      } else {
        segmentsHash[key] = item;
        nextKeys[afterKey] = key;
        nextKeys[key] = nextKey;
        prevKeys[nextKey] = key;
        prevKeys[key] = afterKey;
      }
    }
  }

  /**
   * Inserts new item into the list before the given key  
   * 
   * @param {string} beforeKey The key that the new element is placed before 
   * @param {string} key The new item key 
   * @param {object} item The new item context object value
   */
  function insertBefore(beforeKey, key, item) {
    if (segmentsHash.hasOwnProperty(key)) {
      throw "Duplicate segments are not supported!";
    }
    if (beforeKey == null || !segmentsHash.hasOwnProperty(beforeKey)) {
      throw "Before key should be defined!";
    }
    var prevKey = prevKeys[beforeKey];
    if (prevKey == null) {
      unshift(key, item);
    } else {
      insertAfter(prevKey, key, item);
    }
  }

  /**
   * Removes item
   * @param {string} key The key of the item 
   */
  function remove(key) {
    var prevKey = prevKeys[key],
      nextKey = nextKeys[key];

    if (prevKey != null) {
      nextKeys[prevKey] = nextKey;
    } else {
      startSegmentKey = nextKey;
    }

    if (nextKey != null) {
      prevKeys[nextKey] = prevKey;
    } else {
      endSegmentKey = prevKey;
    }

    delete segmentsHash[key];
    delete nextKeys[key];
    delete prevKeys[key];
  }

  /**
   * Empties collection
   */
  function empty() {
    segmentsHash = {};
    nextKeys = {};
    prevKeys = {};
    startSegmentKey = null;
    endSegmentKey = null;
  }

  function _iterate(forward, onItem, startKey, endKey) {
    var key = startKey,
      segment;

    if (key == null) {
      key = forward ? startSegmentKey : endSegmentKey;
    }

    if (onItem != null) {
      while (key != null) {
        segment = segmentsHash[key];
        if (segment != null) {
          if (onItem(segment, key)) {
            return;
          }
        }

        if (key == endKey) {
          key = null;
        } else {
          key = forward ? nextKeys[key] : prevKeys[key];
        }
      }
    }
  }

  /**
   * Appends one list to another
   * 
   * @param {LinkedHashItems} list A list to append to the end of the current list  
   */
  function attach(list) {
    list.iterate(function (segment, key) {
      add(key, segment);
    });
  }

  /**
   * Callback function for iterating list items
   * 
   * @callback onLinkedHashItemsCallback
   * @param {object} item  The item context object
   * @param {string} key The item key
   * @returns {boolean} Returns true to break the iteration process
   */

  /**
   * Loops items of the collection
   * @param {onLinkedHashItemsCallback} onItem  Callback function for iterating collection items
   * @param {string} startKey The key to start iteration from 
   * @param {string} endKey The key to end iteration at
   */
  function iterate(onItem, startKey, endKey) {
    _iterate(true, onItem, startKey, endKey);
  }

  /**
   * Loops items of the collection backward
   * @param {onLinkedHashItemsCallback} onItem  Callback function for iterating collection items
   * @param {string} startKey The key to start iteration from 
   * @param {string} endKey The key to end iteration at
   */
  function iterateBack(onItem, startKey, endKey) {
    _iterate(false, onItem, startKey, endKey);
  }

  /**
   * Validates internal data consistency of the structure
   * @returns {boolean} Returns true if it pass validation
   */
  function validate(info) {
    var key, prevKey, nextKey;
    for (key in segmentsHash) {
      if (segmentsHash.hasOwnProperty(key)) {
        if (!nextKeys.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
          if (info != null) {
            info.message = "Orphant key found!";
          }
          return false;
        }
      }
    }
    if (!segmentsHash.hasOwnProperty(startSegmentKey) || !segmentsHash.hasOwnProperty(endSegmentKey)) {
      if (info != null) {
        info.message = "Start or end values are missing!";
      }
      return false;
    }
    for (key in nextKeys) {
      if (nextKeys.hasOwnProperty(key)) {
        if (!segmentsHash.hasOwnProperty(key) || !prevKeys.hasOwnProperty(key)) {
          if (info != null) {
            info.message = "Orphant key found!";
          }
          return false;
        }
        nextKey = nextKeys[key];
        if (nextKey && !nextKeys.hasOwnProperty(nextKey)) {
          if (info != null) {
            info.message = "Next key not found!";
          }
          return false;
        }
      }
    }
    for (key in prevKeys) {
      if (prevKeys.hasOwnProperty(key)) {
        if (!segmentsHash.hasOwnProperty(key) || !nextKeys.hasOwnProperty(key)) {
          if (info != null) {
            info.message = "Orphant key found!";
          }
          return false;
        }
        prevKey = prevKeys[key];
        if (prevKey && !prevKeys.hasOwnProperty(prevKey)) {
          if (info != null) {
            info.message = "Prev key not found!";
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Returns a regular javascript array of collection items
   * 
   * @returns {object[]} Returns array containing items of the collection
   */
  function toArray() {
    var result = [];

    iterate(function (item) {
      result.push(item);
    });

    return result;
  }

  return {
    add: add,
    item: item,
    nextKey: nextKey,
    prevKey: prevKey,
    startKey: startKey,
    endKey: endKey,
    unshift: unshift,
    insertAfter: insertAfter,
    insertBefore: insertBefore,
    remove: remove,
    isEmpty: isEmpty,
    attach: attach,

    iterate: iterate,
    iterateBack: iterateBack,
    empty: empty,
    toArray: toArray,
    validate: validate
  };
}

/**
 * Callback function to iterate over result shapes
 * 
 * @callback onMergedRectangleItemCallback
 * @param {Point[]} points Collection of points tracing margin around result area formed via merge of rectangles.
 * The outer shape margin has clock wise sequence of data points. Internal holes inside of the shape are formed by counter clock wise 
 * sequence of data points.
 */

/**
 * Merges collection of rectangles into shapes. Calls callback function to pass result sequences of data points.
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {Rect[]} items Collection of rectangles.
 * @param {onMergedRectangleItemCallback} onItem Callback function to pass result sequences of margin data points.
 */
function getMergedRectangles(thisArg, items, onItem) {
  var index, len,
    index2, len2,
    point;

  items.sort(function (a, b) {
    if (a.x == b.x) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });

  var points = [];
  var pointsHash = {};

  for (index = 0, len = items.length; index < len; index += 1) {
    var item = items[index];
    var xs = [item.x, item.right()];
    for (var k = 0; k < xs.length; k += 1) {
      var x = xs[k];
      point = pointsHash[x];
      if (point == null) {
        point = {
          x: x,
          add: [],
          remove: []
        };
        pointsHash[x] = point;
        points.push(point);
      }
      if (x == item.x) {
        point.add.push(index);
      } else {
        point.remove.push(index);
      }
    }
  }

  points.sort(function (a, b) {
    return a.x - b.x;
  });

  function Range(start, end) {
    this.start = start;
    this.startHead = null;

    this.end = end;
    this.endHead = null;

    this.overlap = function (range) {
      return !(this.end < range.start || this.start > range.end);
    };
  }

  function Stripe(x, ranges) {
    this.x = x;
    this.ranges = ranges;
  }

  var active = {};
  var stripes = [];
  stripes.push(new Stripe(null, []));

  for (index = 0, len = points.length; index < len; index += 1) {
    point = points[index];

    for (index2 = 0, len2 = point.add.length; index2 < len2; index2 += 1) {
      active[point.add[index2]] = true;
    }
    for (index2 = 0, len2 = point.remove.length; index2 < len2; index2 += 1) {
      delete active[point.remove[index2]];
    }

    var activeRects = [];
    for (var key in active) {
      if (active.hasOwnProperty(key)) {
        activeRects.push(items[key]);
      }
    }

    activeRects.sort(function (a, b) {
      return a.y - b.y;
    });

    var ranges = [];

    var start = null;
    var end = null;

    for (index2 = 0, len2 = activeRects.length; index2 < len2; index2 += 1) {
      var activeRect = activeRects[index2];

      if (start == null) {
        start = activeRect.y;
        end = activeRect.bottom();
      } else {
        if (end < activeRect.y) {
          ranges.push(new Range(start, end));
          start = activeRect.y;
          end = activeRect.bottom();
        } else {
          end = Math.max(end, activeRect.bottom());
        }
      }
    }
    if (start != null) {
      ranges.push(new Range(start, end));
    }

    stripes.push(new Stripe(point.x, ranges));
  }

  var lists = [];
  var heads = {};
  var counter = 1;

  function Head(isHead, list) {
    this.isHead = isHead;
    this.list = list;

    if (!heads.hasOwnProperty(list)) {
      heads[list] = [];
    }
    heads[list].push(this);

    this.add = function (segment) {
      if (!segment.from.equalTo(segment.to)) {
        if (this.isHead) {
          lists[this.list].add(counter, segment);
          counter += 1;
        } else {
          lists[this.list].unshift(counter, segment);
          counter += 1;
        }
      }
    };

    this.getTail = function () {
      return new Head(!this.isHead, this.list);
    };

    this.attach = function (head) {
      if (this.list != head.list) {
        lists[this.list].attach(lists[head.list]);

        var refs = heads[head.list];
        delete heads[head.list];
        if (refs != null) {
          for (var index = 0, len = refs.length; index < len; index += 1) {
            var ref = refs[index];
            if (ref != head) {
              ref.list = this.list;
              heads[this.list].push(ref);
            }
          }
        }
      }
    };
  }

  function createHead(isHead) {
    lists.push(new LinkedHashItems());
    return new Head(isHead, lists.length - 1);
  }

  for (index = 1, len = stripes.length; index < len; index += 1) {
    var prev = stripes[index - 1];
    var curr = stripes[index];

    var pi = 0, ci = 0;
    while (pi < prev.ranges.length || ci < curr.ranges.length) {
      var pr = pi < prev.ranges.length ? prev.ranges[pi] : null;
      var cr = ci < curr.ranges.length ? curr.ranges[ci] : null;

      if (cr == null) {
        // close pr
        points = [
          new Point(prev.x, pr.end),
          new Point(curr.x, pr.end),
          new Point(curr.x, pr.start),
          new Point(prev.x, pr.start)
        ];
        for (var pindex = 1; pindex < points.length; pindex += 1) {
          pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
        }
        pr.endHead.attach(pr.startHead);
        pi += 1;
        continue;
      }

      if (pr == null) {
        // open cr
        cr.endHead = createHead(true);
        cr.endHead.add(new Vector(new Point(curr.x, cr.start), new Point(curr.x, cr.end)));
        cr.startHead = cr.endHead.getTail();
        ci += 1;
        continue;
      }

      if (!cr.overlap(pr)) {
        if (pr.start < cr.start) {
          // close pr
          points = [
            new Point(prev.x, pr.end),
            new Point(curr.x, pr.end),
            new Point(curr.x, pr.start),
            new Point(prev.x, pr.start)
          ];
          for (pindex = 1; pindex < points.length; pindex += 1) {
            pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
          }
          pr.endHead.attach(pr.startHead);
          pi += 1;
          continue;
        } else {
          // open cr
          cr.endHead = createHead(true);
          cr.endHead.add(new Vector(new Point(curr.x, cr.start), new Point(curr.x, cr.end)));
          cr.startHead = cr.endHead.getTail();
          ci += 1;
          continue;
        }
      } else {
        // ovelaps
        // extend pr.start to cr.start
        points = [
          new Point(prev.x, pr.start),
          new Point(curr.x, pr.start),
          new Point(curr.x, cr.start)
        ];
        for (pindex = 1; pindex < points.length; pindex += 1) {
          pr.startHead.add(new Vector(points[pindex], points[pindex - 1]));
        }
        cr.startHead = pr.startHead;

        var loop = true;
        while (loop) {
          loop = false;

          if (pr.end > cr.end) {
            var nextcr = (ci + 1) < curr.ranges.length ? curr.ranges[ci + 1] : null;
            if (nextcr != null && nextcr.overlap(pr)) {
              // open loop cr.end to nextcr.start
              var p1 = new Point(curr.x, nextcr.start);
              var p2 = new Point(curr.x, cr.end);
              cr.endHead = createHead(true);
              cr.endHead.add(new Vector(p1, p2));
              nextcr.startHead = cr.endHead.getTail();

              ci += 1;
              cr = nextcr;
              loop = true;
            }
          } else {
            var nextpr = (pi + 1) < prev.ranges.length ? prev.ranges[pi + 1] : null;
            if (nextpr != null && nextpr.overlap(cr)) {
              // close loop pr.end to nextpr.start
              points = [
                new Point(prev.x, pr.end),
                new Point(curr.x, pr.end),
                new Point(curr.x, nextpr.start),
                new Point(prev.x, nextpr.start)
              ];
              for (pindex = 1; pindex < points.length; pindex += 1) {
                pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
              }
              pr.endHead.attach(nextpr.startHead);
              pi += 1;
              pr = nextpr;
              loop = true;
            }
          }
        }
        // extend pr.end to cr.end
        points = [
          new Point(prev.x, pr.end),
          new Point(curr.x, pr.end),
          new Point(curr.x, cr.end)
        ];
        for (pindex = 1; pindex < points.length; pindex += 1) {
          pr.endHead.add(new Vector(points[pindex - 1], points[pindex]));
        }
        cr.endHead = pr.endHead;
        pi += 1;
        ci += 1;
      }
    }
  }
  if (onItem != null) {
    for (index = 0; index < lists.length; index += 1) {
      if (heads.hasOwnProperty(index)) {
        var list = lists[index];
        points = [];
        list.iterate(function (segment, key) {
          if (points.length == 0) {
            points.push(segment.from);
            points.push(segment.to);
          } else {
            points.push(segment.to);
          }
        });
        onItem.call(thisArg, points);
      }
    }
  }
}

/**
 * Callback for iterating rows
 * 
 * @callback onRowCallback
 * @param {number} row The y coordinate of the horizontal line
 */

/**
 * Finds minimum number of horizontal lines crossing all rectangles
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {React[]} rectangles Collection of rectangles
 * @param {onRowCallback} onItem Callback function to call for every found row
 */
function getMinimumCrossingRows(thisArg, rectangles, onItem) {
  var from = null;
  var to = null;
  if (onItem != null) {
    rectangles.sort(function (a, b) {
      return a.y - b.y;
    });

    for (var index = 0; index < rectangles.length; index += 1) {
      var rect = rectangles[index];
      var bottom = rect.bottom();
      if (from === null) {
        from = rect.y;
        to = bottom;
      } else {
        if (rect.y >= to) {
          onItem.call(thisArg, from);
          from = rect.y;
          to = bottom;
        } else {
          if (rect.y > from) {
            from = rect.y;
          }

          if (bottom < to) {
            to = bottom;
          }
        }
      }
    }
    if (from !== null) {
      onItem.call(thisArg, from);
    }
  }
}

/**
 * Callback function to measure item weights of merged arrays.
 * 
 * @callback getItemWeightCallback
 * @param {object} item The item to weight
 * @returns {number} Returns item's weight.
 */

/**
 * Merges array of sorted arrays into one using call back function for comparison.
 * 
 * @param {object[][]} arrays  Array of sorted arrays of objects.
 * @param {getItemWeightCallback} getItemWeight Callback function to measure item weight. 
 * @param {boolean} ignoreDuplicates If true returns distinct weight items only.
 * @returns {object[]} Returns merged sorted array.
 */
function mergeSort(arrays, getItemWeight, ignoreDuplicates) {
  var result = null,
    firstArray, secondArray, mergedArray, arrayIndex,
    firstIndex, secondIndex, firstLen, secondLen, firstItem, secondItem,
    firstItemWeight, secondItemWeight,
    currentValue;

  switch (arrays.length) {
    case 0:
      result = [];
      break;
    default:
      firstArray = [];
      for (arrayIndex = 0; arrayIndex < arrays.length; arrayIndex += 1) {
        secondArray = arrays[arrayIndex];
        mergedArray = [];

        firstLen = firstArray.length;
        secondLen = secondArray.length;

        firstIndex = 0;
        secondIndex = 0;

        firstItem = null;
        firstItemWeight = null;
        secondItem = null;
        secondItemWeight = null;

        if (firstLen > 0) {
          firstItem = firstArray[firstIndex];
          firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
        }

        if (secondLen > 0) {
          secondItem = secondArray[secondIndex];
          secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
        }
        currentValue = null;
        while (firstIndex < firstLen || secondIndex < secondLen) {

          if (firstIndex >= firstLen) {
            if (!ignoreDuplicates || currentValue != secondItem) {
              mergedArray.push(secondItem);
              currentValue = secondItem;
            }
            secondIndex += 1;


            if (secondIndex < secondLen) {
              secondItem = secondArray[secondIndex];
              secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
            }
          } else {
            if (secondIndex >= secondLen) {
              if (!ignoreDuplicates || currentValue != firstItem) {
                mergedArray.push(firstItem);
                currentValue = firstItem;
              }
              firstIndex += 1;


              if (firstIndex < firstLen) {
                firstItem = firstArray[firstIndex];
                firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
              }
            } else {
              if (firstItemWeight < secondItemWeight) {
                if (!ignoreDuplicates || currentValue != firstItem) {
                  mergedArray.push(firstItem);
                  currentValue = firstItem;
                }
                firstIndex += 1;

                if (firstIndex < firstLen) {
                  firstItem = firstArray[firstIndex];
                  firstItemWeight = !getItemWeight ? firstItem : getItemWeight(firstItem);
                }
              } else {
                if (!ignoreDuplicates || currentValue != secondItem) {
                  mergedArray.push(secondItem);
                  currentValue = secondItem;
                }
                secondIndex += 1;

                if (secondIndex < secondLen) {
                  secondItem = secondArray[secondIndex];
                  secondItemWeight = !getItemWeight ? secondItem : getItemWeight(secondItem);
                }
              }
            }
          }
        }
        firstArray = mergedArray;
      }
      result = firstArray;
      break;
  }
  return result;
}

function IntervalPoint(value, index, isStart) {
  this.value = value;
  this.index = index;
  this.isStart = isStart;
}

/**
 * Callback function to iterate over result intervals
 * 
 * @callback onMergedIntervalItemCallback
 * @param {Interval} interval Merged interval
 * @param {Object} context First interval context.
 */

/**
 * Merges collection of overlapping intervals into continuous group of intervals. Calls callback 
 * function to pass result interval per group of overlapping intervals.
 * 
 * @param {Object} thisArg The callback function invocation context
 * @param {Interval[]} items Collection of intervals.
 * @param {onMergedIntervalItemCallback} onItem Callback function to pass result group of merged intervals.
 */
function getMergedIntervals(thisArg, items, onItem) {
  var points = [];
  for(var index = 0; index < items.length; index+=1) {
    var item = items[index];
    points.push(new IntervalPoint(item.from, index, true));
    points.push(new IntervalPoint(item.to, index, false));
  }

  points.sort(function(a, b) {
    if(a.value === b.value) {
      return b.isStart - a.isStart;
    }
    return  a.value - b.value;
  });

  var counter = 0;
  var interval = null;
  var logicalIndex = null;
  for(var index = 0, len = points.length; index < len; index+=1) {
    var point = points[index];
    if(interval == null) {
      interval = new Interval(items[point.index]);
    }
    interval.to = point.value;

    if(point.isStart) {
      counter++;

      if(logicalIndex === null || logicalIndex > point.index) {
        logicalIndex = point.index;
        interval.context = items[point.index].context;
      }
    } else {
      counter--;
    }
    if(!counter) {
      if(onItem != null) {
        onItem.call(thisArg, interval);
      }
      interval = null;
      logicalIndex = null;
    }
  }
}

/**
* Heap result object
* @class HeapResult
* @property {string} key Key
* @property {number} priority Priority
* @property {Object} item Context object
*/
function HeapResult (node) {
  this.key = node.key;
  this.priority = node.priority;
  this.item = node.item;
}

/**
 * Creates Fibonacci Heap structure
 * @class FibonacciHeap
 * 
 * @param {boolean} isMaximum Is maximum heap
 * @returns {FibonacciHeap} Returns new FibonacciHeap object
 */
function FibonacciHeap(isMaximum) {
  var root = null,
    nodes = {};

  function Node(key, priority, item) {
    this.key = key;
    this.priority = priority;
    this.item = item;
    this.degree = 0;
    this.marked = false;

    this.parent = null;
    this.child = null;
    this.left = null;
    this.right = null;
  }

  /**
   * Validates internal structure consistency.
   * 
   * @returns {boolean} Returns true if structure pass data consistency check.
   */
  function validate() {
    var totalNodes = 0;
    for (var key in nodes) {
      if (nodes.hasOwnProperty(key)) {
        var node = nodes[key];

        totalNodes += 1;

        if (node.child != null) {
          if (!nodes.hasOwnProperty(node.child)) {
            throw "Child does not exists";
          }
          var ref = nodes[node.child];
          if (ref.parent != node.key) {
            throw "Child references wrong parent";
          }
        }
        if (node.parent != null) {
          if (!nodes.hasOwnProperty(node.parent)) {
            throw "Parent does not exists";
          }

        }
        if (node.left != null) {
          if (!nodes.hasOwnProperty(node.left)) {
            throw "Left does not exists";
          }
          ref = nodes[node.left];
          if (ref.right != node.key) {
            throw "Left references wrong right";
          }
        }

        if (node.right != null) {
          if (!nodes.hasOwnProperty(node.right)) {
            throw "Right does not exists";
          }
          ref = nodes[node.right];
          if (ref.left != node.key) {
            throw "Right references wrong left";
          }
        }
      }
    }
    if (root == null && totalNodes > 0) {
      throw "Orphans";
    }

    if (root != null) {
      if (!nodes.hasOwnProperty(root)) {
        throw "Root node does not exists";
      }

      node = nodes[root];
      if (node.parent != null) {
        throw "Root node has parent reference";
      }

      var children = [root];
      var processed = {};
      var totalChildren = 0;
      while (children.length > 0) {
        var newChildren = [];
        for (var index = 0, len = children.length; index < len; index += 1) {
          var child = nodes[children[index]];
          while (!processed.hasOwnProperty(child.key)) {
            processed[child.key] = true;
            totalChildren += 1;
            if (child.child != null) {
              newChildren.push(child.child);
            }
            child = nodes[child.right];
          }
        }
        children = newChildren;
      }

      if (totalNodes != totalChildren) {
        throw "Tree has loops or orpants";
      }
    }
  }

  /**
   * Adds a new item into the heap
   * @param {string} key A key of the new element 
   * @param {number} priority A priority of the new element
   * @param {object} item A context object of the new element 
   */
  function add(key, priority, item) {
    if (nodes.hasOwnProperty(key)) {
      throw "Duplicate keys are not supported!";
    }

    var newNode = new Node(key, priority, item);
    nodes[key] = newNode;

    if (root == null) {
      newNode.left = key;
      newNode.right = key;
      root = key;
    } else {
      var rootNode = nodes[root];
      _insert(rootNode, newNode);
      if (isMaximum ? rootNode.priority < newNode.priority : rootNode.priority > newNode.priority) {
        root = key;
      }
    }
  }

  function _insert(node, newNode) {
    var rightNode = nodes[node.right];
    newNode.right = node.right;
    newNode.left = node.key;
    node.right = newNode.key;
    rightNode.left = newNode.key;
  }

  function _exclude(node) {
    var prevNode = nodes[node.left],
      nextNode = nodes[node.right];

    prevNode.right = nextNode.key;
    nextNode.left = prevNode.key;
    node.right = node.key;
    node.left = node.key;
  }

  /**
   * Gets priority of element by key
   * @param {string} key The element key
   * @returns {number} Returns priority of the element
   */
  function getPriority(key) {
    var result = null;
    if (nodes.hasOwnProperty(key)) {
      result = nodes[key].priority;
    }
    return result;
  }

  /**
   * Returns heap root element
   * 
   * @returns {HeapResult} Returns root element of the heap 
   */
  function heapRoot() {
    var result = null;
    if (root != null) {
      result = new HeapResult(nodes[root]);
    }
    return result;
  }

  /**
   * Returns heap root element with removal
   * 
   * @returns {HeapResult} Returns root element of the heap 
   */
  function extractRoot() {
    var result = heapRoot();
    if (result != null) {
      var rootNode = nodes[root],
        nextNode = nodes[rootNode.right];

      if (rootNode.child != null) {
        var childNode = nodes[rootNode.child],
          childNodeLeft = nodes[childNode.left];

        rootNode.right = childNode.key;
        nextNode.left = childNodeLeft.key;
        childNode.left = rootNode.key;
        childNodeLeft.right = nextNode.key;

        _exclude(rootNode);
        delete nodes[rootNode.key];

        root = null;
        _consolidate(childNode.key);
      } else {
        _exclude(rootNode);
        delete nodes[rootNode.key];

        root = null;
        if (nextNode.key != rootNode.key) {
          _consolidate(nextNode.key);
        }
      }
    }
    return result;
  }

  function _consolidate(startKey) {
    var pairs = [], pairedNode,
      processed = {},
      key = startKey;
    while (!processed.hasOwnProperty(key)) {
      var node = nodes[key],
        nextKey = node.right;

      processed[key] = true;
      node.parent = null;

      while ((pairedNode = pairs[node.degree]) != null) {
        if (isMaximum ? node.priority > pairedNode.priority : node.priority < pairedNode.priority) {
          _union(node, pairedNode);
        } else {
          _union(pairedNode, node);
          node = pairedNode;
        }
        pairs[node.degree - 1] = null;
      }
      pairs[node.degree] = node;

      if (root == null || nodes[root] == null || (isMaximum ? nodes[root].priority <= node.priority : nodes[root].priority >= node.priority)) {
        root = node.key;
      }

      key = nextKey;
    }
  }

  function _union(node1, node2) {
    node1.degree += 1;
    _exclude(node2);
    var child = nodes[node1.child];
    if (child != null) {
      _insert(child, node2);
      if (isMaximum ? child.priority < node2.priority : child.priority > node2.priority) {
        node1.child = node2.key;
      }
    } else {
      node1.child = node2.key;
    }
    node2.parent = node1.key;
  }

  /**
   * Sets priority of an element by key
   * @param {string} key The key of the element 
   * @param {number} priority Priority
   */
  function setPriority(key, priority) {
    var node = nodes[key];
    if (isMaximum ? node.priority > priority : node.priority < priority) {
      throw "Priority increase is not supported";
    }
    node.priority = priority;

    if (node.parent != null) {
      var parentNode = nodes[node.parent];
      if (isMaximum ? parentNode.priority < node.priority : parentNode.priority > node.priority) {
        _cut(parentNode, node);
        _cascadeCut(parentNode);
      }
    }
    if (isMaximum ? nodes[root].priority < node.priority : nodes[root].priority > node.priority) {
      root = node.key;
    }
  }

  function _cut(parentNode, node) {
    node.marked = false;
    node.parent = null;
    if (node.right == node.key) {
      parentNode.child = null;
    } else {
      parentNode.child = node.right;
      _exclude(node);
    }
    parentNode.degree -= 1;
    _insert(nodes[root], node);
  }

  function _cascadeCut(node) {
    if (node.parent != null) {
      if (node.marked) {
        var parentNode = nodes[node.parent];
        _cut(parentNode, node);
        _cascadeCut(parentNode);
      } else {
        node.marked = true;
      }
    }
  }

  /**
   * Deletes heap element by key
   * @param {string} key The Key 
   */
  function deleteKey(key) {
    setPriority(key, isMaximum ? Infinity : -1);
    extractRoot();
  }

  return {
    add: add,
    getPriority: getPriority,
    setPriority: setPriority,
    heapRoot: heapRoot,
    extractRoot: extractRoot,
    deleteKey: deleteKey,
    validate: validate
  };
}

/**
 * Creates tree structure
 * @class Tree
 * 
 * @param {Tree} source A source tree structure to clone properties from
 * @returns {Tree} Returns new tree structure
 */
function Tree(source) {
    var _nodes = {},        // objects attached to nodes
      _parents = {},      // parent node id for every node id. Both of them should exists in the tree.
      _children = {},     // children node ids for every node id. All children and node itself should be in the tree.
      _roots = {},        // id of non existing parent. If parent does not exists in the tree this hash contains its id.
      _rootChildren = {}, // children of non existing parent. If parent id does not exists in the tree this collection contains it existing children.
      /** @constant
        @type {number}
        @default
      */
      BREAK = 1,
      /** @constant
        @type {number}
        @default
      */
      SKIP = 2;
  
    _init(source);
  
    function _init(source) {
      if (isObject(source)) {
        _nodes = cloneObject(source.nodes, true);
        _parents = cloneObject(source.parents, true);
        _children = cloneObject(source.children, false);
        _roots = cloneObject(source.roots, false);
        _rootChildren = cloneObject(source.rootChildren, true);
      }
    }
  
    /**
     * Callback for iterating tree nodes
     * 
     * @callback onTreeItemCallback
     * @param {string} itemid The node id
     * @param {object} item The node
     * @returns {boolean} Returns true to break the loop
     */
  
    /**
     * Loops through nodes of tree structure
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {onTreeItemCallback} onItem Callback function to call for every tree node 
     */
    function loop(thisArg, onItem) {
      var item;
      if (onItem != null) {
        for (item in _nodes) {
          if (_nodes.hasOwnProperty(item)) {
            if (onItem.call(thisArg, item, _nodes[item])) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Callback for iterating the tree nodes level by level
     * 
     * @callback onTreeItemWithLevelCallback
     * @param {string} nodeid The node id
     * @param {object} node The node context object
     * @param {number} levelIndex The node level index
     * @returns {number} Returns BREAK to break the loop and exit. Returns SKIP to skip node's branch traversing.
     */
  
    /**
     * Loops through child nodes of the tree structure level by level
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} arg0 The node id to start children traversing
     * @param {onTreeItemWithLevelCallback} arg1 Callback function to call for every child node 
     */
    function loopLevels(thisArg, arg0, arg1) {
      var levelIndex = 0,
        items = [],
        itemid,
        onItem,
        newItems,
        key,
        index, len;
  
      switch (arguments.length) {
        case 2:
          onItem = arg0;
          break;
        case 3:
          itemid = arg0;
          onItem = arg1;
          break;
      }
  
      if (onItem != null) {
  
        if (itemid == null) {
          for (key in _rootChildren) {
            if (_rootChildren.hasOwnProperty(key)) {
              items = items.concat(_rootChildren[key]);
            }
          }
        } else {
          if (_children[itemid] != null) {
            items = items.concat(_children[itemid]);
          }
        }
  
        while (items.length > 0) {
          newItems = [];
  
          for (index = 0, len = items.length; index < len; index += 1) {
            itemid = items[index];
            switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
              case BREAK:
                newItems = [];
                break;
              case SKIP:
                break;
              default:
                if (_children[itemid] != null) {
                  newItems = newItems.concat(_children[itemid]);
                }
                break;
            }
          }
  
          items = newItems;
          levelIndex += 1;
        }
      }
    }
  
    /**
     * Callback for iterating nodes and providing parent in parameters
     * 
     * @callback onTreeItemWithParentCallback
     * @param {string} nodeid The node id
     * @param {object} node The node context object
     * @param {string} parentid The parent node id
     * @param {object} parent The parent node context object
     * @returns {number} Returns BREAK to break the loop and exit. Returns SKIP to skip node's branch traversing.
     */
  
    /**
     * Traverse tree structure in post order.
     * Children first - parent last
     * @param {Object} thisArg The callback function invocation context
     * @param {onTreeItemWithParentCallback} onItem Callback function to call for every node 
     */
    function loopPostOrder(thisArg, onItem) {
      var stack = [], nodeid,
        key,
        index,
        prevParent,
        children;
  
      if (onItem != null) {
  
        for (key in _rootChildren) {
          if (_rootChildren.hasOwnProperty(key)) {
            stack = stack.concat(_rootChildren[key]);
          }
        }
  
        while (stack.length > 0) {
          nodeid = stack[stack.length - 1];
          if (nodeid != prevParent && (children = _children[nodeid]) != null) {
            for (index = children.length - 1; index >= 0; index -= 1) {
              stack.push(children[index]);
            }
          } else {
            stack.pop();
            prevParent = _parents[nodeid];
  
            if (onItem.call(thisArg, nodeid, _nodes[nodeid], prevParent, _nodes[prevParent])) {
              break;
            }
          }
        }
      }
    }
  
  
    /**
     * Traverse tree structure in pre order.
     * Parent first - children next
     * @param {Object} thisArg The callback function invocation context
     * @param {string} arg0 The node id to start traversing
     * @param {onTreeItemWithParentCallback} arg1 A callback function to call for every node 
     */
    function loopPreOrder(thisArg, arg0, arg1) {
      var stack = [], nodeid,
        key,
        index,
        parentid,
        prevParent,
        children,
        startNodeId,
        onItem;
  
      switch (arguments.length) {
        case 2:
          onItem = arg0;
          break;
        case 3:
          startNodeId = arg0;
          onItem = arg1;
          break;
      }

      if (onItem != null) {
  
        if(!node(startNodeId)) {
          for (key in _rootChildren) {
            if (_rootChildren.hasOwnProperty(key)) {
              stack = stack.concat(_rootChildren[key]);
            }
          }
        } else {
          stack.push(startNodeId);
        }
  
        while (stack.length > 0) {
          nodeid = stack[stack.length - 1];
          if (nodeid != prevParent) {
            parentid = _parents[nodeid];
            if (onItem.call(thisArg, nodeid, _nodes[nodeid], parentid, _nodes[parentid])) {
              break;
            }
          }
          if (nodeid != prevParent && (children = _children[nodeid]) != null) {
            for (index = children.length - 1; index >= 0; index -= 1) {
              stack.push(children[index]);
            }
          } else {
            stack.pop();
            prevParent = _parents[nodeid];
          }
        }
      }
    }
  
    /**
     * Callback for iterating nodes in euler walk order
     * 
     * @callback onItemEulerWalkCallback
     * @param {string} nodeid The node id
     * @param {object} node Context object of the node
     * @param {number} level The node's level
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Loops tree nodes in "Euler Walk" order
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {onItemEulerWalkCallback} onItem Callback function to call for every node 
     */
    function loopEulerWalk(thisArg, onItem) {
      var stack = [],
        nodeid,
        levels = [],
        level = 0,
        key,
        index, len,
        prevParent,
        children;
  
      if (onItem != null) {
  
        for (key in _rootChildren) {
          if (_rootChildren.hasOwnProperty(key)) {
            children = _rootChildren[key];
            for (index = 0, len = children.length; index < len; index += 1) {
              stack.push(children[index]);
              levels.push(0);
            }
          }
        }
        while (stack.length > 0) {
          index = stack.length - 1;
          nodeid = stack[index];
          level = levels[index];
  
          if (onItem.call(thisArg, nodeid, _nodes[nodeid], level)) {
            break;
          }
  
          if (nodeid != prevParent && (children = _children[nodeid]) != null) {
            for (index = children.length - 1; index >= 0; index -= 1) {
              stack.push(children[index]);
              levels.push(level + 1);
              if (index > 0) {
                stack.push(nodeid);
                levels.push(level);
              }
            }
          } else {
            stack.pop();
            levels.pop();
  
            prevParent = _parents[nodeid];
          }
        }
      }
    }
  
    /**
     * Callback function to return pairs of nodes
     * 
     * @callback onZipUpPairCallback
     * @param {string} firstNodeId First node id
     * @param {string} firstParentId Parent id of the first node
     * @param {string} secondNodeid Second node id
     * @param {string} secondParentId Parent id of the second node
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Iterates hierarchy nodes by pairs starting with given pair of start and second nodes and up to the root of the hierarchy.
     * Breaks iteration when callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} firstNodeId The first node to start iteration
     * @param {string} secondNodeid The second node to start iteration
     * @param {onZipUpPairCallback} onZip Callback function to call for every pair of nodes on the way up in the tree structure
     */
    function zipUp(thisArg, firstNodeId, secondNodeid, onZip) {
      var firstParentId,
        secondParentId;
  
      if (onZip != null) {
        while (firstNodeId != null && secondNodeid != null && firstNodeId != secondNodeid) {
          firstParentId = _parents[firstNodeId];
          secondParentId = _parents[secondNodeid];
          if (onZip.call(thisArg, firstNodeId, firstParentId, secondNodeid, secondParentId)) {
            break;
          }
          firstNodeId = firstParentId;
          secondNodeid = secondParentId;
        }
      }
    }
  
    /**
     * Loops parents up to the root of the hierarchy starting with the given node.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The node id to start iteration from
     * @param {onTreeItemCallback} onItem Callback function to call for every parent node
     * @param {boolean} includingStartItem If true the first call to callback function is made with start node id
     */
    function loopParents(thisArg, nodeid, onItem, includingStartItem) { // onItem(nodeid, node)
      var parentid = nodeid;
      if (_nodes[parentid] != null) {
        if (onItem != null) {
          if (includingStartItem === true) {
            if (onItem.call(thisArg, parentid, _nodes[parentid])) {
              return;
            }
          }
          while ((parentid = _parents[parentid]) != null) {
            if (onItem.call(thisArg, parentid, _nodes[parentid])) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Callback function to loop through children of the given node
     * 
     * @callback onTreeChildItemCallback
     * @param {string} nodeid Child node id
     * @param {object} node Context object of the child node
     * @param {number} index Index of the child node
     * @param {number} lastIndex Index of the last child
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Loops immediate children of the given node.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The parent node id to loop children of
     * @param {onTreeChildItemCallback} onItem Callback function to call for every child node
     */
    function loopChildren(thisArg, nodeid, onItem) { // onItem(nodeid, node, index, lastIndex)
      var items,
        itemid,
        index, len;
      if (_nodes[nodeid] != null) {
        items = _children[nodeid];
        if (items != null) {
          for (index = 0, len = items.length; index < len; index += 1) {
            itemid = items[index];
            if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Callback function to loop through range of children for the given node
     * 
     * @callback onTreeNodeWithIndexItemCallback
     * @param {string} nodeid Child node id
     * @param {object} node Context object of the child node
     * @param {number} index Index of the child node
     * @returns {boolean} Returns true to break the iteration of nodes and exit.
     */
  
    /**
     * Loops range of immediate children of the given node.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The parent node id to loop children of
     * @param {number} fromIndex Start index of iteration
     * @param {number} toIndex End index of iteration
     * @param {onTreeNodeWithIndexItemCallback} onItem Callback function to call for every child node
     */
    function loopChildrenRange(thisArg, nodeid, fromIndex, toIndex, onItem) {
      var items,
        itemid,
        index, len;
      if (_nodes[nodeid] != null) {
        items = _children[nodeid];
        if (items != null) {
          if (fromIndex < toIndex) {
            fromIndex = Math.max(fromIndex, 0);
            toIndex = Math.min(toIndex, items.length - 1);
            for (index = fromIndex; index <= toIndex; index += 1) {
              itemid = items[index];
              if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
                break;
              }
            }
          } else {
            fromIndex = Math.min(fromIndex, items.length - 1);
            toIndex = Math.max(0, toIndex);
            for (index = fromIndex; index >= toIndex; index -= 1) {
              itemid = items[index];
              if (onItem.call(thisArg, itemid, _nodes[itemid], index, len - 1)) {
                break;
              }
            }
          }
        }
      }
    }
  
    /**
     * Loops immediate children of the given node in reversed order.
     * Breaks iteration if callback function returns true.
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} nodeid The parent node id to loop children of
     * @param {onTreeChildItemCallback} onItem Callback function to call for every child node
     */
    function loopChildrenReversed(thisArg, nodeid, onItem) {
      var items,
        itemid,
        index, lastIndex;
      if (_nodes[nodeid] != null) {
        items = _children[nodeid];
        lastIndex = items.length - 1;
        if (items != null) {
          for (index = lastIndex; index >= 0; index -= 1) {
            itemid = items[index];
            if (onItem.call(thisArg, itemid, _nodes[itemid], index, lastIndex)) {
              break;
            }
          }
        }
      }
    }
  
    /**
     * Orders children of the given node
     * 
     * @param {string} nodeid The node id of the parent node which children should be ordered in the tree structure
     * @param {string[]} children Collection of ordered children
     */
    function arrangeChildren(nodeid, children) {
      var childid,
        index, len;
  
      children = children.slice(0);
      if (_nodes[nodeid] != null) {
        if (_children[nodeid] != null) {
          if (_children[nodeid].length == children.length) {
            for (index = 0, len = children.length; index < len; index += 1) {
              childid = children[index];
              if (_parents[childid] != nodeid) {
                throw "Child " + childid + " does not belong to given node!";
              }
            }
            _children[nodeid] = children;
          } else {
            throw "Collections of children don't match each other!";
          }
        } else {
          if (children.length > 0) {
            throw "Collections of children don't match each other!";
          }
        }
      }
    }
  
    /**
     * Adds new tree item
     * @param {string} parentid Parent id
     * @param {string} nodeid New node id
     * @param {object} node Context object of the new node
     * @param {number} position Position of the new node in the collection of children
     */
    function add(parentid, nodeid, node, position) {
      var index, len, children, childid;
  
      if (_nodes[nodeid] != null) {
        throw "Node already exists";
      }
  
      if (nodeid != null && node != null && _nodes[nodeid] == null) {
  
        if (_nodes[parentid] != null) {
          _parents[nodeid] = parentid;
  
          // existing parent
          if (_children[parentid] != null) {
            if (position == null) {
              _children[parentid].push(nodeid);
            } else {
              _children[parentid].splice(position, 0, nodeid);
            }
          } else {
            _children[parentid] = [nodeid];
          }
        } else {
          _roots[nodeid] = parentid;
  
          // missing parent
          if (_rootChildren[parentid] != null) {
            if (position == null) {
              _rootChildren[parentid].push(nodeid);
            } else {
              _rootChildren[parentid].splice(position, 0, nodeid);
            }
          } else {
            _rootChildren[parentid] = [nodeid];
          }
        }
  
        _nodes[nodeid] = node;
  
        if (_rootChildren[nodeid] != null) {
          _children[nodeid] = _rootChildren[nodeid];
          delete _rootChildren[nodeid];
  
          children = _children[nodeid];
          for (index = 0, len = children.length; index < len; index += 1) {
            childid = children[index];
  
            delete _roots[childid];
  
            _parents[childid] = nodeid;
          }
  
        }
  
      }
    }
  
    /**
     * Inserts bundle node into the tree structure. The new bundle node becomes only child node of the parent node.
     * All immediate children of the parent node become children of the inserted bundle node.
     * 
     * @param {string} nodeid Parent node id
     * @param {string} bundleid New bundle node id
     * @param {object} bundle Context object of the bundle node
     */
    function insert(nodeid, bundleid, bundle) {
      if (_nodes[nodeid] != null && bundleid != null && _nodes[bundleid] == null && bundle != null) {
  
        _nodes[bundleid] = bundle;
  
        if (_children[nodeid] != null) {
          _children[bundleid] = _children[nodeid];
        }
        _children[nodeid] = [bundleid];
  
        loopChildren(this, bundleid, function (childid, node, index) {
          _parents[childid] = bundleid;
        });
        _parents[bundleid] = nodeid;
      }
    }
  
    /**
     * Moves children form one node to another.
     * 
     * @param {string} fromNodeid Source node node id
     * @param {string} toNodeId Destination node id
     */
    function moveChildren(fromNodeid, toNodeId) {
      if (_nodes[fromNodeid] != null && _nodes[toNodeId] != null && fromNodeid != toNodeId) {
  
        if (_children[fromNodeid] != null) {
  
          loopChildren(this, fromNodeid, function (childid, node, index) {
            _parents[childid] = toNodeId;
          });
  
          if (_children[toNodeId] != null) {
            _children[toNodeId] = _children[toNodeId].concat(_children[fromNodeid]);
          } else {
            _children[toNodeId] = _children[fromNodeid];
          }
          delete _children[fromNodeid];
        }
      }
    }
  
    /**
     * Return true if structure has nodes
     * 
     * @returns {boolean} Returns true if structure has nodes
     */
    function hasNodes() {
      return !isEmptyObject(_rootChildren);
    }
  
    /**
     * Returns parent node id
     * 
     * @param {string} nodeid Node id
     * @returns {string} Returns parent node id
     */
    function parentid(nodeid) {
      var result = null;
  
      if (_parents[nodeid] != null) {
        result = _parents[nodeid];
      }
  
      return result;
    }
  
    /**
     * Returns context object of the parent node
     * 
     * @param {string} nodeid Node id
     * @returns {object} Returns context object of the  parent node
     */
    function parent(nodeid) {
      var result = null;
  
      if (_parents[nodeid] != null) {
        result = _nodes[_parents[nodeid]];
      }
  
      return result;
    }
  
    /**
     * Returns true if node has children
     * 
     * @param {string} nodeid Node id
     * @returns {boolean} Returns true if node has children
     */
    function hasChildren(nodeid) {
      return _children[nodeid] != null;
    }
  
    /**
     * Returns number of children
     * 
     * @param {string} nodeid Node id
     * @returns {number} Returns number of child nodes
     */
    function countChildren(nodeid) {
      return _children[nodeid] != null ? _children[nodeid].length : 0;
    }
  
    /**
     * Returns number of siblings
     * 
     * @param {string} nodeid Node id
     * @returns {number} Returns number of siblings
     */
    function countSiblings(nodeid) {
      var parent = parentid(nodeid);
      return parent != null ? _children[parent].length : 0;
    }
  
    /**
     * Returns index of the node in the children's collection
     * 
     * @param {string} nodeid Node id
     * @returns {number} Returns node index
     */
    function indexOf(nodeid) {
      var parent = parentid(nodeid);
      return parent != null ? _children[parent].findIndex( itemid => itemid === nodeid) : null;
    }
  
    /**
     * Returns child node by index in the children's collection
     * 
     * @param {string} nodeid Node id
     * @param {number} index Child index
     * @returns {object} Returns child node
     */
    function getChild(parentid, index) {
      var result = null,
        children;
      if ((children = _children[parentid]) != null) {
        result = _nodes[children[index]];
      }
      return result;
    }
  
    function _splice(collection, nodeid) {
      var index, len = collection.length;
      for (index = 0; index < len; index += 1) {
        if (collection[index] == nodeid) {
          collection.splice(index, 1);
          return len - 1;
        }
      }
      return len;
    }
  
    /**
     * Adds existing node to the children of the parent node
     * 
     * @param {string} parentid Parent Node id
     * @param {string} nodeid Node id
     */
    function adopt(parentid, nodeid) {
      if (_nodes[parentid] != null && _nodes[nodeid] != null) {
        if (parentid != nodeid) {
          if (_roots.hasOwnProperty(nodeid)) {
            if (!_splice(_rootChildren[_roots[nodeid]], nodeid)) {
              delete _rootChildren[_roots[nodeid]];
            }
            delete _roots[nodeid];
          }
  
          if (_parents.hasOwnProperty(nodeid)) {
            if (!_splice(_children[_parents[nodeid]], nodeid)) {
              delete _children[_parents[nodeid]];
            }
          }
  
          _parents[nodeid] = parentid;
          if (_children[parentid] != null) {
            _children[parentid].push(nodeid);
          } else {
            _children[parentid] = [nodeid];
          }
        }
        else {
          throw "Item cannot be parent of itself!";
        }
      } else {
        throw "Both parent and child should be in hierarchy!";
      }
    }
  
    /**
     * Returns context object
     * @param {string} nodeid Node id
     * @returns {object} Context object of the node
     */
    function node(nodeid) {
      return _nodes[nodeid];
    }
  
    /**
     * Validates internal data integrity of the structure
     * 
     * @returns {boolean} Returns true if structure pass validation
     */
    function validate() {
      var result = true,
        key;
  
      for (key in _roots) {
        if (_roots.hasOwnProperty(key)) {
          if (_roots[key] != null) {
            result = false;
            break;
          }
        }
      }
  
      return result;
    }
  
    /**
     * Clones tree structure
     * 
     * @returns {tree} Returns clone of the tree
     */
    function clone() {
      return Tree({
        nodes: _nodes,
        parents: _parents,
        children: _children,
        roots: _roots,
        rootChildren: _rootChildren
      });
    }
  
  
    /**
     * Callback for iterating tree node neighbours level by level
     * 
     * @callback onTreeItemNeighbourCallback
     * @param {string} itemid The node id
     * @param {object} item The node
     * @param {number} distance The neigbour node distance from the start node
     * @returns {number} Returns true to skip further neighbous traversing.
     */
  
    /**
     * Loops through the node neighbours of the tree structure level by level
     * 
     * @param {Object} thisArg The callback function invocation context
     * @param {string} itemid The node id to start traversing neighbour nodes
     * @param {number} distance Stop iteration of neighbours when distance exceeds the given value
     * @param {onTreeItemNeighbourCallback} onItem A callback function to call for every neighbour node 
     */
    function loopNeighbours(thisArg, itemid, distance, onItem) {
      var processed = {},
        margin = [itemid],
        newMargin,
        currentDistance = 0;
  
      if (onItem != null) {
        if (_nodes.hasOwnProperty(itemid)) {
          processed[itemid] = true;
          while (margin.length > 0) {
            newMargin = [];
            for (var index = 0, len = margin.length; index < len; index += 1) {
              var marginid = margin[index];
              if (currentDistance > 0) {
                if (onItem.call(thisArg, marginid, _nodes[marginid], currentDistance)) {
                  return;
                }
              }
              if (currentDistance < distance) {
                _loopNeighbours(this, marginid, function (neighbourid, neighbour) {
                  if (!processed.hasOwnProperty(neighbourid)) {
                    newMargin.push(neighbourid);
                    processed[neighbourid] = true;
                  }
                });
              }
            }
            margin = newMargin;
            currentDistance += 1;
          }
        }
      }
    }
  
    function _loopNeighbours(thisArg, itemid, onItem) {
      if (onItem != null) {
        if (_nodes.hasOwnProperty(itemid)) {
          /* loop parent */
          var parentItemId = parentid(itemid);
          if (parentItemId != null) {
            if (onItem.call(thisArg, parentItemId, _nodes[parentItemId])) {
              return;
            }
          }
          /* loop siblings */
          loopChildren(thisArg, parentItemId, function (childItemId, childItem) {
            if (childItemId != itemid) {
              if (onItem.call(thisArg, childItemId, childItem)) {
                return;
              }
            }
          });
          /* loop actual children */
          loopChildren(thisArg, itemid, function (childItemId, childItem) {
            if (onItem.call(thisArg, childItemId, childItem)) {
              return;
            }
          });
        }
      }
    }
  
    return {
      loop: loop,
      loopLevels: loopLevels,
      loopParents: loopParents,
      loopChildren: loopChildren,
      loopChildrenRange: loopChildrenRange,
      loopChildrenReversed: loopChildrenReversed,
      loopPostOrder: loopPostOrder, /* children first - parent last */
      loopPreOrder: loopPreOrder, /* parent first - children next */
      loopEulerWalk: loopEulerWalk, /* pre order loop with every parent revisited for every child */
      loopNeighbours: loopNeighbours, /* loop items by distance. Siblings are as far as parent and children */
      zipUp: zipUp,
      parentid: parentid,
      parent: parent,
      adopt: adopt,
      moveChildren: moveChildren,
      node: node,
      add: add,
      insert: insert,
      hasNodes: hasNodes,
      hasChildren: hasChildren,
      countChildren: countChildren,
      countSiblings: countSiblings,
      indexOf: indexOf,
      getChild: getChild,
      arrangeChildren: arrangeChildren,
  
      /* force validation */
      validate: validate,
      clone: clone,
  
      // callback return codes
      BREAK: BREAK, // break loop immidiatly
      SKIP: SKIP // skip loop of current node children 
    };
  }

/**
 * Creates graph structure
 * @class Graph
 * 
 * @returns {Graph} Returns graph object
 */
function Graph() {
  var _edges = {},
    MAXIMUMTOTALWEIGHT = 1,
    MINIMUMWEIGHT = 2;

  /**
   * Adds edge to the graph
   * @param {string} from The id of the start node 
   * @param {string} to The id of the end node
   * @param {object} edge The edge contextual object
   */
  function addEdge(from, to, edge) {
    if ((_edges[from] == null || _edges[from][to] == null) && edge != null) {

      if (_edges[from] == null) {
        _edges[from] = {};
      }
      _edges[from][to] = edge;

      if (_edges[to] == null) {
        _edges[to] = {};
      }
      _edges[to][from] = edge;
    }
  }

  /**
   * Returns edge context object
   * 
   * @param {string} from The edge's from node id
   * @param {string} to The edge's to node id
   * @returns {object} The edge's context object
   */
  function edge(from, to) {
    var result = null;
    if (_edges[from] != null && _edges[from][to]) {
      result = _edges[from][to];
    }
    return result;
  }

  /**
   * Returns true if node exists in the graph
   * 
   * @param {string} from The node id
   * @returns {boolean} Returns true if node exists
   */
  function hasNode(from) {
    return _edges.hasOwnProperty(from);
  }

  /**
   * Callback for iterating edges of the graph's node
   * 
   * @callback onEdgeCallback
   * @param {string} to The neighboring node id
   * @param {Object} edge The edge's context object
   */

  /**
   * Loop edges of the node
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} itemid The node id
   * @param {onEdgeCallback} onEdge A callback function to call for every edge of the node
   */
  function loopNodeEdges(thisArg, itemid, onEdge) {
    var neighbours, neighbourKey;
    if (onEdge != null) {
      neighbours = _edges[itemid];
      if (neighbours != null) {
        for (neighbourKey in neighbours) {
          if (neighbours.hasOwnProperty(neighbourKey)) {
            onEdge.call(thisArg, neighbourKey, neighbours[neighbourKey]);
          }
        }
      }
    }
  }

  /**
   * Callback function for iterating graphs nodes
   * 
   * @callback onNodeCallback
   * @param {string} to The next neighboring node id
   * @returns {boolean} Returns true to break loop
   */

  /**
   * Loop nodes of the graph
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} [itemid=undefined] The optional start node id. If start node is undefined, 
   * function loops graphs node starting from first available node
   * @param {onNodeCallback} onItem A callback function to be called for every neighboring node
   */
  function loopNodes(thisArg, startNode, onItem) {
    var processed = {};
    if (startNode == null) {
      for (startNode in _edges) {
        if (_edges.hasOwnProperty(startNode)) {
          if (!processed.hasOwnProperty[startNode]) {
            _loopNodes(thisArg, startNode, processed, onItem);
          }
        }
      }
    } else {
      _loopNodes(thisArg, startNode, processed, onItem);
    }
  }

  function _loopNodes(thisArg, startNode, processed, onItem) {
    var margin = [],
      marginKey,
      newMargin,
      index, len,
      neighbours, neighbourKey;

    margin.push(startNode);
    processed[startNode] = true;
    if (onItem != null) {
      while (margin.length > 0) {
        newMargin = [];

        /* iterate neighbours of every node on margin */
        for (index = 0, len = margin.length; index < len; index += 1) {
          marginKey = margin[index];

          if (onItem.call(thisArg, marginKey)) {
            return;
          }

          neighbours = _edges[marginKey];
          for (neighbourKey in neighbours) {
            if (neighbours.hasOwnProperty(neighbourKey) && !processed.hasOwnProperty(neighbourKey)) {
              processed[neighbourKey] = true;
              newMargin.push(neighbourKey);
            }
          }
        }
        margin = newMargin;
      }
    }
  }

  /**
   * Callback for finding edge weight
   * 
   * @callback getGraphEdgeWeightCallback
   * @param {object} edge The edge context object
   * @param {string} fromItem The edge's start node id
   * @param {string} toItem The edge's end node id
   * @returns {number} Returns weight of the edge
   */

  /**
   * Get maximum spanning tree. Graph may have disconnected sub graphs, so start node is necessary.
   * 
   * @param {string} startNode The node to start searching for maximum spanning tree. Graph is not necessary connected
   * @param {getGraphEdgeWeightCallback} getWeightFunc Callback function to get weight of an edge.
   * @returns {tree} Returns tree structure containing maximum spanning tree of the graph
   */
  function getSpanningTree(startNode, getWeightFunc) {
    var result = Tree(),
      margin = FibonacciHeap(true),
      marginNode,
      parents = {}, /* if parent for item is set then it was laready visited */
      neighbours, neighbourKey, neighbourWeight, currentWeight;

    /* add start node to margin */
    margin.add(startNode, 0, null /*parent of root node is null*/);
    parents[startNode] = null;

    /* search graph */
    while ((marginNode = margin.extractRoot()) != null) {

      /* iterate neighbours of every node on margin */
      neighbours = _edges[marginNode.key];

      for (neighbourKey in neighbours) {
        if (neighbours.hasOwnProperty(neighbourKey) && !result.node(neighbourKey)) {
          neighbourWeight = getWeightFunc != null ? getWeightFunc(neighbours[neighbourKey]) : neighbours[neighbourKey];

          currentWeight = margin.getPriority(neighbourKey);
          if (currentWeight == null) {
            margin.add(neighbourKey, neighbourWeight, null);
            parents[neighbourKey] = marginNode.key.toString();
          } else {
            if (currentWeight <= neighbourWeight) {
              /* improve node distance */
              margin.setPriority(neighbourKey, neighbourWeight);
              parents[neighbourKey] = marginNode.key.toString();
            }
          }
        }
      }

      /* add next margin item to resul tree */
      result.add(parents[marginNode.key], marginNode.key.toString(), {});
    }

    return result;
  }

  function _findStartNode(thisArg, onEdgeWeight) {
    var result = null,
      fromItem, toItems, toItem,
      weight = 0,
      maxWeight = null;

    for (fromItem in _edges) {
      if (_edges.hasOwnProperty(fromItem)) {
        toItems = _edges[fromItem];

        weight = 0;
        for (toItem in toItems) {
          if (toItems.hasOwnProperty(toItem)) {
            weight += onEdgeWeight.call(thisArg, toItems[toItem], fromItem, toItem);
          }
        }
        if (weight > maxWeight || maxWeight == null) {
          result = fromItem;
          maxWeight = weight;
        }
      }
    }
    return result;
  }

  /**
   * Get graph growth sequence. The sequence of graph traversing order.
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {getGraphEdgeWeightCallback} getWeightFunc Callback function to get weight of an edge. 
   * @param {onNodeCallback} onItem A callback function to be called for every node of the growth sequence 
   */
  function getTotalWeightGrowthSequence(thisArg, onEdgeWeight, onItem) {
    var startNode = _findStartNode(thisArg, onEdgeWeight);

    _getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, MAXIMUMTOTALWEIGHT);
  }

  /**
   * Get minimum weight graph growth sequence. The sequence of the traversing order of the graph nodes.
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} [startNode=undefined] The optional start node id 
   * @param {getGraphEdgeWeightCallback} onEdgeWeight Callback function to get weight of an edge. 
   * @param {onNodeCallback} onItem A callback function to be called for every node of the growth sequence
   */
  function getMinimumWeightGrowthSequence(thisArg, startNode, onEdgeWeight, onItem) {
    _getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, MINIMUMWEIGHT);
  }

  function _getGrowthSequence(thisArg, startNode, onEdgeWeight, onItem, growsMode) {
    var margin = {}, marginKey,
      itemsToRemove = [], /* if margin item has no neighbours to expand we remove it from margin*/
      hasNeighbours,
      processed = {}, /* if item is set then it was already visited */
      marginLength = 0, /* curent margin length */
      nextMarginKey,
      nextMarginWeight,
      bestWeight,
      neighbours, neighbourKey, neighbourWeight,
      index, len;

    if (onEdgeWeight != null && onItem != null) {
      if (startNode == null) {
        startNode = _findStartNode(thisArg, onEdgeWeight);
      }

      if (startNode != null) {

        onItem.call(thisArg, startNode);

        /* add start node to margin */
        margin[startNode] = true;
        marginLength += 1;

        /* add startNode to result tree */
        processed[startNode] = null;

        /* search graph */
        while (marginLength > 0) {
          itemsToRemove = [];
          nextMarginKey = null;
          nextMarginWeight = null;
          bestWeight = {};
          /* iterate neighbours of every node on margin */
          for (marginKey in margin) {
            if (margin.hasOwnProperty(marginKey)) {
              neighbours = _edges[marginKey];
              hasNeighbours = false;

              for (neighbourKey in neighbours) {
                if (neighbours.hasOwnProperty(neighbourKey) && !processed.hasOwnProperty(neighbourKey)) {
                  neighbourWeight = onEdgeWeight.call(thisArg, neighbours[neighbourKey], marginKey, neighbourKey);
                  hasNeighbours = true;

                  switch (growsMode) {
                    case MAXIMUMTOTALWEIGHT:
                      if (bestWeight[neighbourKey] == null) {
                        bestWeight[neighbourKey] = 0;
                      }
                      bestWeight[neighbourKey] += neighbourWeight;

                      if (!nextMarginWeight || bestWeight[neighbourKey] > nextMarginWeight) {
                        nextMarginKey = neighbourKey;
                        nextMarginWeight = bestWeight[neighbourKey];
                      }
                      break;
                    case MINIMUMWEIGHT:
                      if (bestWeight[neighbourKey] == null) {
                        bestWeight[neighbourKey] = neighbourWeight;
                      } else {
                        bestWeight[neighbourKey] = Math.min(bestWeight[neighbourKey], neighbourWeight);
                      }

                      if (!nextMarginWeight || bestWeight[neighbourKey] < nextMarginWeight) {
                        nextMarginKey = neighbourKey;
                        nextMarginWeight = bestWeight[neighbourKey];
                      }
                      break;
                  }
                }
              }

              if (!hasNeighbours) {
                itemsToRemove.push(marginKey);
              }
            }
          }

          if (nextMarginKey == null) {
            /* no items to expand to exit*/
            break;
          } else {
            margin[nextMarginKey] = true;
            marginLength += 1;
            processed[nextMarginKey] = true;

            /* add next margin item to result sequence */
            onItem.call(thisArg, nextMarginKey);
          }

          for (index = 0, len = itemsToRemove.length; index < len; index += 1) {
            /* delete visited node from margin */
            delete margin[itemsToRemove[index]];
            marginLength -= 1;
          }
        }
      }
    }
  }

  /**
   * Callback for returning optimal connection path for every end node.
   * 
   * @callback onPathFoundCallback
   * @param {string[]} path An array of connection path node ids.
   * @param {string} to The end node id, the connection path is found for.
   */

  /**
   * Get shortest path between two nodes in graph. The start and the end nodes are supposed to have connection path.
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} startNode The start node id 
   * @param {string[]} endNodes The array of end node ids.
   * @param {getGraphEdgeWeightCallback} getWeightFunc Callback function to get weight of an edge. 
   * @param {onPathFoundCallback} onPathFound A callback function to be called for every end node 
   * with the optimal connection path
   */
  function getShortestPath(thisArg, startNode, endNodes, getWeightFunc, onPathFound) {
    var margin = FibonacciHeap(false),
      distance = {},
      breadcramps = {},
      bestNodeOnMargin,
      key,
      children,
      newDistance,
      weight,
      path,
      currentNode,
      endNodesHash = {},
      index, len,
      endsCount = 0, endsFound = 0;

    /* create hash table of end nodes to find */
    for (index = 0, len = endNodes.length; index < len; index += 1) {
      key = endNodes[index];

      if (!endNodesHash.hasOwnProperty(key)) {
        endsCount += 1;
        endNodesHash[key] = true;
      }
    }

    /* add start node to margin */
    margin.add(startNode, 0, null);
    breadcramps[startNode] = null;

    /* search graph */
    while ((bestNodeOnMargin = margin.extractRoot()) != null) {
      /* iterate neighbours of selected node on margin */
      children = _edges[bestNodeOnMargin.key];
      for (key in children) {
        if (children.hasOwnProperty(key)) {
          weight = 1;
          if (getWeightFunc != null) {
            weight = getWeightFunc.call(thisArg, children[key], bestNodeOnMargin, key);
            newDistance = bestNodeOnMargin.priority + weight;
          } else {
            newDistance = bestNodeOnMargin.priority + 1;
          }
          if (weight >= 0) {
            distance = margin.getPriority(key);
            if (distance != null) {
              if (distance > newDistance) {
                margin.setPriority(key, newDistance);
                breadcramps[key] = bestNodeOnMargin.key;
              }
            } else {
              if (!breadcramps.hasOwnProperty(key)) {
                margin.add(key, newDistance, null);
                breadcramps[key] = bestNodeOnMargin.key;
              }
            }
          }
        }
      }

      if (endNodesHash.hasOwnProperty(bestNodeOnMargin.key)) {
        /* trace path */
        path = [];
        currentNode = bestNodeOnMargin.key;
        while (currentNode != null) {
          path.push(currentNode);
          currentNode = breadcramps[currentNode];
        }
        onPathFound.call(thisArg, path, bestNodeOnMargin.key);

        endsFound += 1;
        if (endsFound >= endsCount) {
          break;
        }
      }
    }
  }

  /**
   * Callback for iterating path edges
   * 
   * @callback onPathEdgeCallback
   * @param {string} from The from node id
   * @param {string} to The to node id
   * @param {Object} edge The edge's context object
   * @returns {boolean} Returns true if edge is usable
   */

  /**
   * Search any path from node to node using depth first search
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} startNode The start node id 
   * @param {string} endNode The end node id.
   * @param {onPathEdgeCallback} onEdge A callback function to call for every edge of the node
   */
  function dfsPath(thisArg, startNode, endNode, onEdge) {
    var margin = [],
      backtrace = {};

    margin.push(startNode);
    backtrace[startNode] = null;

    if (startNode != endNode) {
      /* search graph */
      while (margin.length > 0 && !backtrace.hasOwnProperty(endNode)) {
        // Remove last node out of margin
        var currentNode = margin[margin.length - 1];
        margin.length -= 1;

        // search its neighbours and add them to margin
        var neighbours = _edges[currentNode];
        for (var neighbour in neighbours) {
          if (neighbours.hasOwnProperty(neighbour)) {
            if (!backtrace.hasOwnProperty(neighbour)) {
              // node is not passed yet, check edge capacity and add new neighbour to the margin
              if (onEdge.call(thisArg, currentNode, neighbour, neighbours[neighbour])) {
                margin.push(neighbour);
                backtrace[neighbour] = currentNode;
                if (neighbour == endNode) {
                  break;
                }
              }
            }
          }
        }
      }
    }
    currentNode = endNode;
    var path = [];
    while (backtrace.hasOwnProperty(currentNode)) {
      path.push(currentNode);
      currentNode = backtrace[currentNode];
    }
    var result = [];
    if (path.length > 0) {
      for (var index = path.length - 1; index >= 0; index -= 1) {
        result.push(path[index]);
      }
    }
    return result;
  }

  /**
   * Get Level Graph starting with `startNode`
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} startNode The start node id 
   * @param {onPathEdgeCallback} onEdge A callback function to call for every edge of the graph
   */
  function getLevelGraph(thisArg, startNode, onEdge) {
    var level = {},
      margin = [],
      currentNode,
      currentLevel,
      neighbours;

    margin.push(startNode);
    level[startNode] = 1;

    /* search graph level by level */
    while (margin.length > 0) {
      var newMargin = [];
      for (var index = 0, len = margin.length; index < len; index += 1) {
        currentNode = margin[index];
        currentLevel = level[currentNode];
        neighbours = _edges[currentNode];
        for (var neighbour in neighbours) {
          if (neighbours.hasOwnProperty(neighbour)) {
            if (!level.hasOwnProperty(neighbour)) {
              if (onEdge.call(thisArg, currentNode, neighbour, neighbours[neighbour])) {
                newMargin.push(neighbour);
                level[neighbour] = currentLevel + 1;
              }
            }
          }
        }
      }
      margin = newMargin;
    }

    // Create level graph, copy existing edges to the new graph
  var levelGraph = Graph();
    for (currentNode in _edges) {
      if (level.hasOwnProperty(currentNode)) {
        currentLevel = level[currentNode];
        neighbours = _edges[currentNode];
        for (neighbour in neighbours) {
          if (level.hasOwnProperty(neighbour)) {
            var neighbourLevel = level[neighbour];
            if (currentLevel + 1 == neighbourLevel) {
              levelGraph.addEdge(currentNode, neighbour, neighbours[neighbour]);
            }
          }
        }
      }
    }

    return levelGraph;
  }

  /**
   * Depth first search loop
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {string} startNode The start node id 
   * @param {onPathEdgeCallback} onEdge A callback function to call for every edge of the graph
   * @param {onNodeCallback} onNode A callback function to be called for every neighboring node
   */
  function dfsLoop(thisArg, startNode, onEdge, onNode) {
    var margin = [],
      visited = {},
      currentNode;

    margin.push(startNode);
    visited[startNode] = true;

    /* search graph */
    while (margin.length > 0) {
      // Remove last node out of margin
      currentNode = margin[margin.length - 1];
      margin.length -= 1;

      // search its neighbours and add them to margin
      var neighbours = _edges[currentNode];
      for (var neighbour in neighbours) {
        if (neighbours.hasOwnProperty(neighbour)) {
          if (!visited.hasOwnProperty(neighbour)) {
            // node is not passed yet, check edge capacity and add new neighbour to the margin
            if (onEdge.call(thisArg, currentNode, neighbour, neighbours[neighbour])) {
              margin.push(neighbour);
              visited[neighbour] = true;
              if (onNode.call(thisArg, neighbour)) {
                return;
              }
            }
          }
        }
      }
    }
  }

  return {
    addEdge: addEdge,
    edge: edge,
    hasNode: hasNode,
    loopNodes: loopNodes,
    loopNodeEdges: loopNodeEdges,
    getSpanningTree: getSpanningTree,
    getTotalWeightGrowthSequence: getTotalWeightGrowthSequence,
    getMinimumWeightGrowthSequence: getMinimumWeightGrowthSequence,
    getShortestPath: getShortestPath,
    dfsPath: dfsPath,
    getLevelGraph: getLevelGraph,
    dfsLoop: dfsLoop
  };
}

/**
 * Creates range minimum query structure
 * @class RMQ
 * 
 * @param {number[]} items Collection of numbers
 * @returns {RMQ} Returns range minimum query structure
 */
function RMQ(items) {
  var _lookup = [];
  var _log2 = Math.log(2);

  preprocess();

  function preprocess() {
    var power;

    for (var index = 0, len = items.length; index < len; index += 1) {
      _lookup[index] = [index];
    }
    for (power = 1, len = items.length; (1 << power) < len; power += 1) {
      for (index = 0; (index + (1 << power) - 1) < len; index += 1) {
        if (items[_lookup[index][power - 1]] < items[_lookup[index + (1 << (power - 1))][power - 1]]) {
          _lookup[index][power] = _lookup[index][power - 1];
        } else {
          _lookup[index][power] = _lookup[index + (1 << (power - 1))][power - 1];
        }
      }
    }
  }

  /**
   * Returns index of minimum item for the given range of items
   * 
   * @param {number} from The left margin index
   * @param {number} to The right margin index
   * @returns {number} Returns index of the minimum item
   */
  function getRangeMinimumIndex(from, to) {
    var power = Math.floor(Math.log(to - from + 1) / _log2);

    if (items[_lookup[from][power]] <= items[_lookup[to - (1 << power) + 1][power]]) {
      return _lookup[from][power];
    } else {
      return _lookup[to - (1 << power) + 1][power];
    }
  }

  /**
   * Return minimum value for the given range
   * 
   * @param {number} from The left index of the range
   * @param {number} to The right index of the range
   * @returns {number} Returns minimum value in the range
   */
  function getRangeMinimum(from, to) {
    return items[getRangeMinimumIndex(from, to)];
  }

  return {
    getRangeMinimumIndex: getRangeMinimumIndex,
    getRangeMinimum: getRangeMinimum
  };
}

/**
 * Creates Lowest Common Ancestor Structure for the given tree
 * @class LCA
 * 
 * @param {Tree} tree The tree structure
 * @returns {LCA} Returns Lowest Common Ancestor Structure
 */
function LCA(tree) {
  var _eulerSequence = [];
  var _levels = [];
  var _fai = {};
  var _rmq;


  preprocess();

  function preprocess() {
    var counter = 0;
    tree.loopEulerWalk(this, function (nodeid, node, level) {
      _eulerSequence.push(nodeid);
      _levels.push(level);

      if (!_fai.hasOwnProperty(nodeid)) {
        _fai[nodeid] = counter;
      }
      counter += 1;
    });
    _rmq = RMQ(_levels);
  }

  /**
   * Returns lowest common ancestor for the given pair of tree nodes
   * @param {string} from The first tree node id
   * @param {string} to The second tree node id
   * @returns {string} Returns the lowest common ancestor tree node id
   */
  function getLowestCommonAncestor(from, to) {
    var fromIndex = _fai[from],
      toIndex = _fai[to],
      index;

    if (fromIndex < toIndex) {
      index = _rmq.getRangeMinimumIndex(fromIndex, toIndex);
    } else {
      index = _rmq.getRangeMinimumIndex(toIndex, fromIndex);
    }

    return _eulerSequence[index];
  }

  return {
    getLowestCommonAncestor: getLowestCommonAncestor
  };
}

/**
 * Creates pile structure used to sort and stack segments on top of each other 
 * so they occupy minimum number of rows.
 * @class Pile
 * 
 * @returns {Pile} Returns pile structure
 */
function Pile () {
  var _items = [];

  /**
   * Adds new segment to pile object.
   * 
   * @param {number} from Left margin of segment.
   * @param {number} to Right margin of segment.
   * @param {object} context Any reference to user object. It is returned as parameter in callback function of resolve method.
   */
  function add(from, to, context) {
    if (from < to) {
      _items.push(new Segment(from, to, context, 1));
    } else {
      _items.push(new Segment(to, from, context, -1));
    }
  }

  /**
   * Callback function or iterating result offsets of the pile items in the stack.
   * 
   * @callback onPileItemCallback
   * @param {number} from The left margin of the segment 
   * @param {number} to The right margin of the segment
   * @param {object} context The context of the pile item
   * @param {number} offset Index of the pile item in the stack
   */

  /**
   * Sorts and stack segments on top of each other so they occupy minimum number of rows.
   * 
   * @param {object} thisArg A context object of the callback function invocation.
   * @param {onPileItemCallback} onItem Callback function for setting segments offsets in the pile.
   * @returns {number} Number of stacked rows in pile.
   */
  function resolve(thisArg, onItem) {
    var hash,
      backtraceNext,
      backtraceTaken,
      items, item,
      rowItems,
      rows,
      rowIndex, index,
      offset = 0;

    if (onItem != null) {
      items = _items.slice(0);
      items.sort(function (a, b) {
        return a.from - b.from;
      });

      rows = [];
      while (items.length > 0) {
        hash = {};
        backtraceNext = {};
        backtraceTaken = {};

        getMax(0, items, hash, backtraceNext, backtraceTaken);

        rowItems = [];
        rows[offset] = [];
        index = 0;
        while (backtraceNext.hasOwnProperty(index)) {
          if (backtraceTaken[index]) {
            rowItems.push(index);

            rows[offset].push(items[index]);
          }
          index = backtraceNext[index];
        }

        for (index = rowItems.length - 1; index >= 0; index -= 1) {
          items.splice(rowItems[index], 1);
        }
        offset += 1;
      }

      for (rowIndex = 0; rowIndex < offset; rowIndex += 1) {
        rowItems = rows[rowIndex];
        for (index = 0; index < rowItems.length; index += 1) {
          item = rowItems[index];
          if (onItem.call(thisArg, item.from, item.to, item.context, rowIndex, offset, item.direction)) {
            return offset;
          }
        }
      }
    }

    return offset;
  }

  function Segment(from, to, context, direction) {
    this.context = context;
    this.from = from;
    this.to = to;
    this.offset = null;
    this.direction = direction;
  }

  function getMax(index, items, hash, backtraceNext, backtraceTaken) {

    if (index >= items.length) {
      return 0;
    }

    if (hash.hasOwnProperty(index)) {
      return hash[index];
    }

    var item = items[index];
    var withoutItem = getMax(index + 1, items, hash, backtraceNext, backtraceTaken);

    var nextIndex = index + 1;
    while (nextIndex < items.length) {
      var nextItem = items[nextIndex];
      if (nextItem.from >= item.to) {
        break;
      }
      nextIndex += 1;
    }
    var withItem = 1 + getMax(nextIndex, items, hash, backtraceNext, backtraceTaken);

    if (withItem > withoutItem) {
      hash[index] = withItem;
      backtraceNext[index] = nextIndex;
      backtraceTaken[index] = true;
    } else {
      hash[index] = withoutItem;
      backtraceNext[index] = index + 1;
      backtraceTaken[index] = false;
    }

    return hash[index];
  }

  return {
    add: add,
    resolve: resolve
  };
}

/**
 * Creates Quad Tree data structure. It distributes points into equal quadrants. 
 * So it is equivalent to 2 dimensional binary search tree. 
 * @class QuadTree
 * 
 * @param {number} minimalSize Defines minimal size of the quadrant. This protects structure against unnecessary depth.
 * @returns {QuadTree} Returns Quad Tree data structure.
 */
function QuadTree(minimalSize) {
  var _minimalScale = Math.max(1, scale(minimalSize)),
    _rootScale = 8,
    _rootSize = 256,
    _rootCell = null;

  // Create root cell
  _rootCell = new Cell(0, 0, _rootScale, _rootSize);

  function Cell(x, y, scale, size) {
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.size = size;
    this.quadrants = [];
    this.points = [];
  }

  Cell.prototype.notEnclosed = function (rect) {
    if (this.x < rect.x || this.x + this.size > rect.x + rect.width || this.y < rect.y || this.y + this.size > rect.y + rect.height) {
      return true;
    }
    return false;
  };

  Cell.prototype.overlaps = function (rect) {
    if (this.x + this.size < rect.x || rect.x + rect.width < this.x || this.y + this.size < rect.y || rect.y + rect.height < this.y) {
      return false;
    }
    return true;
  };

  Cell.prototype.getQuadrantIndex = function (x, y) {
    var shift = this.scale - 1;
    return ((x >> shift) & 1) | (((y >> shift) & 1) << 1);
  };

  function scale(value) {
    return Math.floor(Math.log(value) / Math.log(2));
  }

  /**
   * Adds point
   * 
   * @param {Point} point Point
   */
  function addPoint(point) {
    var x = Math.floor(point.x),
      y = Math.floor(point.y),
      size = Math.max(x, y);

    while (_rootSize <= size) {
      _rootScale += 1;
      _rootSize *= 2;
      var parent = new Cell(0, 0, _rootScale, _rootSize);
      _splitCell(parent);
      parent.quadrants[0] = _rootCell;
      _rootCell = parent;
    }
    _addPoint(point);
  }

  function _addPoint(point) {
    var x = Math.floor(point.x),
      y = Math.floor(point.y),
      cell = _rootCell;
    if (x < 0 || y < 0) {
      throw "Negative values are not supported in the quad tree.";
    }
    while (cell.points == null || cell.points.length > 0) {
      if (cell.scale == _minimalScale && cell.points != null) {
        break;
      }
      if (cell.points != null && cell.points.length > 0) {
        _splitCell(cell);
      }
      cell = cell.quadrants[cell.getQuadrantIndex(x, y)];
    }
    cell.points.push(point);
  }

  function _splitCell(parent) {
    var size = parent.size / 2;
    parent.quadrants = [
      new Cell(parent.x, parent.y, parent.scale - 1, size),
      new Cell(parent.x + size, parent.y, parent.scale - 1, size),
      new Cell(parent.x, parent.y + size, parent.scale - 1, size),
      new Cell(parent.x + size, parent.y + size, parent.scale - 1, size)
    ];
    for (var index = 0, len = parent.points.length; index < len; index += 1) {
      var point = parent.points[index],
        x = Math.floor(point.x),
        y = Math.floor(point.y);

      parent.quadrants[parent.getQuadrantIndex(x, y)].points.push(point);
    }

    // indicates that cell has quadrants
    parent.points = null;
  }

  /**
   * Callback function for iteration of points
   * 
   * @callback onQuadTreePointCallback
   * @param {Point} point Rectangle
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops rectangular area of quad tree structure
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {Rect} rect Rectangular search area
   * @param {onQuadTreePointCallback} onItem Callback function to call for every point within the search area
   */
  function loopArea(thisArg, rect, onItem) {
    var cell,
      index, len;
    if (onItem != null) {
      var check = [_rootCell],
        nocheck = [];
      while (check.length > 0 || nocheck.length > 0) {
        var newCheck = [],
          newNocheck = [];
        for (index = 0, len = check.length; index < len; index += 1) {
          cell = check[index];
          if (cell.overlaps(rect)) {
            if (cell.notEnclosed(rect)) {
              if (cell.points == null) {
                for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
                  newCheck.push(cell.quadrants[quadrantIndex]);
                }
              } else {
                for (var pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
                  var point = cell.points[pointIndex];
                  if (rect.contains(point)) {
                    if (onItem.call(thisArg, point)) {
                      return;
                    }
                  }
                }
              }
            } else {
              nocheck.push(cell);
            }
          }
        }
        for (index = 0, len = nocheck.length; index < len; index += 1) {
          cell = nocheck[index];
          if (cell.points == null) {
            for (quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
              newNocheck.push(cell.quadrants[quadrantIndex]);
            }
          } else {
            for (pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
              if (onItem.call(thisArg, cell.points[pointIndex])) {
                return;
              }
            }
          }
        }
        check = newCheck;
        nocheck = newNocheck;
      }
    }
  }

  /**
   * Validates internal data consistency of quad tree data structure
   * 
   * @returns {boolean} Returns true if structure pass validation
   */
  function validate() {
    var level = [_rootCell];
    while (level.length > 0) {
      var newLevel = [];
      for (var index = 0, len = level.length; index < len; index += 1) {
        var cell = level[index];
        var rect = new Rect(cell.x, cell.y, cell.size, cell.size);
        if (cell.points != null && cell.quadrants.length > 0) {
          return false;
        }
        if (cell.points == null) {
          for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
            newLevel.push(cell.quadrants[quadrantIndex]);
          }
        } else {
          for (var pointIndex = 0, pointsLen = cell.points.length; pointIndex < pointsLen; pointIndex += 1) {
            var point = cell.points[pointIndex];
            if (!rect.contains(point)) {
              return false;
            }
          }
        }
      }
      level = newLevel;
    }
    return true;
  }

  /**
   * Returns collection of quadrants created in the data structure
   * Quadrants exists only when elements exists in them.
   * This method is used for visual debugging of the structure.
   * 
   * @param {React} selection Rectangular test area to highlight quadrants
   * @returns {Rect[]} Returns collection of available quadrants.
   * Quadrants containing points within selection area have context.highlight property set to true.
   */
  function getPositions(selection) {
    var result = [];
    var level = [_rootCell];
    while (level.length > 0) {
      var newLevel = [];
      for (var index = 0, len = level.length; index < len; index += 1) {
        var cell = level[index];
        var rect = new Rect(cell.x, cell.y, cell.size, cell.size);
        rect.context = {
          isHighlighted: false
        };
        if (selection != null && selection.overlaps(rect) && cell.points != null && cell.points.length > 0) {
          rect.context.isHighlighted = true;
        }

        result.push(rect);
        for (var quadrantIndex = 0; quadrantIndex < 4; quadrantIndex += 1) {
          var quadrant = cell.quadrants[quadrantIndex];
          if (quadrant != null) {
            newLevel.push(quadrant);
          }
        }
      }
      level = newLevel;
    }
    return result;
  }

  return {
    addPoint: addPoint,
    loopArea: loopArea,
    validate: validate,
    getPositions: getPositions
  };
}

/**
 * Create spatial index structure. It uses collection of sizes to distribute 
 * rectangles into buckets of similar size elements. Elements of the same bucket 
 * are approximated to points. The search of rectangles is transformed to search of points 
 * within given range plus offset for maximum linear rectangle size.
 * 
 * @class SpatialIndex
 * 
 * @param {Array} sizes Reference to optional collection of possible sizes of items we plan to store
 * in the index
 * 
 * @returns {SpatialIndex} Returns spacial index data structure.
 */
function SpatialIndex(sizes) {
  var _buckets = [];

  sizes.sort(function (a, b) { return a - b; });

  switch (sizes.length) {
    case 0:
      _buckets.push(new Bucket(0, 1000000));
      break;
    case 1:
      var size1 = sizes[0];
      _buckets.push(new Bucket(0, size1));
      break;
    case 2:
      size1 = sizes[0];
      var size2 = sizes[1];
      if (size2 > size1 * 2) {
        _buckets.push(new Bucket(0, size1));
        _buckets.push(new Bucket(size1, size2));
      } else {
        _buckets.push(new Bucket(0, size2));
      }
      break;
    default:
      var breaks = getLiniarBreaks(sizes);
      var minimum = 0;
      for (var index = 0; index < breaks.length; index += 1) {
        var maximum = sizes[breaks[index]];
        _buckets.push(new Bucket(minimum, maximum));
        minimum = maximum;
      }
      break;
  }

  function Bucket(minimum, maximum) {
    this.minimum = minimum;
    this.maximum = maximum;
    this.quadTree = QuadTree(maximum * 2);
  }

  /**
   * Adds rectangle to spacial index
   * @param {Rect} rect Rectangle
   */
  function addRect(rect) {
    var size = Math.max(rect.width, rect.height);
    var point = rect.centerPoint();

    for (var index = 0, len = _buckets.length; index < len; index += 1) {
      var bucket = _buckets[index];

      if (size <= bucket.maximum || index == len - 1) {
        point.context = rect;
        bucket.quadTree.addPoint(point);
        break;
      }
    }
  }

  /**
   * Callback function for iteration of spacial index rectangles
   * 
   * @callback onSpatialIndexItemCallback
   * @param {React} rect Rectangle
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops rectangular area of spacial index
   * 
   * @param {object} thisArg The callback function invocation context
   * @param {Rect} rect Rectangular search area
   * @param {onSpatialIndexItemCallback} onItem Callback function to call for every rectangle intersecting given rectangular search area
   */
  function loopArea(thisArg, rect, onItem) { // onItem = function(itemid) {}
    if (onItem != null) {
      for (var index = 0, len = _buckets.length; index < len; index += 1) {
        var bucket = _buckets[index];
        var bucketRect = new Rect(rect);
        bucketRect.offset(bucket.maximum / 2.0);
        bucket.quadTree.loopArea(this, bucketRect, function (point) {
          var pointRect = point.context;

          if (rect.overlaps(pointRect)) {
            return onItem.call(thisArg, pointRect);
          }
        });
      }
    }
  }

  /**
   * Validates internal data consistency of spacial index data structure
   * 
   * @ignore
   * @returns {boolean} Returns true if structure pass validation
   */
  function validate() {
    var result = true;
    for (var index = 0, len = _buckets.length; index < len; index += 1) {
      var bucket = _buckets[index];

      result = result && bucket.quadTree.validate();
    }
    return result;
  }

  /**
   * Returns collection of quadrants created in spacial index
   * Quadrants exists only when elements exists in them.
   * This method is used for visual debugging of the structure.
   * 
   * @ignore
   * @param {React} selection Rectangular test area to highlight quadrants
   * @returns {Rect[]} Returns collection of available quadrants.
   * Quadrants containing points within selection area have context.highlight property set to true.
   */
  function getPositions(selection) {
    var result = [];
    for (var index = 0, len = _buckets.length; index < len; index += 1) {
      var bucket = _buckets[index];

      result = result.concat(bucket.quadTree.getPositions(selection));
    }
    return result;
  }

  return {
    addRect: addRect,
    loopArea: loopArea,
    validate: validate,
    getPositions: getPositions
  };
}

/**
 * Creates Tree Levels structure. It is diagraming specific auxiliary structure
 * that keeps tree nodes order level by level.
 * @class TreeLevels
 * 
 * @param {TreeLevels} [source=undefined] Optional source object to clone content from into the new instance of the structure.
 * @returns {TreeLevels} Returns tree levels structure.
 */
function TreeLevels(source) {
  var _levels = [],
    _items = {},
    _minimum = null,
    _maximum = null;

  _init(source);

  function _init(source) {
    if (isObject(source)) {
      _levels = cloneObject(source.levels, true);
      _items = cloneObject(source.items, true);
      _minimum = cloneObject(source.minimum, true);
      _maximum = cloneObject(source.maximum, true);
    }
  }

  function LevelContext(context) {
    this.context = context;
    this.items = [];
  }

  function ItemContext(context, position, level) {
    this.context = context;
    this.positions = {};
    this.positions[level] = position;
    this.startLevel = level;
    this.endLevel = level;
  }

  /**
   * Checks if structure has elements.
   * 
   * @returns {boolean} Returns true if structure has elements.
   */
  function isEmpty() {
    return !_levels.length;
  }

  /**
   * Number of levels
   * 
   * @returns {number} Returns number of levels in structure.
   */
  function length() {
    return _levels.length;
  }

  /**
   * Adds new level. Structure keeps levels sorted by their indexes. The level index can be positive and negative as well.
   * Structure auto expands collection of levels in both directions and keeps them ordered.
   * @param {number} level New level index
   * @param {object} context Context object
   */
  function addLevel(level, context) {
    var treeLevel = createLevel(level);
    treeLevel.context = context;
  }

  /**
   * Returns element's start level index in the structure. Element may occupy multiple levels of the tree levels structure.
   * 
   * @param {string} itemid The element id
   * @returns {number} Returns start level index
   */
  function getStartLevelIndex(itemid) {
    return _items.hasOwnProperty(itemid) ? _items[itemid].startLevel : null;
  }

  /**
   * Returns element's end level index in the structure. Element may occupy multiple levels of the tree levels structure.
   * 
   * @param {string} itemid Element id
   * @returns {number} Returns end level index
   */
  function getEndLevelIndex(itemid) {
    return _items.hasOwnProperty(itemid) ? _items[itemid].endLevel : null;
  }

  /**
   * Gets element position at level
   * 
   * @param {string} itemid Element id
   * @param {number} level Level index
   * @returns {number} Returns position of the element 
   */
  function getItemPosition(itemid, level) {
    var context = _items[itemid];
    if (context != null) {
      if (level != null) {
        return context.positions[level];
      } else {
        return context.positions[context.startLevel];
      }
    }
    return null;
  }

  /**
   * Gets element at position
   * 
   * @param {number} levelIndex Level index
   * @param {number} position Item position
   * @returns {number} Returns element id
   */
  function getItemAtPosition(levelIndex, position) {
    var level = _levels[levelIndex],
      itemid = null;
    if (level != null) {
      itemid = level.items[position];
    }
    return itemid;
  }

  /**
   * Gets previous element
   * 
   * @param {string} itemid Element id
   * @param {number} itemLevel Level index
   * @returns {number} Returns previous element id
   */
  function getPrevItem(itemid, itemLevel) {
    var result = null;
    if (_items.hasOwnProperty(itemid)) {
      var item = _items[itemid];
      itemLevel = itemLevel || item.startLevel;
      var level = _levels[itemLevel];
      result = level.items[item.positions[itemLevel] - 1];
    }
    return result;
  }

  /**
   * Gets next element
   * 
   * @param {string} itemid Element id
   * @param {number} itemLevel Level index
   * @returns {number} Returns next element id
   */
  function getNextItem(itemid, itemLevel) {
    var result = null;
    if (_items.hasOwnProperty(itemid)) {
      var item = _items[itemid];
      itemLevel = itemLevel || item.startLevel;
      var level = _levels[itemLevel];
      result = level.items[item.positions[itemLevel] + 1];
    }
    return result;
  }

  /**
   * Checks if structure contains element
   * @param {string} itemid Element id
   * @returns {boolean} Returns true if structure contains given element id
   */
  function hasItem(itemid) {
    return _items.hasOwnProperty(itemid);
  }

  /**
   * Checks if structure contains level
   * @param {number} levelIndex Level index
   * @returns {boolean} Returns true if structure contains given level index
   */
  function hasLevel(levelIndex) {
    return _levels[levelIndex] != null;
  }

  /**
   * Gets element context object
   * @param {string} itemid Element id
   * @returns {object} Returns context object of the element
   */
  function getItemContext(itemid) {
    var result = null;
    if (_items.hasOwnProperty(itemid)) {
      result = _items[itemid].context;
    }
    return result;
  }

  /**
   * Creates new level
   * @param {index} index New level index
   * @returns {object} Returns new level empty context object
   */
  function createLevel(index) {
    if (_levels[index] == null) {
      _levels[index] = new LevelContext(null);

      _minimum = _minimum === null ? index : Math.min(_minimum, index);
      _maximum = _maximum === null ? index : Math.max(_maximum, index);
    }
    return _levels[index];
  }

  /**
   * Adds element
   * @param {number} levelIndex Level index
   * @param {string} itemid New element id
   * @param {object} context Context object
   */
  function addItem(levelIndex, itemid, context) {
    var level, itemContext;
    if (!_items.hasOwnProperty(itemid)) {
      level = createLevel(levelIndex);
      level.items.push(itemid);
      _items[itemid] = new ItemContext(context, level.items.length - 1, levelIndex);
    } else {
      level = createLevel(levelIndex);
      level.items.push(itemid);
      itemContext = _items[itemid];
      itemContext.positions[levelIndex] = level.items.length - 1;
      itemContext.startLevel = Math.min(itemContext.startLevel, levelIndex);
      itemContext.endLevel = Math.max(itemContext.endLevel, levelIndex);
    }
  }

  /**
   * Callback function for iteration of levels
   * 
   * @callback onTreeLevelCallback
   * @param {number} levelIndex Level index
   * @param {object} level Context object
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops levels
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelCallback} onItem A callback function to call for every level
   */
  function loopLevels(thisArg, onItem) {
    var index,
      level;
    if (onItem != null) {
      for (index = _minimum; index <= _maximum; index += 1) {
        level = _levels[index];
        if (level != null) {
          if (onItem.call(thisArg, index, level.context)) {
            break;
          }
        }
      }
    }
  }

  /**
   * Loops levels in reversed order
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelCallback} onItem A callback function to call for every level
   */
  function loopLevelsReversed(thisArg, onItem) {
    var index,
      level;
    if (onItem != null) {
      for (index = _maximum; index >= _minimum; index -= 1) {
        level = _levels[index];
        if (level != null) {
          if (onItem.call(thisArg, index, level.context)) {
            break;
          }
        }
      }
    }
  }

  /**
   * Gets number of elements at level
   * 
   * @param {number} levelIndex Level index
   * @returns {number} Returns number of elements at the level
   */
  function getLevelLength(levelIndex) {
    var result = 0,
      level = _levels[levelIndex];
    if (level != null) {
      result = level.items.length;
    }
    return result;
  }

  /**
   * Callback function for iteration of level elements
   * 
   * @callback onTreeLevelItemCallback
   * @param {string} itemid Element id
   * @param {object} item Context object of the element
   * @param {number} position Position of the element at level
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops level elements
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {number} levelIndex Level index
   * @param {onTreeLevelItemCallback} onItem A callback function to call for every item
   */
  function loopLevelItems(thisArg, levelIndex, onItem) {
    var index, len,
      level,
      itemid;
    if (onItem != null) {
      level = _levels[levelIndex];
      if (level != null) {
        for (index = 0, len = level.items.length; index < len; index += 1) {
          itemid = level.items[index];
          if (onItem.call(thisArg, itemid, _items[itemid].context, index)) {
            break;
          }
        }
      }
    }
  }

  /**
   * Callback function for iteration of elements level by level
   * 
   * @callback onTreeLevelsItemCallback
   * @param {string} itemid Element id
   * @param {object} item Element context object
   * @param {number} position Position of the element at level
   * @param {number} levelIndex Level index
   * @param {object} level Level context object
   * @returns {boolean} Returns true to break iteration process.
   */

  /**
   * Loops elements level by level
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelsItemCallback} onItem A callback function to call for every item
   */
  function loopItems(thisArg, onItem) { // function onItem(itemid, item, position, levelIndex, level)
    var index, len,
      level, levelIndex,
      items,
      itemid,
      processed = {};
    if (onItem != null) {
      for (levelIndex = _minimum; levelIndex <= _maximum; levelIndex += 1) {
        level = _levels[levelIndex];
        if (level != null) {
          items = level.items;
          for (index = 0, len = items.length; index < len; index += 1) {
            itemid = items[index];
            if (!processed.hasOwnProperty(itemid)) {
              processed[itemid] = true;
              if (onItem.call(thisArg, itemid, _items[itemid].context, index, levelIndex, level.context)) {
                return;
              }
            }
          }
        }
      }
    }
  }

  /**
   * Callback for finding distance for element
   *
   * @callback onTreeLevelDistanceCallback
   * @param {number} itemid Element id
   * @param {object} item Context object
   * @returns {number} Returns distance for the element
   */

  /**
   * Searches element at level using binary search
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {number} levelIndex Level index to search element at
   * @param {onTreeLevelDistanceCallback} onGetDistance A callback function to measure distance for element
   */
  function binarySearch$1(thisArg, levelIndex, onGetDistance) {
    var result = null,
      level;
    if (onGetDistance != null) {
      level = _levels[levelIndex];
      if (level != null) {
        result = binarySearch(level.items, function (itemid) {
          return onGetDistance.call(thisArg, itemid, _items[itemid].context);
        });
      }
    }
    return result.item;
  }

  /**
   * Callback for finding weight of element
   *
   * @callback onTreeLevelItemWeightCallback
   * @param {number} itemid Element id
   * @param {object} item Context object
   * @returns {number} Returns distance for the element
   */

  /**
   * Callback for iterating items
   *
   * @callback onTreeLevelMergedItemCallback
   * @param {number} itemid Element id
   * @param {object} item Context object
   * @returns {number} Returns true to break iteration process.
   */

  /**
   * Loops merged elements of tree level structure by weight
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onTreeLevelItemWeightCallback} getItemWeight Callback to measure weight of the element
   * @param {onTreeLevelMergedItemCallback} onItem Callback to iterate merged elements
   */
  function loopMerged(thisArg, getItemWeight, onItem) {
    var index, len,
      level,
      itemid,
      levelsItems = [],
      sortedItems;

    for (index = 0, len = _levels.length; index < len; index += 1) {
      level = _levels[index];
      if (level != null) {
        levelsItems.push(level.items);
      }
    }

    sortedItems = mergeSort(levelsItems, getItemWeight, true);

    if (onItem != null) {
      for (index = 0, len = sortedItems.length; index < len; index += 1) {
        itemid = sortedItems[index];
        if (onItem.call(thisArg, itemid, _items[itemid].context)) {
          break;
        }
      }
    }
  }

  /**
   * Loops level elements starting with the given item
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {string} itemid Start element id
   * @param {boolean} isLeft If true then method loops leftward
   * @param {onTreeLevelMergedItemCallback} onItem Callback function to call for every item
   * @param {number} level Level index
   */
  function loopFromItem(thisArg, itemid, isLeft, onItem, level) {
    var context,
      index, len,
      items, nextItemId,
      itemLevel, position;
    if (_items.hasOwnProperty(itemid)) {
      context = _items[itemid];
      itemLevel = level || context.startLevel;
      items = _levels[itemLevel].items;
      position = context.positions[itemLevel];
      if (onItem != null) {
        if (isLeft) {
          for (index = position - 1; index >= 0; index -= 1) {
            nextItemId = items[index];
            if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
              break;
            }
          }
        } else {
          for (index = position + 1, len = items.length; index < len; index += 1) {
            nextItemId = items[index];
            if (onItem.call(thisArg, nextItemId, _items[nextItemId].context)) {
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Loops levels starting with the given element end level. Element may occupy multiple levels, 
   * so this method starts level iteration from next level after or before item levels.
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {string} itemid Element id
   * @param {boolean} isBelow If true then method loops levels backward
   * @param {onTreeLevelCallback} onItem Callback function to call for every level
   */
  function loopLevelsFromItem(thisArg, itemid, isBelow, onItem) { // function(levelIndex, level)
    var context,
      index, level;
    if (_items.hasOwnProperty(itemid)) {
      context = _items[itemid];
      if (onItem != null) {
        if (isBelow) {
          for (index = context.endLevel + 1; index <= _maximum; index += 1) {
            level = _levels[index];
            if (onItem.call(thisArg, index, level != null ? level.context : null)) {
              break;
            }
          }
        } else {
          for (index = context.startLevel - 1; index >= _minimum; index -= 1) {
            level = _levels[index];
            if (onItem.call(thisArg, index, level != null ? level.context : null)) {
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Clones tree levels structure.
   * 
   * @returns {TreeLevels} Returns cloned copy of the structure
   */
  function clone() {
    return TreeLevels({
      levels: _levels,
      items: _items,
      minimum: _minimum,
      maximum: _maximum
    });
  }

  return {
    addlevel: addLevel,
    hasLevel: hasLevel,
    hasItem: hasItem,
    addItem: addItem,
    getItemContext: getItemContext,
    getLevelIndex: getStartLevelIndex,
    getEndLevelIndex: getEndLevelIndex,
    getItemPosition: getItemPosition,
    getItemAtPosition: getItemAtPosition,
    loopLevels: loopLevels,
    loopLevelsReversed: loopLevelsReversed,
    loopLevelItems: loopLevelItems,
    getLevelLength: getLevelLength,
    loopItems: loopItems,
    binarySearch: binarySearch$1,
    loopMerged: loopMerged,
    loopFromItem: loopFromItem,
    loopLevelsFromItem: loopLevelsFromItem,
    getPrevItem: getPrevItem,
    getNextItem: getNextItem,
    length: length,
    isEmpty: isEmpty,

    clone: clone
  };
}

/**
 * @class OrgConfig
 * @classdesc Organizational Chart configuration object. Use this object as a reference 
 * for available properties and their default values.
 * 
 * Organizational Chart control has API options similar to regular UI collection controls.
 * It supports single node selection with the `cursorItem` property, mouse click,
 * or keyboard `Enter` key. The `highlightItem` functionality provides mouse over feedback
 * and lets the user navigate diagram nodes with keyboard arrow keys. The `selectedItems`
 * collection and checkboxes enable multi-select available in ListView and TreeView controls.
 * 
 * @param {string} name
 */
function OrgConfig(name) {
  this.name = (name !== undefined) ? name : "OrgDiagram";
  this.classPrefix = "orgdiagram";

  /**
   * The navigation mode property allows disabling control interactivity.
   * By default, the control behaves like a regular collection control. It has a cursor to select
   * a single item in the collection. So user can click and select any node in the diagram.
   * The control has a highlight for mouseover feedback. So user can move the mouse and see highlight
   * frame and callout callback annotation for a node under the cursor.
   * 
   * By `Default`, the control has both cursor and highlight. If they are disabled, then control is rendered as a static image.
   * 
   * @type {NavigationMode}
   */
  this.navigationMode = NavigationMode.Default;

  /**
   * The page fit mode option minimizes the diagram size via replacing nodes with markers and labels. 
   * That mode can show a large number of nodes while not affecting the rendering performance.
   * It can fit thousands of nodes into available screen space without losing usability. 
   * On the other hand, when we use a graphics editor to draw our diagrams manually,
   * it is common to have a sparse layout with significant gaps between the nodes.
   * If we don't fit the graph, the space between nodes can easily make 
   * the diagram/chart unusable hard to view, edit and navigate.
   * 
   * @group Auto Layout
   * @type {PageFitMode}
   */
  this.pageFitMode = PageFitMode.FitToPage;

  /**
   * The minimal nodes visibility option controls how small nodes of the diagram can be in auto-fit mode. 
   * 
   * @group Auto Layout
   * @type {Visibility}
   */
  this.minimalVisibility = Visibility.Dot;

  /**
   * The minimum visible levels option prevents top-level nodes from folding into markers.
   * It accounts for organizational chart relations and the `levelOffset` of individual items.
   * 
   * @group Auto Layout
   * @type {number}
   */
  this.minimumVisibleLevels = 1;

  /**
   * The orientation property rotates the diagram layout. It is needed for right-to-left languages support and custom layouts.
   * 
   * @group Auto Layout
   * @type {OrientationType}
   */
  this.orientationType = OrientationType.Top;

  /**
   * The horizontal alignment allows the transformation of hierarchy into a folder-like tree
   * visualization, where the parent node is aligned with the first child. If alignment
   * is set to center, then the parent node is aligned to the children's center.
   * In the `Left` alignment mode parent is aligned to left most child and vice versa for the `Right` alignment.
   * 
   * @group Auto Layout
   * @type {HorizontalAlignmentType}
   */
  this.horizontalAlignment = HorizontalAlignmentType.Center;

  /**
   * The vertical alignment sets nodes alignment inside row's vertical boundaries.
   * If a row of nodes contains nodes of multiple sizes, small nodes
   * are vertically aligned relative to their bigger siblings.
   * It does not change anything if diagram nodes are all of the same size.
   * 
   * @group Auto Layout
   * @type {VerticalAlignmentType}
   */
  this.verticalAlignment = VerticalAlignmentType.Middle;

  /**
   * The arrows direction property shows arrows for connector lines. 
   * If it is set to the `Parents`, arrows are drawn towards logical parents from logical children. 
   * 
   * @group Relation Lines
   * @type {GroupByType}
   */
  this.arrowsDirection = GroupByType.None;

  /**
   * Show extra horizontal arrows for long horizontal connection lines for the easy visual 
   * tracking of relations between parents and children. By default, it is off.
   * 
   * @group Relation Lines
   * @type {boolean}
   */
  this.showExtraArrows = false;

  /**
   * The extra arrows minimum space on horizontal connection lines. See `showExtraArrows` property.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.extraArrowsMinimumSpace = 30;

  /**
   * The connector type option defines the style of connection lines in the diagram.
   * It is only applicable to nodes minimized to markers or lines.
   * The templated nodes are always connected with squared connection lines
   * 
   * @group Relation Lines
   * @type {ConnectorType}
   */
  this.connectorType = ConnectorType.Squared;

  /**
   * The bevel size of squared connection lines.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.bevelSize = 4;

  /**
   * The elbow type of squared connection lines
   * 
   * @group Relation Lines
   * @type {ElbowType}
   */
  this.elbowType = ElbowType.None;

  /**
   * The elbow dot size property sets marker size in elbows of connector lines.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.elbowDotSize = 4;


  /**
   * Empty diagram message. This option should tell the user 
   * that the chart is blank when no data is available for rendering.
   * 
   * @type {string}
   */
  this.emptyDiagramMessage = "Diagram is empty.";

  /**
   * The items collection defines the data we render in the diagram.
   * Every item should have a unique `id`. They are used to create relations
   * between the nodes of the graph and render various UI elements associated with nodes.
   * 
   * @type {OrgItemConfig[]}
   */
  this.items = [];

  /**
   * Annotations are visual elements attached to the diagram nodes and designed to spotlight
   * some nodes or relations. They are drawn either in front of the diagram or the background.
   * The annotations don't impact the placement of the nodes, though, with some exceptions.
   * As a result, the control redraws them instantaneously without rendering
   * or recalculating the actual diagram layout. 
   * 
   * @type {Array.<(ShapeAnnotationConfig | BackgroundAnnotationConfig | ConnectorAnnotationConfig | HighlightPathAnnotationConfig)>}
   */
  this.annotations = [];

  /**
   * The cursor item provides a single node selection, navigation, and local zoom in the diagram.
   * The component shows the cursor, neighbors, and selected nodes using templates and folds
   * everything into markers to save space. So clicking and moving the cursor from node to node
   * works as stepping in and expanding nodes in the neighboring diagram area. To select cursor
   * node with keyboard, use arrow keys to change focus selection first in the diagram and press
   * the `Enter` key to set the `cursorItem` to the required node. See the'onCursorChanging` 
   * and `onCursorChanged` events to handle user clicks on nodes. If the cursor item is set to
   * null, then no cursor item is selected in the diagram.
   *  
   * @type {string}
   */
  this.cursorItem = null;

  /**
   * The highlighted item sets focus to some node in the diagram. It is a redundant feature on
   * touch screen devices, so use the `navigationMode` property to disable it.
   * The highlight item can be set programmatically, with mouseover, keyboard arrow keys, or the `Tab` key. 
   * The default visual is a rounded rectangle; use templates to customize the highlight's graphic. 
   * The highlight item setting does not trigger diagram layout or scrolling, so it is near-instant.
   * It is designed to synchronize mouse moves over diagram nodes with other collection controls or UI elements.
   * The component triggers  the `onHighlightChanging` and `onHighlightChanged` events on highlight changes.
   * Set it to `null` to hide the highlight of the diagram.
   * 
   * @type {string}
   */
  this.highlightItem = null;

  /**
   * The highlight gravity radius controls distance to the nearest marker to trigger the highlight setting
   * and callout annotation. For the templated nodes, it is required for the mouse to be inside the node's
   * bounding rectangle to activate the highlight setting. It can be problematic to put the mouse precisely
   * over the marker. The gravity radius helps to overcome that issue, but at the same time, it can be a source
   * of performance if the component gets too many markers within the scope of the gravity radius.
   * Please, keep this in mind and don't make it too big. It is crucial when the diagram has
   * over 5 thousand nodes in the hierarchy.
   * 
   * @type {number}
   */
  this.highlightGravityRadius = 40;

  /**
   * The selected items collection property allows the end-user to choose multiple nodes in the diagram.
   * It is a collection of ids of checked nodes. The selected items impact the diagram layout and navigation
   * process since they are always shown in the expanded templated form. So it also helps users pin nodes while they browse in the diagram.
   * The control notifies about the user changes in this collection with the `onSelectionChanging` and the `onSelectionChanged` events.
   * 
   * @type {string[]}
   */
  this.selectedItems = [];

  /**
  * The selection checkboxes are built-in UI elements managing the `selectedItems` collection property. 
  * `Auto` - visible for cursor item only
  * `True` - visible
  * `False` - hidden
  * 
  * Adding a custom checkbox element to the item template requires its name to be `checkbox`,
  * so the control can use it the same way as the built-in checkbox element.
  * 
  * @type {Enabled}
  */
  this.hasSelectorCheckbox = Enabled.Auto;

  /**
   * The checkbox label. See `hasSelectorCheckbox` and `selectedItems` properties.
   * 
   * @group Templates
   * @type {string}
   */
  this.selectCheckBoxLabel = "Selected";

  /**
   * The selection path mode property makes all parents of the cursor item up to the root node
   * to be shown with templates. It is a complimentary feature to the auto-fit mode of the
   * diagram. See the `pageFitMode` for more details.
   *
   * @group Auto Layout
   * @type {SelectionPathMode}
   */
  this.selectionPathMode = SelectionPathMode.FullStack;

  /**
   * The show frame controls the visibility of decorating frame around the diagram.
   * The frame displays markers for selected nodes in the chart when they are outside
   * the screen and not visible to the end-user.
   * 
   * @group Frame
   * @type {boolean}
   */
  this.showFrame = false;

  /**
   * The frame's inner padding adds extra padding around markers on the inner side of the frame.
   * 
   * @group Frame
   * @type {Thickness}
   */
  this.frameInnerPadding = new Thickness(2, 2, 2, 2);

  /**
   * The frame's outer padding adds extra padding around markers on the outer side of the frame.
   * 
   * @group Frame
   * @type {Thickness}
   */
  this.frameOuterPadding = new Thickness(2, 2, 2, 2);

  /**
   * The diagram padding adds extra padding around the diagram nodes.
   * 
   * @group Frame
   * @type {Thickness}
  */
  this.padding = new Thickness(10, 10, 10, 10);

  /**
   * The templates property is a collection of uniquely named templates objects used
   * to customize nodes' size, interactivity, and visuals for content, cursor, and highlight.
   * By default, the control provides templates for all types of visual elements.
   * So to start experimenting with the Basic Primitives library, you don't need to define any templates.
   * 
   * @group Templates
   * @type {TemplateConfig[]}
   */
  this.templates = [];

  /**
   * The default template name property allows overriding the default template for all nodes
   * without setting the template name individually per node. See the `templates` property for mode details.
   * To customize the template per node, see the `templateName` property of the `OrgItemConfig`.
   * 
   * @group Templates
   * @type {string}
   */
  this.defaultTemplateName = null;

  /**
   * The button visibility is a legacy property. The only reason it is still available on the components API
   * is the lack of consistent support of the mouse transparency across browsers.
   * The buttons panel is placed over all other visuals in the diagram,
   * so they are not obstructed by the connector and shape annotations. 
   * 
   * `Auto` - cursor item only.
   * `True` - visible
   * `False` - hidden
   * 
   * @group Templates
   * @type {Enabled}
   */
  this.hasButtons = Enabled.Auto;

  /**
   * The event property is used to render the content of the buttons panel.
   *
   * @callback
   * @param {EventArgs} data Context information
   */
  this.onButtonsRender = null;

  /**
   * This callback function is called before the `onHighlightChanged` event.
   * See the `highlightItem` property. Use this event to modify diagram elements
   * not affecting diagram layout. For example, on-screen connector annotations
   * added in this event handler to the diagram configuration would be rendered
   * together with highlight. Use properties of this event to stop event propagation 
   * and the following diagram layout and rendering if needed.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information.
   */
  this.onHighlightChanging = null;

  /**
   * The on highlight changed event. See `highlightItem` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onHighlightChanged = null;

  /**
   * This callback function is called before the `onCursorChanged` event. 
   * See the `cursorItem` property. Use properties of this event to stop event propagation 
   * and the following diagram layout and rendering if needed.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onCursorChanging = null;

  /**
   * The on cursor item changed event. See `cursorItem` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onCursorChanged = null;

  /**
   * The on selected items being changed event. See `selectedItems` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onSelectionChanging = null;

  /**
   * The on selected items changed event. See `selectedItems` property.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onSelectionChanged = null;

  /**
   * The on content button click event is a legacy property.
   * To use it, buttons in the buttons panel in the item template should have the `data-buttonname` property set.
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onButtonClick = null;

  /**
   * Mouse click event. 
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onMouseClick = null;

  /**
   * Mouse double click event. 
   *
   * @callback
   * @param {Object} event Mouse event
   * @param {EventArgs} data Context information
   */
  this.onMouseDblClick = null;

  /**
   * The on item render callback function is used to populate the content of templated
   * nodes in the diagram. It is called for user templates only. The callback references
   * the DOM element and the node configuration object. The control reuses existing DOM elements,
   * so the application should update the entire content of the template.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onItemRender = null;

  /**
   * The on highlight render callback function is used to update the highlight visual content having a custom template.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onHighlightRender = null;

  /**
   * The on cursor render callback function is used to update the cursor visual content having a custom template.
   *
   * @callback
   * @param {Object} event Event if available
   * @param {RenderEventArgs} data The context information
   */
  this.onCursorRender = null;

  /**
   * The normal level shift sets spacing between rows of templated nodes.
   * 
   * @group Intervals
   * @type {number}
   */
  this.normalLevelShift = 20;

  /**
   * The dot level shift property sets the spacing between rows of markers.
   * 
   * @group Intervals
   * @type {number}
   */
  this.dotLevelShift = 20;

  /**
   * The lines level shift property sets the spacing between rows
   * having only connection lines. Nodes are hidden completely.
   * 
   * @group Intervals
   * @type {number}
   */
  this.lineLevelShift = 10;

  /**
   * The normal items interval property sets the spacing between templated nodes.
   * 
   * @group Intervals
   * @type {number}
   */
  this.normalItemsInterval = 10;

  /**
   * The dotted items interval property sets the spacing between markers.
   * 
   * @group Intervals
   * @type {number}
   */
  this.dotItemsInterval = 1;

  /**
   * The line items interval property sets the spacing between lines.
   * 
   * @group Intervals
   * @type {number}
   */
  this.lineItemsInterval = 2;

  /**
   * The cousins' interval multiplier property adds extra space between branches of the hierarchy.
   * For example, if the multiplier equals five, nodes of the same parent will have interval 20,
   * and nodes of two different parents will have interval 100.
   * 
   * @group Intervals
   * @type {number}
   */
  this.cousinsIntervalMultiplier = 5;

  /**
   * The first choice title color. The component has two properties for the title color to automatically select
   * the one having the highest contract for the node's background-color
   * 
   * @group Templates
   * @type {string}
   */
  this.itemTitleFirstFontColor = Colors.White;

  /**
   * The second choice title color.
   * 
   * @group Templates
   * @type {string}
   */
  this.itemTitleSecondFontColor = Colors.Navy;

  /**
   * The markers shape type property sets the default marker shape for nodes.
   * It is possible to set it individually for every node or in the item template.
   * By default color of the marker is equal to the `itemTitleColor` property set for individual items. 
   * 
   * @group Templates
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = ShapeType.None;

  /**
   * The color of the relations lines
   * 
   * @group Relation Lines
   * @type {string}
   */
  this.linesColor = Colors.Silver;

  /**
   * The line width of the relations lines
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.linesWidth = 1;

  /**
   * The line style of the relations lines
   * 
   * @group Relation Lines
   * @type {LineType}
   */
  this.linesType = LineType.Solid;

  /**
   * The color of the highlighted relation lines.
   * 
   * @group Relation Lines
   * @type {string}
   */
  this.highlightLinesColor = Colors.Red;

  /**
   * The line width of the highlighted relation lines.
   * 
   * @group Relation Lines
   * @type {number}
   */
  this.highlightLinesWidth = 1;

  /**
   * The line style of the highlighted relation lines.
   * 
   * @group Relation Lines
   * @type {LineType}
   */
  this.highlightLinesType = LineType.Solid;

  /**
   * The show callout property enables on mouse over node callout for the diagram.
   * 
   * @group Callout
   * @type {boolean}
   */
  this.showCallout = true;

  /**
   * The callout maximum visibility property enables callout 
   * for the diagram nodes having specified visibility. See the `pageFitMode` property.
   * 
   * @group Callout
   * @type {Visibility}
   */
  this.calloutMaximumVisibility = Visibility.Dot;

  /**
   * The callout annotation placement offset sets how far the callout rectangle is offset from the marker it is displayed for.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutPlacementOffset = 100;

  /**
   * The callout default template name. Templates are HTML fragments used to render diagram nodes.
   * They are defined with named configuration objects. See the `templates` property for more details.
   * 
   * @group Callout
   * @type {string}
   */
  this.defaultCalloutTemplateName = null;

  /**
   * Callout annotation fill color.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutfillColor = "#000000";

  /**
   * Callout annotation border color.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutBorderColor = null;

  /**
   * Callout annotation border line offset.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutOffset = 4;

  /**
   * Callout annotation corner radius.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutCornerRadius = 4;

  /**
   * Callout annotation pointer width.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutPointerWidth = "10%";

  /**
   * Callout annotation border line width.
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutLineWidth = 1;

  /**
   * Callout annotation opacity
   * 
   * @group Callout
   * @type {number}
   */
  this.calloutOpacity = 0.2;

  /**
   * The align branches property enables cross-branch nodes alignment. In the Organizational Chart layout,
   * the number of rows occupied by the immediate children depends on the number of assistants, advisers,
   * and levels of children of the node. So nodes at the same logical level in the organizational chart
   * hierarchy require visual alignment. As expected, the control aligns regular horizontally placed children
   * across branches of the hierarchy. But it supports the alignment of Assistants, SubAssistants, Advisers,
   * and SubAdvisers hierarchies and child nodes in vertical and matrix formations across departments.
   * The component supports the infinite nesting of children layers and their alignment across hierarchy branches.
   * 
   * @group Auto Layout
   * @type {boolean}
   */
   this.alignBranches = false;


  /**
   * The children's placement type sets default children's layout formation. 
   * The control places children in a horizontal line below the parent node by default.
   * That may result in the end-user having to scroll screens to view many child nodes.
   * So to compensate for this, the component supports placing children in a square/matrix and vertical formation.
   * It reduces sideways screen scrolling by compacting the child nodes into a much smaller area on the screen.
   * See the 'levelOffset' and the 'itemType' on `OrgItemConfig` for more layout options.
   * 
   * @group Auto Layout
   * @type {ChildrenPlacementType}
   */
  this.childrenPlacementType = ChildrenPlacementType.Horizontal;

  /**
   * The leaves placement type property sets default children formation of
   * leave children. See the `childrenPlacementType` for more details.
   * 
   * @group Auto Layout
   * @type {ChildrenPlacementType}
   */
  this.leavesPlacementType = ChildrenPlacementType.Horizontal;

  /**
   * The property sets the default placement of assistants hierarchies
   * relative to the regular children of the node. If the assistant
   * node has its children, control adds extra levels, so the assistant's
   * children are placed above the regular children.
   * 
   * @group Auto Layout
   * @type {boolean}
   */
  this.placeAssistantsAboveChildren = true;

  /**
   * The property sets default placement of advisers hierarchies relative to the regular 
   * children of the node. If the adviser node has its children, then control adds extra levels,
   * so the adviser's children are placed above the regular children.
   * 
   * @group Auto Layout
   * @type {boolean}
   */
  this.placeAdvisersAboveChildren = true;

  /**
   * The maximum number of columns in the matrix formation prevents
   * it from outgrowing screen width and forces it to grow vertically. 
   * 
   * @group Auto Layout
   * @type {number}
   */
  this.maximumColumnsInMatrix = 6;

  /**
   * The size of the button panel
   * 
   * @group Templates
   * @type {number}
   */
  this.buttonsPanelSize = 28;

  /**
   * The size of the group title
   * 
   * @group Group Titles
   * @type {number}
   */
  this.groupTitlePanelSize = 24;

  /**
   * The size of the selection checkbox
   * 
   * @group Templates
   * @type {number}
   */
  this.checkBoxPanelSize = 24;

  /**
   * The group titles placement property sets left to right or right to left alignment
   * for group title and buttons panel relative to the node. 
   * 
   * @group Group Titles
   * @type {AdviserPlacementType}
   */
  this.groupTitlePlacementType = AdviserPlacementType.Left;

  /**
   * Group titles orientation.
   * 
   * @group Group Titles
   * @type {TextOrientationType}
   */
  this.groupTitleOrientation = TextOrientationType.RotateRight;

  /**
   * The group titles vertical alignment property sets text vertical alignment inside the group title panel.
   * 
   * @group Group Titles
   * @type {VerticalAlignmentType}
   */
  this.groupTitleVerticalAlignment = VerticalAlignmentType.Middle;

  /**
   * The group titles horizontal alignment property sets text horizontal alignment inside the group title panel.
   * 
   * @group Group Titles
   * @type {HorizontalAlignmentType}
   */
  this.groupTitleHorizontalAlignment = HorizontalAlignmentType.Center;

  /**
   * Group titles font size.
   * 
   * @group Group Titles
   * @type {number}
   */
  this.groupTitleFontSize = "12px";

  /**
   * Group titles font family.
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleFontFamily = "Arial";

  /**
   * Group titles color.
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleColor = Colors.RoyalBlue;

  /**
   * Group titles font weight: normal, bold
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleFontWeight = "normal";

  /**
   * Group titles font style: normal, italic
   * 
   * @group Group Titles
   * @type {string}
   */
  this.groupTitleFontStyle = "normal";

  /**
    * On group title render event. This callback function renders the group title panel.
    * It overwrites the default group title renderer. It is called only when the group title is visible.
    * See other group title options for details.
    *
    * @group Group Titles
    * @callback
    * @param {EventArgs} data Context information
    */
  this.onGroupTitleRender = null;

  /**
   * The panel size of the level annotation titles
   * 
   * @group Level Titles
   * @type {number}
   */
  this.levelTitlePanelSize = 24;

  /**
   * The panel placement of the level annotation titles
   * 
   * @group Level Titles
   * @type {AdviserPlacementType}
   */
  this.levelTitlePlacementType = AdviserPlacementType.Left;

  /**
   * If this property is true, level titles are placed inside the diagram's viewport above or below diagram nodes.
   * 
   * @group Level Titles
   * @type {boolean}
   */
  this.levelTitlePlaceInside = false;

  /**
   * The level annotation titles orientation.
   * 
   * @group Level Titles
   * @type {TextOrientationType}
   */
  this.levelTitleOrientation = TextOrientationType.Auto;

  /**
   * The level annotation titles vertical alignment.
   * 
   * @group Level Titles
   * @type {VerticalAlignmentType}
   */
  this.levelTitleVerticalAlignment = VerticalAlignmentType.Middle;

  /**
   * The level annotation titles horizontal alignment.
   * 
   * @group Level Titles
   * @type {HorizontalAlignmentType}
   */
  this.levelTitleHorizontalAlignment = HorizontalAlignmentType.Center;

  /**
   * Level titles font size.
   * 
   * @group Level Titles
   * @type {number}
   */
  this.levelTitleFontSize = "12px";

  /**
   * Level titles font family.
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontFamily = "Arial";

  /**
   * Level titles font color.
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontColor = Colors.White;

  /**
   * Level titles color.
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleColor = Colors.RoyalBlue;

  /**
   * Level titles font weight: normal, bold
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontWeight = "normal";

  /**
   * Level titles font style: normal, italic
   * 
   * @group Level Titles
   * @type {string}
   */
  this.levelTitleFontStyle = "normal";

  /**
   * The level title callback function allows rendering custom content in the level annotation title panel.
   * It is called only for the visible level annotations. See other level annotation options for details.
   *
   * @group Level Titles
   * @callback
   * @param {EventArgs} data Context information
   */
   this.onLevelTitleRender = null;

  /**
   * The level background callback function allows rendering custom content in the level annotation background panel.
   * It is called only for the visible level annotations. See other level annotation options for details.
   *
   * @group Level Titles
   * @callback
   * @param {EventArgs} data Context information
   */
   this.onLevelBackgroundRender = null;   

  /**
   * @ignore
   */
  this.distance = 3;

  /**
   * The scale property sets the CSS scale-transform property for the diagram content. 
   * 
   * @type {number}
   */
  this.scale = 1;

  /**
   * Minimum scale
   * 
   * @ignore
   * @type {number}
   */
  this.minimumScale = 0.5;

  /**
   * Maximum scale
   * 
   * @ignore
   * @type {number}
   */
  this.maximumScale = 2;

  /**
   * The show label property sets labels visibility for individual nodes.
   * The control displays label only for node markers. The control does not
   * preserve space for labels in the diagram layout. The application's
   * responsibility is to set intervals between nodes to fit labels.
   * Use controls `dotLevelShift`, `dotItemsInterval` and `padding` properties to preserve
   * space between nodes for labels. Labels are displayed inside `div's of
   * the fixed size, see the `labelSize` property, and the control provides
   * simple conflict resolution to avoid displaying overlapping labels.
   * If two labels overlap with their bounding rectangles,
   * then only one of them will stay visible. 
   * 
   * Auto - avoid labels overlapping, hide some of them
   * True - visible
   * False - hidden.
   * 
   * @group Labels
   * @type {Enabled}
   */
  this.showLabels = Enabled.Auto;

  /**
   * The label size property defines the label's placeholder `div` size,
   * which impacts conflict resolution if labels overlap.
   * 
   * @group Labels
   * @type {Size}
   */
  this.labelSize = new Size(80, 24);

  /**
   * The label offset property sets the distance from the markers bounding rectangles.
   * 
   * @group Labels
   * @type {number}
   */
  this.labelOffset = 1;

  /**
   * Label orientation defines label rotation.
   * 
   * @group Labels
   * @type {TextOrientationType}
   */
  this.labelOrientation = TextOrientationType.Horizontal;

  /**
   * Label placement sets label placement around the marker.
   * 
   * @group Labels
   * @type {PlacementType}
   */
  this.labelPlacement = PlacementType.Top;

  /**
   * Labels font size.
   * 
   * @group Labels
   * @type {string}
   */
  this.labelFontSize = "10px";

  /**
   * Labels font family.
   * 
   * @group Labels
   * @type {string}
   */
  this.labelFontFamily = "Arial";

  /**
   * Labels color
   * 
   * @group Labels
   * @type {string}
   */
  this.labelColor = Colors.Black;

  /**
   * Labels font weight
   * Font weight: normal, bold
   * 
   * @group Labels
   * @type {string}
   */
  this.labelFontWeight = "normal";

  /**
   * Labels font style. Font style: normal, italic
   * 
   * @group Labels
   * @type {string}
   */
  this.labelFontStyle = "normal";

  /**
   * The enable panning property enables chart panning with mouse drag for
   * desktop browsers. Disable it if you need to support items Drag & Drop.
   * 
   * @type {boolean}
   */
  this.enablePanning = true;

  /**
   * Sets minimum size, the diagram can shrink itself in auto size mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accommodate all nodes and render them normally.
   * 
   * @group Auto Layout
   * @type {Size}
   */
  this.autoSizeMinimum = new Size(800, 600);

  /**
   * Sets maximum size, the diagram can expand itself in auto size mode. See `pageFitMode` property.
   * In the auto size mode diagram controls its placeholder size itself,
   * it sets its size to accommodate all nodes and render them normally.
   * 
   * @group Auto Layout
   * @type {Size}
   */
  this.autoSizeMaximum = new Size(1024, 768);
}

/**
 * @class OrgItemConfig
 * @classdesc Organizational chart item configuration object defines properties 
 * of individual nodes in the organizational chart hierarchy. Nodes configurations 
 * populate the `items` collection property of the organizational chart 
 * configuration object used to describe the entire component configuration. 
 * 
 * @param {OrgItemConfig} arg0 Item config properties
 * 
 * @param {string} arg0 Item id
 * @param {string} arg1 Parent id
 * @param {string} arg2 Title
 * @param {string} arg3 Description 
 * @param {string} arg4 Image
 */
function OrgItemConfig(arg0, arg1, arg2, arg3, arg4) {
  var property;
  /**
   * Unique item id
   * 
   * @type {string}
   */
  this.id = null;

  /**
   * Parent item id. If `null`, then the node is the root item of the hierarchy.
   * 
   * @type {string}
   */
  this.parent = null;

  /**
   * Title. It is used in the default template.
   * 
   * @group Template
   * @type {string}
   */
  this.title = null;

  /**
   * Description
   * 
   * @group Template
   * @type {string}
   */
  this.description = null;

  /**
   * Image. It is used in the default template.
   * 
   * @group Template
   * @type {string}
   */
  this.image = null;

  /**
   * Context object
   * 
   * @group Template
   * @type {object}
   */
  this.context = null;

  /**
   * Title background color for default template.
   * When the node is displayed in its minimized form, it also sets the marker color. 
   * 
   * @group Template
   * @type {string}
   */
  this.itemTitleColor = Colors.RoyalBlue;

  /**
   * Marker type. The shape of the marker when the node is minimized in the diagram layout.
   * The component is designed for automatic nodes positioning; it optimizes nodes placement
   * and size depending on the available screen space. When the diagram size is significantly
   * larger than the available screen space, its scrolling and navigation become problematic,
   * so control replaces some nodes with markers. That feature has a lot of options for tuning.
   * 
   * @group Template
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = null;

  /**
   * Group Title. The group title is a panel on the side of the node with rotated text inside.
   * It is one of the control's default easy-to-use features.
   * It gives extra dimension for the visual grouping in the diagram.
   * 
   * @group Group Title
   * @type {string}
   */
  this.groupTitle = null;

  /**
   * The group title background color.
   * 
   * @group Group Title
   * @type {string}
   */
  this.groupTitleColor = Colors.RoyalBlue;

  /**
   * If `false`, it makes the item invisible in the layout. If the item has no visible parents,
   * its connections are hidden as well. From the navigation perspective,
   * children of hidden nodes become children of their parents.
   * 
   * @type {boolean}
   */
  this.isVisible = true;

  /**
   * If it is true, it makes the node inactive in the diagram layout.
   * The inactive item is excluded from navigation, which means it is not clickable,
   * and it is impossible to set the cursor to it. Consider the inactive node as an in-layout
   * label or title having a custom item template. It is worth mentioning that it
   * impacts cursor neighbors selection. The component skips the static node
   * and selects its neighbors instead. 
   * 
   * @type {boolean}
   */
  this.isActive = true;

  /**
   * It controls the visibility of the selection check box for the node.
   * The selection checkbox is a default, easy-to-use feature to add and
   * remove nodes to selected items collection. 
   * 
   * Auto - depends on the control's configuration `hasSelectorCheckbox` property setting.
   * True - visible
   * False - hidden
   * 
   * @type {Enabled}
   */
  this.hasSelectorCheckbox = Enabled.Auto;

  /**
   * It controls the visibility of the context buttons panel for the node. 
   * The context buttons panel is a built-in, easy-to-use feature to add
   * interactive UI elements around the cursor node. On-screen annotations
   * do not block context buttons panel as well. 
   * 
   * Auto - depends on the control's configuration `hasButtons` property setting
   * True - visible
   * False - hidden
   * 
   * @group Template
   * @type {Enabled}
   */
  this.hasButtons = Enabled.Auto;

  /**
   * Item type defines child node placement relative to its parent node. 
   * By default, all children of the same parent node are of the same rank and
   * status are aligned below the parent in a horizontal line. However,
   * for exceptional cases where the end-user wishes to have a child separate
   * from the rest of its siblings, we provide custom child types that
   * the end-user can use to place different ranking nodes anywhere around
   * the parent node. These placement options give a lot of space for creating
   * roles such as an Assistant, Adviser, various Partners,
   * and co-heads in the organization.
   * 
   * @type {ItemType}
   */
  this.itemType = ItemType.Regular;

  /**
   * Level offset organizes some node types, like regular children and assistants, into multiple rows.
   * 
   * @type {number}
   */
  this.levelOffset = null;

  /**
   * Adviser placement type sets node placement relative to the parent item
   * on the left or right side of the parent's hierarchy. If it is set to `Auto`,
   * the control's configuration object property is used.
   *  
   * @type {AdviserPlacementType}
   */
  this.adviserPlacementType = AdviserPlacementType.Auto;

  /**
   * The children's placement type sets children's layout formation.
   * Control places children in a horizontal line below the parent node by default.
   * That may result in the end-user having to scroll screens to view many child nodes.
   * Placing children in a square/matrix formation compensates for this.
   * It reduces sideways screen scrolling by compacting the child nodes
   * into a much smaller area on the screen.
   *   
   * @type {ChildrenPlacementType}
   */
  this.childrenPlacementType = ChildrenPlacementType.Auto;

  /**
   * The property sets the placement of assistants hierarchies
   * relative to the regular children of the node. If the assistant
   * node has its children, control adds extra levels, so the assistant's
   * children are placed above the regular children.
   * 
   * @type {Enabled}
   */
  this.placeAssistantsAboveChildren = Enabled.Auto;

  /**
   * The property sets placement of advisers hierarchies relative to the regular 
   * children of the node. If the adviser node has its children, then control adds extra levels,
   * so the adviser's children are placed above the regular children.
   * 
   * @type {Enabled}
   */
  this.placeAdvisersAboveChildren = Enabled.Auto;

  /**
   * Template name lets individually assign rendering templates per individual
   * node of the diagram. Templates contain settings defining node size,
   * interactivity options, and HTML fragments to render nodes.
   * See the organization chart configuration object for the `templates` property.
   * 
   * @group Template
   * @type {string}
   */
  this.templateName = null;

  /**
   * Show callout property sets callout annotation visibility per individual node.
   * The callout annotation is one of the easy-to-use features of the control.
   * It is displayed for markers to preview the node's content. The content is displayed
   * using the current node template it is rendered for. The callout can be forced
   * to be displayed for templated nodes as well. In that case, use the `calloutTemplateName`
   * property to change the callout template.
   * 
   * Auto - depends on the control's configuration `showCallout` property setting
   * True - always visible
   * False - hidden
   * 
   * @group Callout
   * @type {Enabled}
   */
  this.showCallout = Enabled.Auto;

  /**
   * Callout annotation template name redefined default item template used to display
   * the content of the callout annotation. Templates contain size and HTML fragments
   * to display node content. See the `templates` property of the organizational
   * chart control configuration object.
   * 
   * @group Callout
   * @type {string}
   */
  this.calloutTemplateName = null;

  /**
   * Marker label.
   * 
   * @group Label
   * @type {string}
   */
  this.label = null;

  /**
   * The show label property sets labels visibility for individual nodes.
   * The control displays label only for node markers. The control does not
   * preserve space for labels in the diagram layout. The application's
   * responsibility is to set intervals between nodes to fit labels.
   * Use controls `dotLevelShift`, `dotItemsInterval` properties to preserve
   * space between nodes for labels. Labels are displayed inside `div's of
   * the fixed size, see the `labelSize` property, and the control provides
   * simple conflict resolution to avoid displaying overlapping labels.
   * If two labels overlap each other with their bounding rectangles,
   * then only one of them will stay visible. 
   * 
   * Auto - avoid labels overlapping, hide some of them
   * True - visible
   * False - hidden.
   * 
   * @group Label
   * @type {Enabled}
   */
  this.showLabel = Enabled.Auto;

  /**
   * The label size property defines the label's placeholder `div` size,
   * which impacts conflict resolution if labels overlap. If it is `null`,
   * it uses the `labelSize` property of the control configuration.
   * 
   * @group Label
   * @type {Size}
   */
  this.labelSize = null;

  /**
   * Label orientation defines label rotation. If it is `Auto`,
   * it uses the `labelOrientation` property of the control configuration.
   * 
   * @group Label
   * @type {TextOrientationType}
   */
  this.labelOrientation = TextOrientationType.Auto;

  /**
   * Label placement sets label placement around the marker.
   * If it is `Auto`, it uses the `labelPlacement` of the control configuration.
   * 
   * @group Label
   * @type {PlacementType}
   */
  this.labelPlacement = PlacementType.Auto;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 5:
      this.id = arg0;
      this.parent = arg1;
      this.title = arg2;
      this.description = arg3;
      this.image = arg4;
      break;
  }
}

/**
 * @class EventArgs
 * 
 * Context object
 */
function OrgEventArgs() {
  /**
   * Current item
   * 
   * @type {string}
   */
  this.oldContext = null;

  /**
   * New item
   * 
   * @type {string}
   */
  this.context = null;

  /**
   * Parent item
   * 
   * @type {string}
   * @ignore
   */
  this.parentItem = null;

  /**
   * Node position on the diagram.
   * 
   * @type {Rect}
   */
  this.position = null;

  /**
   * Relative object name.
   * 
   * @type {string}
   */
  this.name = null;

  /**
   * If true cancels subsequent event and layout update.
   * 
   * @type {boolean}
   */
  this.cancel = false;
}

/**
 * @class BackgroundAnnotationConfig
 * @classdesc Background annotation draws a rectangular shape around annotated items.
 * Annotations borders are offset around nodes, so if two annotations overlap, 
 * they are merged into one continuous shape with a single borderline.
 *
 * @param {object} arg0 Object properties.
 */
function BackgroundAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Background;

  /**
   * The `items` Collection contains nodes ids the background annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.items = [];

  /**
   * If this property is true, background annotation includes all descendants of every 
   * item in the `items` collection. It works in {OrgDiagram} only.
   * 
   * @type {boolean}
   */
  this.includeChildren = false;

  /**
   * Sets annotation z-order placement relative to the diagram items.
   * Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes, you block mouse events 
   * of UI elements in nodes templates. Browsers don't support mouse events 
   * transparency consistently yet. So to avoid mouse events blocking UI 
   * elements in node templates, you have to place annotation items under
   * nodes or manipulate z-index for UI interactive controls and make them
   * placed on top of other visual elements. The component puts the buttons panel 
   * on top of everything, so annotations drawn over the diagram nodes are not blocked.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Auto;

  /**
   * Sets background borderline offset around annotated items.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(18, 18, 18, 18);

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Background color opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Border line color
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Fill Color.
   * 
   * @type {string}
   */
  this.fillColor = null;

  /**
   * Border line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
   * @type {boolean}
   */
  this.selectItems = false;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null) {
        if (arg0 instanceof Array) {
          this.items = arg0;
        } else if (typeof arg0 == "object") {
          for (property in arg0) {
            if (arg0.hasOwnProperty(property)) {
              this[property] = arg0[property];
            }
          }
        }
      }
      break;
  }
}

/**
 * @class ConnectorAnnotationConfig
 * @classdesc Connector annotations draw lines between two nodes of the diagram. 
 * They are drawn on top of the existing diagram layout, and they don't impact 
 * nodes placement. So it is the user's responsibility to preserve space between nodes for them. 
 *
 * @param {object} arg0 Object properties.
 */
function ConnectorAnnotationConfig(arg0, arg1) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Connector;

  /**
   * Sets annotation z-order placement relative to the diagram items.
   * Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes, you block mouse events 
   * of UI elements in nodes templates. Browsers don't support mouse events 
   * transparency consistently yet. So to avoid mouse events blocking UI 
   * elements in node templates, you have to place annotation items under
   * nodes or manipulate z-index for UI interactive controls and make them
   * placed on top of other visual elements. The component puts the buttons panel 
   * on top of everything, so annotations drawn over the diagram nodes are not blocked.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Foreground;

  /**
   * The start node of the connection line
   * 
   * @type {string}
   */
  this.fromItem = null;

  /**
   * The end node of the connection line
   * 
   * @type {string}
   */
  this.toItem = null;

  /**
   * Connector shape type defines the number of lines and arrows at their ends
   * drawn between nodes of the connector annotation. This feature, combined 
   * with conflict resolution, places overlapping annotations in parallel.
   * It gives you complete flexibility over variations of possible connector
   * lines between two given diagram nodes.
   * 
   * @type {ConnectorShapeType}
   */
  this.connectorShapeType = ConnectorShapeType.OneWay;

  /**
   * The connector placement type defines how the component traces the connector
   * line over the diagram nodes. The `Straight` is a direct line connecting two
   * nodes. The`Offbeat` style is designed to dynamically tune connector line
   * placement depending on the relative position of nodes and the gap between them.
   * It uses free-hand line style drawing going from start to the end node.
   * Since every diagram is packed with various connection lines, this annotation
   * placement style is deliberately made not straight so that it can be
   * noticeable on top of other diagram lines.
   * 
   * @type {ConnectorPlacementType}
   */
  this.connectorPlacementType = ConnectorPlacementType.Offbeat;

  /**
   * Label placement relative to connector annotation. Connector annotation is
   * bound and drawn between two nodes defined by the `fromItem` and the `toItem`
   * properties. The component places the label along the connector line close
   * to the start, the end nodes, or between them. 
   * 
   * @type {ConnectorLabelPlacementType}
   */
  this.labelPlacementType = ConnectorLabelPlacementType.Between;

  /**
   * Connection lines start from the margin of the node's rectangle. If the offset is positive,
   * the connection line has a gap between its endpoints and the node's rectangles.
   * If it is negative, the connection line overlaps the node's rectangle and starts from inside them.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(0, 0, 0, 0);

  /**
   * Border line width.
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Color
   * 
   * @type {string}
   */
  this.color = Colors.Black;

  /**
   * Line pattern
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
   * 
   * @type {boolean}
   */
  this.selectItems = true;

  /**
   * Label. Label styled with "bp-connector-label" css class.
   * 
   * @type {string}
   */
  this.label = null;

  /**
   * Label size
   * 
   * @type {Size}
   */
  this.labelSize = new Size(60, 30);

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 2:
      this.fromItem = arg0;
      this.toItem = arg1;
      break;
  }
}

/**
 * @class HighlightPathAnnotationConfig
 * @classdesc  Highlight path annotation renders the route between the 
 * given sequence of nodes over existing connector lines in the diagram.
 *
 * @param {object} arg0 Object properties.
 */
function HighlightPathAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.HighlightPath;

  /**
   * Sets annotation z-order placement relative to the diagram items.
   * Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes, you block mouse events 
   * of UI elements in nodes templates. Browsers don't support mouse events 
   * transparency consistently yet. So to avoid mouse events blocking UI 
   * elements in node templates, you have to place annotation items under
   * nodes or manipulate z-index for UI interactive controls and make them
   * placed on top of other visual elements. The component puts the buttons panel 
   * on top of everything, so annotations drawn over the diagram nodes are not blocked.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Foreground;

  /**
   * Collection of nodes ids this path is drawn for. Please, pay attention 
   * that this is the array of nodes ids. So if the diagram finds the wrong
   * way from start to end nodes, you can sequence the route yourself.
   * 
   * @type {string[]}
   */
  this.items = [];

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Line color
   * 
   * @type {string}
   */
  this.color = Colors.Red;

  /**
   * Line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * Opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * If true, then annotation has arrows along the route.
   * 
   * @type {boolean}
   */
  this.showArrows = true;

  /**
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
   * 
   * @type {boolean}
   */
  this.selectItems = false;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null) {
        if (arg0 instanceof Array) {
          this.items = arg0;
        } else if (typeof arg0 == "object") {
          for (property in arg0) {
            if (arg0.hasOwnProperty(property)) {
              this[property] = arg0[property];
            }
          }
        }
      }
      break;
  }
}

/**
 * @class LabelAnnotationConfig
 * @classdesc In-layout label annotations are placed between nodes,
 * impacting diagram layout and node placement. Label annotations are
 * designed for auto-placement and bundling connection lines between nodes when needed.
 *
 * @param {object} arg0 Object properties.
 */
function LabelAnnotationConfig(arg0, arg1) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Label;

  /**
   * This is the item id you are creating annotation for.
   * 
   * @type {string}
   */
  this.fromItem = null;

  /**
   * The collection of destination nodes should have only child or parent 
   * items of the annotated item simultaneously. It cannot include children 
   * and parents at the same time. Suppose the annotated item has several
   * label annotations for different sub-sets of children. In that case,
   * annotations form into cascades of labels over connection lines in the diagram.
   * 
   * @type {string[]}
   */
  this.toItems = [];

  /**
   * The label of the annotation. It is styled with `bp-connector-label` CSS class name.
   * 
   * @type {string}
   */
  this.title = null;

  /**
   * Background color.
   * 
   * @type {string}
   */
  this.itemTitleColor = Colors.RoyalBlue;

  /**
   * Item template name. See items templates collection for more details.
   * 
   * @type {string}
   */
  this.templateName = null;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 2:
      this.fromItem = arg0;
      this.toItem = arg1;
      break;
  }
}

/**
 * @class PaletteItemConfig
 * @classdesc Palette Item configuration object defines cross-family 
 * connections lines styles. Multi-parent diagrams may have a lot of
 * parallel lines, so to make their visual tracing easier, the component
 * supports multiple line styles and evenly distributes them. It is a similar
 * approach as for visualization of regular line charts. If we have numerous
 * lines in the chart area, it makes sense to style every line individually.
 * 
 * @param {PaletteItemConfig} arg0 Palette properties object.
 * 
 * @param {string} arg0 Line color
 * @param {number} arg1 Line width
 * @param {LineType} arg2 Line type
 */
function PaletteItemConfig(arg0, arg1, arg2) {
  var property;

  /**
   * Line color
   * 
   * @type {string}
   */
  this.lineColor = Colors.Silver;

  /**
   * Line width
   * 
   * @type {number}
   */
  this.lineWidth = 1;

  /**
   * Line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  switch (arguments.length) {
    case 1:
      for (property in arg0) {
        if (arg0.hasOwnProperty(property)) {
          this[property] = arg0[property];
        }
      }
      break;
    case 3:
      this.lineColor = arg0;
      this.lineWidth = arg1;
      this.lineType = arg2;
      break;
  }
}

/**
 * @class ShapeAnnotationConfig
 * @classdesc  Shape annotation draws geometrical shapes over nodes
 * of the diagram. Consider them as free-hand figures drawn over nodes with a highlighter.
 *
 * @param {object} arg0 Object properties.
 */
function ShapeAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Shape;

  /**
   * Sets annotation z-order placement relative to the diagram items.
   * Diagram visual elements are drawn in layers on top of each other.
   * If you place annotations over diagram nodes, you block mouse events 
   * of UI elements in nodes templates. Browsers don't support mouse events 
   * transparency consistently yet. So to avoid mouse events blocking UI 
   * elements in node templates, you have to place annotation items under
   * nodes or manipulate z-index for UI interactive controls and make them
   * placed on top of other visual elements. The component puts the buttons panel 
   * on top of everything, so annotations drawn over the diagram nodes are not blocked.
   * 
   * @type {ZOrderType}
   */
  this.zOrderType = ZOrderType.Auto;

  /**
   * Collection of nodes ids this shape annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.items = [];

  /**
   * Shape
   * 
   * @type {ShapeType}
   */
  this.shapeType = ShapeType.Rectangle;

  /**
   * Shape offset around annotated items.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(0, 0, 0, 0);

  /**
   * Border line width
   * 
   * @type {number}
   */
  this.lineWidth = 2;

  /**
   * Adds rounded corners for applicable shapes. Radius is defined in percents or pixels.
   * 
   * @type {string|number}
   */
  this.cornerRadius = "10%";

  /**
   * Background color opacity
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Shape border line color
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Shape fill color
   * 
   * @type {string}
   */
  this.fillColor = null;

  /**
   * Border line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  /**
   * If true, annotated nodes are shown in their expanded form using item 
   * templates regardless of controls autofit mode and available screen space.
   * 
   * @type {boolean}
   */
  this.selectItems = false;

  /**
   * Annotation label, it is styled with 'bp-connector-label' CSS class
   * 
   * @type {string}
   */
  this.label = null;

  /**
   * Label size
   * 
   * @type {Size}
   */
  this.labelSize = new Size(60, 30);

  /**
   * Label placement around the annotation.
   * 
   * @type {PlacementType}
   */
  this.labelPlacement = PlacementType.Auto;

  /**
   * Label offset in pixels.
   * 
   * @type {number}
   */
  this.labelOffset = 4;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null) {
        if (arg0 instanceof Array) {
          this.items = arg0;
        } else if (typeof arg0 == "object") {
          for (property in arg0) {
            if (arg0.hasOwnProperty(property)) {
              this[property] = arg0[property];
            }
          }
        }
      }
      break;
  }
}

/**
 * @class LevelAnnotationConfig
 * @classdesc Level annotation highlights the same level nodes of the diagram via
 * drawing continuous rectangular shapes from side to side and the optional title
 * on the side of the diagram view area. Title placement can be inside or outside
 * of the diagram. The inside placement does not occupy diagram space and
 * is rendered in the background. 
 *
 * @param {object} arg0 Object properties.
 */
function LevelAnnotationConfig(arg0) {
  var property;

  /**
   * Annotation type property explicitly defines annotation object type when 
   * it is defined as a JSON object. The `annotations` collection contains 
   * a mixture of all kinds of control annotations.
   * 
   * @type {AnnotationType}
   */
  this.annotationType = AnnotationType.Level;

  /**
   * Collection of levels this level annotation is drawn for.
   * 
   * @type {string[]}
   */
  this.levels = [];

  /**
   * Title.
   * 
   * @type {string}
   */
  this.title = null;

  /**
   * Title font color.
   * 
   * @type {string}
   */
  this.titleFontColor = null;

  /**
   * The title background color.
   * 
   * @type {string}
   */
  this.titleColor = null;

  /**
   * Background offset relative to its default position.
   * 
   * @type {Thickness}
   */
  this.offset = new Thickness(0, 0, 0, 0);

  /**
   * The background border line width. Use {Thickness} to set border width individually per side.
   * 
   * @type {Thickness}
   */
  this.lineWidth = new Thickness(0, 0, 0, 0);

  /**
   * Background color opacity.
   * 
   * @type {number}
   */
  this.opacity = 1;

  /**
   * Background border line color
   * 
   * @type {string}
   */
  this.borderColor = null;

  /**
   * Background fill Color.
   * 
   * @type {string}
   */
  this.fillColor = "#D4D4D4";

  /**
   * Background border line type
   * 
   * @type {LineType}
   */
  this.lineType = LineType.Solid;

  switch (arguments.length) {
    case 1:
      if (arg0 !== null) {
        if (arg0 instanceof Array) {
          this.items = arg0;
        } else if (typeof arg0 == "object") {
          for (property in arg0) {
            if (arg0.hasOwnProperty(property)) {
              this[property] = arg0[property];
            }
          }
        }
      }
      break;
  }
}

/**
 * @class TemplateConfig
 * @classdesc Template configuration object defines DOM elements for node content, cursor, 
 * and mouseover highlight visual representation. If one of them is not set, then the
 * component uses an internal default template. We separate template creation and
 * rendering functions for security reasons. It is not needed in modern frameworks anymore.
 */
function TemplateConfig() {
  /**
   * A unique template name is used to reference templates from items
   * and other diagram components. The 'onItemRender' callback passes the template name as an argument.
   * 
   * @type {string}
   */
  this.name = null;

  /**
   * If it is true, it makes templated items inactive in the diagram layout.
   * Inactive items are regular items excluded from navigation, which means they
   * are not clickable, and it is impossible to set the cursor to them. Consider
   * the inactive nodes as in-layout labels or titles having a custom item template.
   * It is worth mentioning that they impact neighbors of cursor item selection.
   * The component skips them and selects neighbors of inactive nodes. 
   * 
   * @type {boolean}
   */
  this.isActive = true;

  /**
   * Size. Control deals with the fixed-size layout. It makes no guesses about
   * the content of nodes. So we don't support in any form nodes auto-sizing;
   * otherwise, the component should measure the content of every node before
   * the rendering cycle. Considering that the visibility of nodes depends on
   * available space, it will be an infinite loop of diagram layout, and nodes
   * measure iterations. The more room we provide to nodes, the fewer diagram nodes
   * are visible. So control expects that node size is hard valued in the
   * template configuration.
   * 
   * @type {Size}
   */
  this.itemSize = new Size(120, 100);

  /**
   * Border width. We use the archaic method to layout cursor and highlight
   * frames around nodes, so we need to know border width to measure gaps between them correctly.
   * 
   * @type {number}
   */
  this.itemBorderWidth = 1;

  /**
   * Item template. The control provides two ways to define item templates.
   * The first one sets HTML elements content via innerHTML DOM element property.
   * See the following reference at https://developer.mozilla.org website for more details.
   * The second uses JSON ML library for templates definition.
   * See http://www.jsonml.org/ for more details. That is only 3d party MIT licensed
   * code included in our codebase; everything else is 100% authentic.
   * We included it with minor modifications. 
   * 
   * The control calls the 'onItemRender' callback function to populate the template's content for a specific node. 
   * 
   * @type {string|object}
   */
  this.itemTemplate = null;

  /**
   * The markers shape type property sets the default marker shape for nodes.
   * It is possible to set it individually for every node or in the item template.
   * By default color of the marker is equal to the `itemTitleColor` property set for individual items.
   * 
   * @type {ShapeType}
   */
  this.minimizedItemShapeType = null;

  /**
   * Marker size.
   * 
   * @type {Size}
   */
  this.minimizedItemSize = new Size(4, 4);

  /**
   * Marker corner radius. It applies to simple square shapes only. If it is null,
   * then squire markers are displayed as cycles. Squares have no rounded corners if the corner radius is set to 0.
   * 
   * @type {number}
   */
  this.minimizedItemCornerRadius = null;

  /**
   * Marker border line width
   * 
   * @type {number}
   */
  this.minimizedItemLineWidth = 1;

  /**
   * Marker border line color. It equals the `itemTitleColor` of the rendered node by default.
   * 
   * @type {string}
   */
  this.minimizedItemBorderColor = null;

  /**
   * Marker border line pattern
   *
   * @type {LineType}
  */
  this.minimizedItemLineType = LineType.Solid;

  /**
   * Marker fill color. It equals to `itemTitleColor` of the rendered node by default.
   * 
   * @type {string}
   */
  this.minimizedItemFillColor = null;

  /**
   * Marker fill color opacity
   * 
   * @type {number}
   */
  this.minimizedItemOpacity = 1;

  /**
   * Highlight frame offset
   * 
   * @type {Thickness}
   */
  this.highlightPadding = new Thickness(2, 2, 2, 2);

  /**
   * Highlight frame border width
   * 
   * @type {number}
   */
  this.highlightBorderWidth = 1;

  /**
   * Highlight Template. See item template for details.
   * 
   * The control calls the 'onHighlightRender' callback function to populate the highlight template content for a specific node. 
   * 
   * @type {string|object}
   */
  this.highlightTemplate = null;

  /**
   * Cursor frame offset from node
   * 
   * @type {Thickness}
   */
  this.cursorPadding = new Thickness(3, 3, 3, 3);

  /**
   * Cursor frame border width
   * 
   * @type {number}
   */
  this.cursorBorderWidth = 2;

  /**
   * Cursor Template. See item template for details.
   * 
   * The control calls the 'onCursorRender' callback function to populate the cursor template content for a specific node.
   * 
   * @type {string|object}
   */
  this.cursorTemplate = null;

  /**
   * Sets buttons panel visibility.
   * 
   * `Auto` - depends on the controls config `hasButtons` property setting.
   * `True` - visible
   * `False` - hidden
   * 
   * @group Templates
   * @type {boolean}
   */
  this.hasButtons = Enabled.Auto;

  /**
   * On buttons render callback function. This function is called to render context of buttons panel. 
   *
   * @callback
   * @param {EventArgs} data Context information
   */
  this.onButtonsRender = null;
}

/* jshint latedef: true, unused: false */
function AnnotationLabelTemplate() {
  var _template = ["div",
    {
      "type": "checkbox",
      "name": "checkbox",
      "class": ["bp-item", "bp-corner-all", "bp-connector-label"]
    }
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultAnnotationLabelTemplate";
  }

  function render(event, data) {
    var annotationConfig = data.context;
    if (Array.isArray(annotationConfig.label)) {
      data.element.innerHTML = "";
      data.element.appendChild(JsonML$1.toHTML(annotationConfig.label));
    } else {
      data.element.innerHTML = annotationConfig.label;
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function ButtonsTemplate(options) {
  var _template = ["div", {
      "style": {
        position: "absolute"
      }
    }
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultButtonsTemplate";
  }

  function render(event, data) {
    var onButtonsRender = data.onButtonsRender;
    if(onButtonsRender != null) {
      onButtonsRender(data);
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function CustomRenderTemplate(options, onRender) {
  var _template = ["div", {
      "style": {
        position: "absolute"
      }
    }
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "customRenderTemplate";
  }

  function render(event, data) {
    if(onRender != null) {
      onRender(data);
    }
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function CheckBoxTemplate(selectCheckBoxLabel) {
  var _template = ["div",
    ["label",
      ["nobr",
        ["input",
          {
            "type": "checkbox",
            "name": "checkbox",
            "class": "bp-selectioncheckbox"
          }
        ],
        '\xa0',
        ["span",
          {
            "name": "selectiontext",
            "class": "bp-selectiontext"
          },
          selectCheckBoxLabel
        ]
      ]
    ]
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultCheckBoxTemplate";
  }

  function render(event, data) {
    var checkBox = data.element.firstChild.firstChild.firstChild;
    checkBox.checked = data.isSelected;
    checkBox.setAttribute("data-id", data.id);
    var label = data.element.firstChild.firstChild.childNodes[2];
    label.setAttribute("data-id", data.id);
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function CursorTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    return ["div",
      {
        "style": {
          width: (config.itemSize.width + config.cursorPadding.left + config.cursorPadding.right) + "px",
          height: (config.itemSize.height + config.cursorPadding.top + config.cursorPadding.bottom) + "px",
          "borderWidth": config.cursorBorderWidth + "px"
        },
        "class": ["bp-item", "bp-corner-all", "bp-cursor-frame"]
      }
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultCursorTemplate";
  }

  function render(event, data) {

  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function DotHighlightTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    var radius = config.minimizedItemCornerRadius;
    if (radius == null) {
      radius = Math.max(
        config.highlightPadding.left + config.minimizedItemSize.width + config.highlightPadding.right,
        config.highlightPadding.top + config.minimizedItemSize.height + config.highlightPadding.bottom
      ) + config.highlightBorderWidth;
    }
    return ["div",
      {
        "style": {
          "borderWidth": config.highlightBorderWidth + "px",
          "MozBorderRadius": radius + "px",
          "WebkitBorderRadius": radius + "px",
          "-khtml-border-radius": radius + "px",
          "borderRadius": radius + "px"
        },
        "class": ["bp-item", "bp-highlight-dot-frame"]
      }
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultDotHighlightTemplate";
  }

  function render(event, data) {

  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function getTextAlign(alignment) {
  var result = null;
  switch (alignment) {
    case HorizontalAlignmentType.Center:
      result = "center";
      break;
    case HorizontalAlignmentType.Left:
      result = "left";
      break;
    case HorizontalAlignmentType.Right:
      result = "right";
      break;
  }
  return result;
}

function getVerticalAlignment(alignment) {
  var result = null;
  switch (alignment) {
    case VerticalAlignmentType.Middle:
      result = "middle";
      break;
    case VerticalAlignmentType.Top:
      result = "top";
      break;
    case VerticalAlignmentType.Bottom:
      result = "bottom";
      break;
  }
  return result;
}

function getBorderStyle(lineType) {
  var result = null;
  switch (lineType) {
    case LineType.Solid:
      result = "solid";
      break;
    case LineType.Dotted:
      result = "dotted";
      break;
    case LineType.Dashed:
      result = "dashed";
      break;
  }
  return result;
}

function getRotatedText({orientation, textOrientation, horizontalAlignment, verticalAlignment, fontSize, fontFamily, fontWeight, fontStyle, label}) {
    var rotation = "",
      element;

    switch (textOrientation) {
      case TextOrientationType.Horizontal:
        break;
      case TextOrientationType.RotateLeft:
        rotation = "rotate(-90deg)";
        break;
      case TextOrientationType.RotateRight:
        rotation = "rotate(90deg)";
        break;
      case TextOrientationType.Auto:
        switch (orientation) {
          case OrientationType.Top:
            rotation = "rotate(90deg)";
            break;
          case OrientationType.Bottom:
            rotation = "rotate(90deg)";
            break;
          case OrientationType.Left:
          case OrientationType.Right:
            break;
        }
        break;
    }

    var style = {
      "fontSize": fontSize,
      "fontFamily": fontFamily,
      "fontWeight": fontWeight,
      "fontStyle": fontStyle,
      "position": "absolute",
      "padding": 0,
      "margin": 0,
      "textAlign": getTextAlign(horizontalAlignment),
      "lineHeight": 1,
      "-webkit-transform-origin": "center center",
      "-moz-transform-origin": "center center",
      "-o-transform-origin": "center center",
      "-ms-transform-origin": "center center",
      "-webkit-transform": rotation,
      "-moz-transform": rotation,
      "-o-transform": rotation,
      "-ms-transform": rotation,
      "transform": rotation,
      "textOverflow": "ellipsis",
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "tableLayout": "fixed"
    };

    switch (verticalAlignment) {
      case VerticalAlignmentType.Top:
        element = ["div",
          {
            "style": style
          },
          label
        ];
        break;
      default:
        style.borderCollapse = "collapse";

        element = ["table",
          {
            "style": style
          },
          ["tbody",
            ["tr",
              ["td",
                {
                  "style": {
                    "verticalAlign": getVerticalAlignment(verticalAlignment),
                    "padding": 0,
                    "textOverflow": "ellipsis",
                    "whiteSpace": "nowrap",
                    "overflow": "hidden"
                  }
                },
                label
              ]
            ]
          ]
        ];
        break;
    }

    return element;
  }

function updateRotatedText({element, orientation, textOrientation, verticalAlignment, width, height, label, fontColor }) {
    var style = {},
      isVertical = false;

    switch (textOrientation) {
      case TextOrientationType.RotateLeft:
      case TextOrientationType.RotateRight:
        isVertical = true;
        break;
      case TextOrientationType.Auto:
        switch (orientation) {
          case OrientationType.Top:
          case OrientationType.Bottom:
            isVertical = true;
            break;
        }
        break;
    }

    var textRect;
    if(isVertical) {
      textRect = new Rect(Math.round(width / 2.0 - height / 2.0), Math.round(height / 2.0 - width / 2.0), height, width);
    } else {
      textRect = new Rect(0, 0, width, height);
    }
    style = textRect.getCSS();
    style.maxWidth = style.width;
    style.maxHeight = style.height;

    var container = element.firstChild;
    JsonML$1.applyStyles(container, style);

    var title;
    switch (verticalAlignment) {
      case VerticalAlignmentType.Top:
        title = element.firstChild;
        break;
      default:
        title = element.firstChild.firstChild.firstChild.firstChild;
        title.style.borderCollapse = "collapse";
        break;
    }
    title.style.color = fontColor;
    title.textContent = label || "";
  }

function GroupTitleTemplate(options) {
  var {groupTitleFontSize: fontSize, 
    groupTitleFontFamily: fontFamily,
    groupTitleFontWeight: fontWeight,
    groupTitleFontStyle: fontStyle,
    groupTitleColor,
    itemTitleFirstFontColor,
    itemTitleSecondFontColor,
    groupTitleOrientation: textOrientation,
    groupTitleHorizontalAlignment: horizontalAlignment,
    groupTitleVerticalAlignment: verticalAlignment
  } = options;

  var _template = create();

  function create() {
    return ["div",
      {
        "style": {
          "fontSize": fontSize,
          "fontFamily": fontFamily,
          "fontWeight": fontWeight,
          "fontStyle": fontStyle
        },
        "class": ["bp-item", "bp-corner-all", "bp-grouptitle-frame"]
      },
      getRotatedText({orientation: OrientationType.Horizontal, textOrientation, horizontalAlignment, verticalAlignment, fontSize, fontFamily, fontWeight, fontStyle})
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultGroupTitleTemplate";
  }

  function render(event, data) {
    var { element, context: itemConfig, width, height } = data,
      label = itemConfig.groupTitle,
      backgroundColor = itemConfig.groupTitleColor || groupTitleColor,
      fontColor = highestContrast(backgroundColor, itemTitleSecondFontColor, itemTitleFirstFontColor);
    
    updateRotatedText({element, orientation: OrientationType.Horizontal, textOrientation, verticalAlignment, width, height, label, fontColor });

    JsonML$1.applyStyles(data.element, {
      "backgroundColor": backgroundColor
    });
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function HighlightTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    return ["div",
      {
        "style": {
          "borderWidth": config.highlightBorderWidth + "px"
        },
        "class": ["bp-item", "bp-corner-all", "bp-highlight-frame"]
      }
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultHighlightTemplate";
  }

  function render(event, data) {

  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function ItemTemplate(options, itemTemplateConfig) {
  var _template = create(itemTemplateConfig);

  function create(config) {
    var contentSize = new Size(config.itemSize),
      itemTemplate;

    contentSize.width -= config.itemBorderWidth * 2;
    contentSize.height -= config.itemBorderWidth * 2;

    itemTemplate = ["div",
      {
        "style": {
          "borderWidth": config.itemBorderWidth + "px"
        },
        "class": ["bp-item", "bp-corner-all", "bt-item-frame"]
      },
      ["div",
        {
          "name": "titleBackground",
          "style": {
            top: "2px",
            left: "2px",
            width: (contentSize.width - 4) + "px",
            height: "18px"
          },
          "class": ["bp-item", "bp-corner-all", "bp-title-frame"]
        },
        ["div",
          {
            "name": "title",
            "style": {
              top: "1px",
              left: "4px",
              width: (contentSize.width - 4 - 4 * 2) + "px",
              height: "16px"
            },
            "class": ["bp-item", "bp-title"]
          }
        ]
      ],
      ["div", // photo border
        {
          "name": "photoBorder",
          "style": {
            top: "24px",
            left: "2px",
            width: "50px",
            height: "60px"
          },
          "class": ["bp-item", "bp-photo-frame"]
        },
        ["img", // photo
          {
            "name": "photo",
            "alt": "",
            "style": {
              width: "50px",
              height: "60px"
            }
          }
        ]
      ],
      ["div",
        {
          "name": "description",
          "style": {
            top: "24px",
            left: "56px",
            width: (contentSize.width - 4 - 56) + "px",
            height: "74px"
          },
          "class": ["bp-item", "bp-description"]
        }

      ]
    ];

    return itemTemplate;
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultItemTemplate";
  }

  function render(event, data) {
    var itemConfig = data.context,
      itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : Colors.RoyalBlue,
      color = highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor),
      element = data.element,
      titleBackground = element.firstChild,
      photo = element.childNodes[1].firstChild,
      title = titleBackground.firstChild,
      description = element.childNodes[2];

    JsonML$1.applyStyles(titleBackground, {
      "backgroundColor": itemTitleColor
    });
    photo.src = itemConfig.image;
    photo.alt = itemConfig.title;
    JsonML$1.applyStyles(title, {
      "color": color
    });
    title.textContent = itemConfig.title;
    description.textContent = itemConfig.description;
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function UserTemplate(options, content, onRender) {
  var _hashCode = getHashCode(JSON.stringify(content));

  function template() {
    return content;
  }

  function getHashCode$1() {
    return _hashCode;
  }

  function render(event, data) {
    if (onRender != null) {
      onRender(event, data);
    } else {
      var itemConfig = data.context,
        itemTitleColor = itemConfig.itemTitleColor != null ? itemConfig.itemTitleColor : Colors.RoyalBlue,
        color = highestContrast(itemTitleColor, options.itemTitleSecondFontColor, options.itemTitleFirstFontColor);

      getElementsByName(this, data.element, "photo", function (node) {
        node.src = itemConfig.image;
        node.alt = itemConfig.title;
      });

      getElementsByName(this, data.element, "titleBackground", function (node) {
        JsonML$1.applyStyles(node, {
          "background": itemTitleColor
        });
      });

      getElementsByName(this, data.element, "title", function (node) {
        JsonML$1.applyStyles(node, {
          "color": color
        });
        node.textContent = itemConfig.title;
      });

      getElementsByName(this, data.element, "description", function (node) {
        node.textContent = itemConfig.description;
      });
    }
  }

  return {
    template: template,
    getHashCode: getHashCode$1,
    render: render
  };
}

function LabelAnnotationTemplate() {
  var _template = ["div",
    {
      "class": ["bp-item", "bp-label-annotation"]
    }
  ];

  function template() {
    return _template;
  }

  function getHashCode() {
    return "defaultLabelAnnotationTemplate";
  }

  function render(event, data) {
    var itemConfig = data.context;
    data.element.innerHTML = itemConfig.title;
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

function LevelTitleTemplate(options, orientation) {
  var {levelTitleFontSize: fontSize, 
    levelTitleFontFamily: fontFamily,
    levelTitleFontWeight: fontWeight,
    levelTitleFontStyle: fontStyle,
    levelTitleFontColor,
    levelTitleOrientation: textOrientation,
    levelTitleHorizontalAlignment: horizontalAlignment,
    levelTitleVerticalAlignment: verticalAlignment,
    levelTitleColor    
  } = options;

  var _template = create();
  var _hashCode = getHashCode(JSON.stringify(_template));
  
  function create() {
    return ["div",
      {
        "style": {
          "fontSize": fontSize,
          "fontFamily": fontFamily,
          "fontWeight": fontWeight,
          "fontStyle": fontStyle
        },
        "class": ["bp-item", "bp-corner-all"]
      },
      getRotatedText({orientation, textOrientation, horizontalAlignment, verticalAlignment, fontSize, fontFamily, fontWeight, fontStyle})
    ];
  }

  function template() {
    return _template;
  }

  function getHashCode$1() {
    return _hashCode;
  }

  function render(event, data) {
    var config = data.context,
      { element, width, height } = data,
      titleColor = config.titleColor || levelTitleColor,
      label = config.title,
      fontColor = config.titleFontColor || levelTitleFontColor;

    updateRotatedText({element, orientation, textOrientation, width, height, label, fontColor });

    JsonML$1.applyStyles(data.element, {
      "backgroundColor": titleColor
    });
  }

  return {
    template: template,
    getHashCode: getHashCode$1,
    render: render
  };
}

function LevelBackgroundTemplate(options, levelAnnotationConfig) {
  var _template = create();

  function create(config) {
    return ["div"];
  }

  function template() {
    return _template;
  }

  function getHashCode() {
    return "levelAnnotationBackgroundTemplate";
  }

  function render(event, data) {
    var annotationConfig = data.context;
    var style = {
      opacity: annotationConfig.opacity,
      borderColor: annotationConfig.borderColor,
      backgroundColor: annotationConfig.fillColor,
      borderWidth: annotationConfig.lineWidth.toString(),
      borderStyle: getBorderStyle(annotationConfig.lineType)
    };
    var container = data.element;
    JsonML$1.applyStyles(container, style);
  }

  return {
    template: template,
    getHashCode: getHashCode,
    render: render
  };
}

/**
  * Family node
  * @class FamilyNode
  * @property {string} id Id
  * @property {object} node Node
  */
   function FamilyNode(id, node) {
    this.id = id;
    this.node = node;
  }

/**
 * Creates a family object
 * 
 * @class Family
 * 
 * @param {Family} [source=undefined] Reference to optional family object to clone properties from
 * 
 * @returns {Family} Returns new instance of family structure
 */
function Family(source) {
  var _roots = {},     // children hash of orphant parent id
    _rootsCount = {},
    _children = {},  // children hash by node id
    _childrenCount = {},
    _parents = {},   // parents hash by node id
    _parentsCount = {},
    _nodes = {},     // nodes by node id
    /** @constant
      @type {number}
      @default
    */
    BREAK = 1,
    /** @constant
      @type {number}
      @default
    */
    SKIP = 2;

  _init(source);

  function _init(source) {
    if (isObject(source)) {
      _roots = cloneObject(source.roots, false);
      _rootsCount = cloneObject(source.rootsCount, true);
      _children = cloneObject(source.children, false);
      _childrenCount = cloneObject(source.childrenCount, true);
      _parents = cloneObject(source.parents, false);
      _parentsCount = cloneObject(source.parentsCount, true);
      _nodes = cloneObject(source.nodes, true);
    }
  }

  function _loop(thisArg, collection, itemid, onItem) {
    var item, items;
    if (onItem != null) {
      items = collection[itemid];
      if (items != null) {
        for (item in items) {
          if (items.hasOwnProperty(item)) {
            if (onItem.call(thisArg, item, items[item])) {
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Adds new family member
   * @param {string[]} parents A collection of parents ids
   * @param {string} nodeid An id of the new node
   * @param {object} node A reference to the new node
   */
  function add(parents, nodeid, node) {
    var index, len,
      parentid,
      processed = {};

    if (!parents || parents.length === 0) {
      parents = [null];
    }

    if (_nodes[nodeid] == null && node != null) {
      _nodes[nodeid] = node;
      for (index = 0, len = parents.length; index < len; index += 1) {
        parentid = parents[index];


        if (processed[parentid] == null && parentid != nodeid) {
          processed[parentid] = true;
          if (_nodes[parentid] != null) {
            if (_parents[nodeid] == null) {
              _parents[nodeid] = {};
              _parentsCount[nodeid] = 0;
            }
            if (!_parents[nodeid][parentid]) {
              _parents[nodeid][parentid] = true;
              _parentsCount[nodeid] += 1;
            }

            if (_children[parentid] == null) {
              _children[parentid] = {};
              _childrenCount[parentid] = 0;
            }
            if (!_children[parentid][nodeid]) {
              _children[parentid][nodeid] = true;
              _childrenCount[parentid] += 1;
            }
          } else {
            if (_roots[parentid] == null) {
              _roots[parentid] = {};
              _rootsCount[parentid] = 0;
            }
            if (!_roots[parentid][nodeid]) {
              _roots[parentid][nodeid] = true;
              _rootsCount[parentid] += 1;
            }
          }
        }
      }
      if (_roots[nodeid] != null) {
        _children[nodeid] = _roots[nodeid];
        _childrenCount[nodeid] = _rootsCount[nodeid];
        delete _roots[nodeid];
        delete _rootsCount[nodeid];
        _loop(this, _children, nodeid, function (itemid) {
          if (_parents[itemid] == null) {
            _parents[itemid] = {};
            _parentsCount[itemid] = 0;
          }
          if (!_parents[itemid][nodeid]) {
            _parents[itemid][nodeid] = true;
            _parentsCount[itemid] += 1;
          }
        });
      }
    }
  }

  /**
   * Returns family node by id
   * @param {string} nodeid The id of the node
   * @returns {object|undefined} A reference to the node or undefined if id does not exists
   */
  function node(nodeid) {
    return _nodes[nodeid];
  }

  /**
   * Makes node to be a child of every parent in the collection of parents
   * @param {string[]} parents A collection of parents ids
   * @param {string} nodeid An id of the new node
   */
  function adopt(parents, nodeid) {
    var index, len,
      parentid;
    if (_nodes[nodeid] != null) {
      for (index = 0, len = parents.length; index < len; index += 1) {
        parentid = parents[index];

        if (_parents[nodeid] == null) {
          _parents[nodeid] = {};
          _parentsCount[nodeid] = 0;
        }

        if (parentid != nodeid && _nodes[parentid] != null) {
          if (!_parents[nodeid][parentid]) {
            _parents[nodeid][parentid] = true;
            _parentsCount[nodeid] += 1;
          }

          if (_children[parentid] == null) {
            _children[parentid] = {};
            _childrenCount[parentid] = 0;
          }
          if (!_children[parentid][nodeid]) {
            _children[parentid][nodeid] = true;
            _childrenCount[parentid] += 1;
          }
        } else {
          throw "Item cannot be parent of itself and parent should exist in the structure!";
        }
      }
    } else {
      throw "Child should be in hierarchy!";
    }
  }

  /**
   * Removes node
   * @param {string} nodeid The id of the node
   */
  function removeNode(nodeid) {
    if (_nodes[nodeid] != null) {
      _loop(this, _children, nodeid, function (itemid) {
        delete _parents[itemid][nodeid];
        _parentsCount[itemid] -= 1;

        if (!_parentsCount[itemid]) {
          delete _parents[itemid];
          delete _parentsCount[itemid];

          if (_roots[null] == null) {
            _roots[null] = {};
            _rootsCount[null] = 0;
          }
          if (!_roots[null][itemid]) {
            _roots[null][itemid] = true;
            _rootsCount[null] += 1;
          }
        }
      });
      _loop(this, _parents, nodeid, function (itemid) {
        delete _children[itemid][nodeid];
        _childrenCount[itemid] -= 1;
        if (!_childrenCount[itemid]) {
          delete _children[itemid];
          delete _childrenCount[itemid];
        }
      });
      if (_roots[null] != null && _roots[null][nodeid] != null) {
        delete _roots[null][nodeid];
        _rootsCount[null] -= 1;

        if (!_rootsCount[null]) {
          delete _roots[null];
          delete _rootsCount[null];
        }
      }
      delete _children[nodeid];
      delete _childrenCount[nodeid];
      delete _parents[nodeid];
      delete _parentsCount[nodeid];
      delete _nodes[nodeid];
    }
  }

  function _removeChildReference(parentid, childid) {
    var result = false;
    if (_children[parentid] != null && _children[parentid][childid] != null) {
      delete _children[parentid][childid];
      _childrenCount[parentid] -= 1;

      delete _parents[childid][parentid];
      _parentsCount[childid] -= 1;

      if (!_childrenCount[parentid]) {
        delete _children[parentid];
        delete _childrenCount[parentid];
      }

      if (!_parents[childid]) {
        delete _parents[childid];
        delete _parentsCount[childid];

        if (_roots[null] == null) {
          _roots[null] = {};
          _rootsCount[null] = 0;
        }
        _roots[null][childid] = true;
        _rootsCount[null] += 1;
      }
      result = true;
    }
    return result;
  }

  /**
   * Removes first available parent child or child parent relation
   * 
   * @param {string} fromid From node id
   * @param {string} toid To node id
   * @returns {true} If relation was broken
   */
  function removeRelation(fromid, toid) {
    var result = false;
    if (_nodes[fromid] != null && _nodes[toid] != null) {
      result = _removeChildReference(fromid, toid) || _removeChildReference(toid, fromid);
    }
    return result;
  }

  /**
   * Removes child relation
   * 
   * @param {string} parentid The parent node id
   * @param {string} childid The child node id
   * @returns {true} If relation was broken
   */
  function removeChildRelation(parentid, childid) {
    var result = false;
    if (_nodes[parentid] != null && _nodes[childid] != null) {
      result = _removeChildReference(parentid, childid);
    }
    return result;
  }


  /**
   * Returns true if structure has nodes.
   * 
   * @returns {boolean} Returns true if family structure has nodes
   */
  function hasNodes() {
    return !isEmptyObject(_nodes);
  }

  /**
   * Callback for iterating family nodes
   * 
   * @callback onFamilyItemCallback
   * @param {string} itemid The node id
   * @param {object} item The node
   * @returns {boolean} Returns true to break the loop
   */

  /**
   * Loops through nodes of family structure
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onFamilyItemCallback} onItem A callback function to call for every family node 
   */
  function loop(thisArg, onItem) {
    var item;
    if (onItem != null) {
      for (item in _nodes) {
        if (_nodes.hasOwnProperty(item)) {
          if (onItem.call(thisArg, item, _nodes[item])) {
            break;
          }
        }
      }
    }
  }

  function _loopItems(thisArg, collection, items, onItem) { // onItem(itemid, item, levelIndex)
    var newItems, itemid,
      processed = {},
      levelIndex = 0,
      hasItems = true;


    while (hasItems) {
      newItems = {};
      hasItems = false;

      for (itemid in items) {
        if (items.hasOwnProperty(itemid)) {
          if (!processed[itemid]) {
            processed[itemid] = true;

            switch (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex)) {
              case 1/*BREAK*/:
                newItems = {};
                hasItems = false;
                break;
              case 2/*SKIP*/:
                break;
              default:
                _loop(this, collection, itemid, function (newItemId) {
                  if (!processed[newItemId]) {
                    newItems[newItemId] = true;
                    hasItems = true;
                  }
                }); //ignore jslint
                break;
            }
          }
        }
      }
      items = newItems;
      levelIndex += 1;
    }
  }

  /**
   * Callback for iterating family nodes level by level
   * 
   * @callback onFamilyItemWithLevelCallback
   * @param {string} itemid The node id
   * @param {object} item The node
   * @param {number} levelIndex The node level index
   * @returns {number} Returns BREAK to break the loop and exit. Returns SKIP to skip node's branch traversing.
   */

  /**
   * Loops through child nodes of family structure level by level
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {string} nodeid The node id to start children traversing
   * @param {onFamilyItemWithLevelCallback} onItem A callback function to call for every child node 
   */
  function loopChildren(thisArg, nodeid, onItem) {
    if (onItem != null) {
      if (nodeid != null && _nodes[nodeid] != null && _children[nodeid] != null) {
        _loopItems(thisArg, _children, _children[nodeid], onItem);
      }
    }
  }

  /**
   * Loops through parent nodes of family structure level by level
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {string} nodeid The node id to start parents traversing
   * @param {onFamilyItemWithLevelCallback} onItem A callback function to call for every parent node 
   */
  function loopParents(thisArg, nodeid, onItem) {
    if (onItem != null) {
      if (nodeid != null && _nodes[nodeid] != null && _parents[nodeid] != null) {
        _loopItems(thisArg, _parents, _parents[nodeid], onItem);
      }
    }
  }

  function _loopTopo(thisArg, backwardCol, backwardCount, forwardCol, forwardCount, onItem) { // onItem(itemid, item, position)
    var index, len, nodeid, references,
      queue, newQueue, position;

    if (onItem != null) {
      /* count parents for every node */
      queue = [];
      references = {};
      for (nodeid in _nodes) {
        if (_nodes.hasOwnProperty(nodeid)) {
          references[nodeid] = (backwardCount[nodeid] || 0);

          if (!references[nodeid]) {
            queue.push(nodeid);
          }
        }
      }

      /* iterate queue and reduce reference counts via children */
      position = 0;
      while (queue.length > 0) {
        newQueue = [];

        for (index = 0, len = queue.length; index < len; index += 1) {
          nodeid = queue[index];

          if (onItem.call(thisArg, nodeid, _nodes[nodeid], position)) {
            newQueue = [];
            break;
          }

          position += 1;

          _loop(this, forwardCol, nodeid, function (itemid) {
            references[itemid] -= 1;
            if (references[itemid] === 0) {
              newQueue.push(itemid);
            }
          }); //ignore jslint
        }
        queue = newQueue;
      }
    }
  }

  /**
   * Callback for iterating family nodes in topological sort order
   * 
   * @callback onFamilyTopoCallback
   * @param {string} itemid The node id
   * @param {object} item The node
   * @param {number} position The node position in the sequence
   * @returns {boolean} Returns true to break the loop and exit.
   */

  /**
   * Loops through topologically sorted nodes of family structure
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onFamilyTopoCallback} onItem A callback function to call for every node 
   */
  function loopTopo(thisArg, onItem) {
    _loopTopo(thisArg, _parents, _parentsCount, _children, _childrenCount, onItem);
  }

  /**
   * Loops through reversed order topologically sorted nodes of family structure
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onFamilyTopoCallback} onItem A callback function to call for every node 
   */
  function loopTopoReversed(thisArg, onItem) {
    _loopTopo(thisArg, _children, _childrenCount, _parents, _parentsCount, onItem);
  }


  /**
   * Loops through nodes of family structure level by level. This function aligns nodes top or bottom.
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {boolean} parentAligned True if nodes should be placed at the next level after their parents level,
   * otherwise nodes placed at levels close to their children.
   * @param {onFamilyItemWithLevelCallback} onItem A callback function to call for every node 
   */
  function loopLevels(thisArg, parentAligned, onItem) {
    var topoSorted = [],
      topoSortedPositions = {},
      processed = {},
      margin = [],
      /* result items distribution by levels */
      levels = {}, levelIndex,
      groups = {}, hasGroups, newGroups, groupIndex, group,
      itemsAtLevel, itemid,
      minimumLevel = null,
      loopFunc = parentAligned ? loopTopo : loopTopoReversed,
      index, len,
      mIndex, mLen, mItem, mLevel,
      topoSortedItem,
      bestPosition, bestItem, bestLevel, bestIsParent,
      newMargin, hasNeighbours;

    function Group() {
      this.items = {};
      this.minimumLevel = null;
    }

    Group.prototype.addItemToLevel = function (itemid, level) {
      var items = this.items[level];
      if (!items) {
        items = [itemid];
        this.items[level] = items;
      } else {
        items.push(itemid);
      }
      this.minimumLevel = this.minimumLevel == null ? level : Math.min(this.minimumLevel, level);
    };

    function addItemToLevel(itemid, index, level) {
      var group = groups[index];
      if (!group) {
        group = new Group();
        groups[index] = group;
      }

      group.addItemToLevel(itemid, level);

      minimumLevel = minimumLevel == null ? level : Math.min(minimumLevel, level);

      levels[itemid] = level;
      processed[itemid] = true;
    }


    if (onItem != null) {
      /* sort items topologically */
      loopFunc(this, function (itemid, item, position) {
        topoSorted.push(itemid);
        topoSortedPositions[itemid] = position;
      });

      /* search for the first available non processed item in topological order */
      for (index = 0, len = topoSorted.length; index < len; index += 1) {
        topoSortedItem = topoSorted[index];
        if (processed[topoSortedItem] == null) {
          margin.push(topoSortedItem);

          addItemToLevel(topoSortedItem, index, 0);

          /* use regular graph breadth first search */
          while (margin.length > 0) {
            bestPosition = null;
            bestItem = null;
            bestLevel = null;
            bestIsParent = !parentAligned;
            newMargin = [];
            for (mIndex = 0, mLen = margin.length; mIndex < mLen; mIndex += 1) {
              mItem = margin[mIndex];
              mLevel = levels[mItem];
              hasNeighbours = false;

              if (parentAligned) {
                _loop(this, _parents, mItem, function (parentid) {
                  var topoSortedPosition;
                  if (!processed[parentid]) {
                    hasNeighbours = true;
                    topoSortedPosition = topoSortedPositions[parentid];
                    if (bestPosition == null || !bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)) {
                      bestPosition = topoSortedPosition;
                      bestItem = parentid;
                      bestLevel = mLevel - 1;
                      bestIsParent = true;
                    }
                  }
                }); //ignore jslint
                _loop(this, _children, mItem, function (childid) {
                  var topoSortedPosition;
                  if (!processed[childid]) {
                    hasNeighbours = true;
                    topoSortedPosition = topoSortedPositions[childid];
                    if (bestPosition == null || (!bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)))) {
                      bestPosition = topoSortedPosition;
                      bestItem = childid;
                      bestLevel = mLevel + 1;
                      bestIsParent = false;
                    }
                  }
                }); //ignore jslint
              } else {
                _loop(this, _children, mItem, function (childid) {
                  var topoSortedPosition;
                  if (!processed[childid]) {
                    hasNeighbours = true;
                    topoSortedPosition = topoSortedPositions[childid];
                    if (bestPosition == null || bestIsParent || bestPosition < topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel < mLevel + 1)) {
                      bestPosition = topoSortedPosition;
                      bestItem = childid;
                      bestLevel = mLevel + 1;
                      bestIsParent = false;
                    }
                  }
                }); //ignore jslint
                _loop(this, _parents, mItem, function (parentid) {
                  var topoSortedPosition;
                  if (!processed[parentid]) {
                    hasNeighbours = true;
                    topoSortedPosition = topoSortedPositions[parentid];
                    if (bestPosition == null || (bestIsParent && (bestPosition > topoSortedPosition || (bestPosition == topoSortedPosition && bestLevel > mLevel - 1)))) {
                      bestPosition = topoSortedPosition;
                      bestItem = parentid;
                      bestLevel = mLevel - 1;
                      bestIsParent = true;
                    }
                  }
                }); //ignore jslint
              }
              if (hasNeighbours) {
                newMargin.push(mItem);
              }
            }
            if (bestItem != null) {
              newMargin.push(bestItem);

              addItemToLevel(bestItem, index, bestLevel);
            }
            margin = newMargin;
          }
        }
      }

      hasGroups = true;
      levelIndex = minimumLevel;
      while (hasGroups) {
        newGroups = {};
        hasGroups = false;
        for (groupIndex in groups) {
          if (groups.hasOwnProperty(groupIndex)) {
            group = groups[groupIndex];
            itemsAtLevel = group.items[(group.minimumLevel - minimumLevel) + levelIndex];
            if (itemsAtLevel != null) {
              newGroups[groupIndex] = group;
              hasGroups = true;

              for (index = 0, len = itemsAtLevel.length; index < len; index += 1) {
                itemid = itemsAtLevel[index];
                if (onItem.call(thisArg, itemid, _nodes[itemid], levelIndex - minimumLevel)) {
                  hasGroups = false;
                  return true;
                }
              }
            }
          }
        }
        groups = newGroups;
        levelIndex += 1;
      }
    }
  }

  /**
   * Loops root nodes of family structure. 
   * @param {Object} thisArg The callback function invocation context
   * @param {onFamilyItemCallback} onItem A callback function to call for every family root node 
   */
  function loopRoots(thisArg, onItem) {
    var result = null,
      minimum, counter = 0,
      famMembers = {},
      famCount = {},
      isRoot,
      roots = {},
      processed = {},
      famItemId, member, members, rootid,
      membersRoots, memberRoots, memberRoot,
      index, len;

    loopTopoReversed(this, function (famItemId, famItem, position) {
      /* every node has at least itself in members */
      if (!famMembers.hasOwnProperty(famItemId)) {
        famMembers[famItemId] = {};
        famCount[famItemId] = 0;
      }
      famMembers[famItemId][famItemId] = true;
      famCount[famItemId] += 1;

      isRoot = true;
      loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
        var items, itemid;
        isRoot = false;
        if (!famMembers.hasOwnProperty(parentid)) {
          famMembers[parentid] = {};
          famCount[parentid] = 0;
        }
        /* push famItem members to parent members collection */
        if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
          famMembers[parentid] = famMembers[famItemId];
          famCount[parentid] = famCount[famItemId];
        } else {
          items = famMembers[famItemId];
          for (itemid in items) {
            if (items.hasOwnProperty(itemid)) {
              if (!famMembers[parentid][itemid]) {
                famMembers[parentid][itemid] = true;
                famCount[parentid] += 1;
              }
            }
          }
        }
        return SKIP;
      });
      if (isRoot) {
        roots[famItemId] = true;
        counter += 1;


      }
    });

    /* create collection of roots per member */
    membersRoots = {};
    for (rootid in roots) {
      if (roots.hasOwnProperty(rootid)) {
        members = famMembers[rootid];

        for (member in members) {
          if (members.hasOwnProperty(member)) {

            if (!membersRoots[member]) {
              membersRoots[member] = [];
            }
            membersRoots[member].push(rootid.toString());
          }
        }
      }
    }

    /* loop minimal sub tree roots */
    while (counter > 0) {
      minimum = null;
      for (famItemId in roots) {
        if (roots.hasOwnProperty(famItemId)) {
          if (!minimum || famCount[famItemId] < minimum) {
            minimum = famCount[famItemId];
            result = famItemId;
          }
        }
      }
      if (result != null) {
        if (onItem != null) {
          onItem.call(thisArg, result, _nodes[result]);
        }
        members = famMembers[result];

        for (member in members) {
          if (members.hasOwnProperty(member)) {
            if (!processed[member]) {
              memberRoots = membersRoots[member];
              for (index = 0, len = memberRoots.length; index < len; index += 1) {
                memberRoot = memberRoots[index];
                famCount[memberRoot] -= 1;
              }
              processed[member] = true;
            }
          }
        }

        delete roots[result];
        counter -= 1;
      }
    }
  }

  /**
   * Finds root node having largest number of nodes in its hierarchy
   * 
   * @returns {string} Returns largest sub-hierarchy root node id.  
   */
  function findLargestRoot() {
    var result = null,
      maximum,
      famMembers = {},
      famCount = {},
      isRoot;

    maximum = null;

    loopTopoReversed(this, function (famItemId, famItem, position) {
      /* every node has at least itself in members */
      if (!famMembers.hasOwnProperty(famItemId)) {
        famMembers[famItemId] = {};
        famCount[famItemId] = 0;
      }
      famMembers[famItemId][famItemId] = true;
      famCount[famItemId] += 1;

      isRoot = true;
      loopParents(this, famItem.id, function (parentid, parent, levelIndex) {
        var items, itemid;
        isRoot = false;
        if (!famMembers.hasOwnProperty(parentid)) {
          famMembers[parentid] = {};
          famCount[parentid] = 0;
        }
        /* push famItem members to parent members collection */
        if (!famCount[parentid] && _parentsCount[famItemId] == 1) {
          famMembers[parentid] = famMembers[famItemId];
          famCount[parentid] = famCount[famItemId];
        } else {
          items = famMembers[famItemId];
          for (itemid in items) {
            if (items.hasOwnProperty(itemid)) {
              famMembers[parentid][itemid] = true;
              famCount[parentid] += 1;
            }
          }
        }
        return SKIP;
      });
      if (isRoot && (!maximum || famCount[famItemId] > maximum)) {
        maximum = famCount[famItemId];
        result = famItemId;
      }

    });

    return result;
  }

  /**
   * Checks whether parents share a child node. Common child should belong only to the given collection
   * of parents, if child's parents don't match given collection of parents, 
   * it is not considered as common child. 
   * @param {string[]} parents Collection of parents
   * @returns {boolean} Returns true if common child exist. 
   */
  function hasCommonChild(parents) {
    var result = false,
      parentsHash, childrenHash,
      parentsCount,
      pIndex, pLen,
      parent, child;

    /* convert parents collection to hash, remove duplicates and ignore non-existing items */
    parentsHash = {};
    parentsCount = 0;
    for (pIndex = 0, pLen = parents.length; pIndex < pLen; pIndex += 1) {
      parent = parents[pIndex];
      if (_nodes[parent] != null && !parentsHash[parent]) {
        parentsHash[parent] = true;
        parentsCount += 1;
      }
    }

    /* collect number of parents referencing each child */
    childrenHash = {};
    for (parent in parentsHash) {
      if (parentsHash.hasOwnProperty(parent)) {
        _loop(this, _children, parent, function (child) {
          if (!childrenHash[child]) {
            childrenHash[child] = 1;
          } else {
            childrenHash[child] += 1;
          }
        }); //ignore jslint
      }
    }

    /* find common child having number of references equal to number of existing parents */
    for (child in childrenHash) {
      if (childrenHash.hasOwnProperty(child)) {
        if (_parents[child] != null && (_parentsCount[child] || 0) == childrenHash[child] && childrenHash[child] == parentsCount) {
          result = true;
          break;
        }
      }
    }

    return result;
  }

  function _bundleNodes(fromItem, items, bundleItemId, bundleItem, backwardCol, backwardCount, forwardCol, forwardCount, checkChildren) {
    var isValid = false,
      index, len,
      child;

    if (_nodes[fromItem] != null && forwardCol[fromItem] != null) {
      /* validate target items */
      isValid = true;
      if (checkChildren) {
        /* if we add new bundle all items should present */
        for (index = 0, len = items.length; index < len; index += 1) {
          child = items[index];
          if (_nodes[child] == null || forwardCol[fromItem][child] == null) {
            isValid = false;
          }
        }
      }
      if (isValid) {
        if (bundleItem != null) {
          /* add bundle node */
          _nodes[bundleItemId] = bundleItem;
        }

        if (_nodes[bundleItemId] != null) {
          /* update references */
          if (!backwardCol[bundleItemId]) {
            backwardCol[bundleItemId] = {};
            backwardCount[bundleItemId] = 0;
          }
          if (!forwardCol[bundleItemId]) {
            forwardCol[bundleItemId] = {};
            forwardCount[bundleItemId] = 0;
          }

          if (!backwardCol[bundleItemId][fromItem]) {
            backwardCol[bundleItemId][fromItem] = true;
            backwardCount[bundleItemId] += 1;
          }

          if (!forwardCol[fromItem][bundleItemId]) {
            forwardCol[fromItem][bundleItemId] = true;
            forwardCount[fromItem] += 1;
          }

          for (index = 0, len = items.length; index < len; index += 1) {
            child = items[index];

            if (bundleItemId != child) {
              if (forwardCol[fromItem][child] != null) {
                delete forwardCol[fromItem][child];
                forwardCount[fromItem] -= 1;
              }

              if (backwardCol[child][fromItem] != null) {
                delete backwardCol[child][fromItem];
                backwardCount[child] -= 1;
              }

              if (!backwardCol[child][bundleItemId]) {
                backwardCol[child][bundleItemId] = true;
                backwardCount[child] += 1;
              }

              if (!forwardCol[bundleItemId][child]) {
                forwardCol[bundleItemId][child] = true;
                forwardCount[bundleItemId] += 1;
              }
            }
          }
        }
      }
    }
    return isValid;
  }

  /**
   * Adds extra bundle item in between parent and its children. The parent node becomes parent of the bundle node,
   * and bundle becomes parent of the children. Existing parent child relations are removed.
   * @param {string} parent The parent node id
   * @param {string[]} children The collection of child nodes ids
   * @param {string} bundleItemId The bundle node id
   * @param {object} bundleItem The bundle item context object
   * @returns {boolean} Returns true if nodes bundle is valid
   */
  function bundleChildren(parent, children, bundleItemId, bundleItem) {
    return _bundleNodes(parent, children, bundleItemId, bundleItem, _parents, _parentsCount, _children, _childrenCount, true);
  }

  /**
   * Adds extra bundle item in between child node and its parents. The child node becomes child of the bundle node,
   * and bundle becomes child of the parents. Existing parent child relations are removed.
   * @param {string} child The parent node id
   * @param {string[]} parents The collection of child nodes ids
   * @param {string} bundleItemId The bundle node id
   * @param {object} bundleItem The bundle item context object
   * @returns {boolean} Returns true if the bundle is valid
   */
  function bundleParents(child, parents, bundleItemId, bundleItem) {
    return _bundleNodes(child, parents, bundleItemId, bundleItem, _children, _childrenCount, _parents, _parentsCount, true);
  }

  function ReferenceItem() {
    this.id = "";
    this.key = "";
    this.children = [];
    this.childrenHash = {};
    this.processed = false;
  }

  function ReferencesEdge(arg0) {
    this.items = [];
    this.weight = 0;
    this.difference = 0;

    if (arguments.length > 0) {
      this.difference = arg0;
    }
  }

  function _getReferencesGraph(currentItems) {
    var result = Graph(),
      item, parents,
      index1, index2, len,
      from, to, difference,
      processed = {};

    for (item in currentItems) {
      if (currentItems.hasOwnProperty(item)) {

        _loop(this, _children, item, function (child) {
          if (!processed.hasOwnProperty(child)) {
            processed[child] = true;
            /* create array of parents from hash references */
            parents = [];
            _loop(this, _parents, child, function (parent) {
              parents.push(parent);
            });

            /* create all possible combinations between items */
            for (index1 = 0, len = parents.length; index1 < len - 1; index1 += 1) {
              from = parents[index1];
              if (currentItems.hasOwnProperty(from)) {

                for (index2 = index1 + 1; index2 < len; index2 += 1) {
                  to = parents[index2];
                  if (currentItems.hasOwnProperty(to)) {
                    difference = Math.abs(currentItems[from].children.length - currentItems[to].children.length);

                    var edge = result.edge(from, to);
                    if (edge == null) {
                      edge = new ReferencesEdge(difference);
                      result.addEdge(from, to, edge);
                    }
                    edge.items.push(child);
                    edge.weight += 1;
                  }
                }
              }
            }
          }
        }); //ignore jslint
      }
    }
    return result;
  }

  /**
   * Callback function for creation of new family nodes
   * 
   * @callback onNewFamilyNodeCallback
   * @returns {object} Returns new family node.
   */

  /**
   * Optimizes references between family members.
   * It creates bundles eliminating excessive intersections between nodes relations.
   * 
   * @param {onNewFamilyNodeCallback} onNewBundleItem Callback function to create a new family node context object. 
   */
  function optimizeReferences(onNewBundleItem) {
    var sharedItemsByKey = {},
      sharedItemsById = {},
      currentItems = {},
      nodeid, newReferenceItem,
      nextItems, graph, node,
      maximumTree,
      counter = 0,
      power = 10,
      processed;

    if (onNewBundleItem != null) {
      for (nodeid in _nodes) {
        counter += 1;
        if (_nodes.hasOwnProperty(nodeid)) {
          newReferenceItem = new ReferenceItem();

          _loop(this, _children, nodeid, function (child) {
            newReferenceItem.children.push(child);
            newReferenceItem.childrenHash[child] = true;
          }); //ignore jslint

          newReferenceItem.children.sort();
          newReferenceItem.id = nodeid;
          newReferenceItem.key = newReferenceItem.children.join(",");

          currentItems[newReferenceItem.id] = newReferenceItem;
        }
      }

      power = Math.pow(10, (counter).toString().length);

      while (!isEmptyObject(currentItems)) {
        nextItems = {};
        processed = {};

        graph = _getReferencesGraph(currentItems);

        for (nodeid in currentItems) {
          if (currentItems.hasOwnProperty(nodeid)) {
            node = currentItems[nodeid];

            if (!node.processed) {

              maximumTree = graph.getSpanningTree(nodeid, function (edge) {
                return edge.weight * power + power - edge.difference;
              }); //ignore jslint

              maximumTree.loopLevels(this, function (treeKey, treeKeyNode, levelid) {
                currentItems[treeKey].processed = true;

                maximumTree.loopChildren(this, treeKey, function (child, childNode) {
                  var relation = graph.edge(treeKey, child),
                    nextBundleItem = null, newItem,
                    key, index, len,
                    childrenToBind, isSharedItem,
                    relationItem;

                  currentItems[child].processed = true;

                  if (relation.weight > 1) {
                    relation.items.sort();
                    key = relation.items.join(',');

                    if (!sharedItemsByKey.hasOwnProperty(key)) {
                      newItem = onNewBundleItem();
                      _nodes[newItem.id] = newItem; /* add new bundle node to the family */

                      nextBundleItem = new ReferenceItem();
                      nextBundleItem.id = newItem.id;
                      nextBundleItem.key = key;
                      for (index = 0, len = relation.items.length; index < len; index += 1) {
                        relationItem = relation.items[index];
                        nextBundleItem.children.push(relationItem);
                        nextBundleItem.childrenHash[relationItem] = true;
                        processed[relationItem] = true;
                      }
                      nextBundleItem.children.sort();

                      sharedItemsByKey[nextBundleItem.key] = nextBundleItem;
                      sharedItemsById[nextBundleItem.id] = nextBundleItem;
                      nextItems[nextBundleItem.id] = nextBundleItem;
                      processed[nextBundleItem.id] = nextBundleItem;

                      childrenToBind = nextBundleItem.children.slice(0);
                      loopChildren(this, treeKeyNode.replacementItem || treeKey, function (childid, child, level) {
                        // if child item is bundle and it is not child of new bundle item
                        if (!nextBundleItem.childrenHash[childid] && sharedItemsById[childid] != null) {
                          isSharedItem = true;
                          // if all children of that child are in the next bundle item we add it to that new bundle item as well
                          loopChildren(this, childid, function (childid, child, level) {
                            if (!nextBundleItem.childrenHash[childid]) {
                              isSharedItem = false;
                              return 1/*BREAK*/;
                            }
                            if (!processed.hasOwnProperty(childid)) {
                              return SKIP;
                            }
                          });
                          if (isSharedItem) {
                            childrenToBind.push(childid);
                          }
                        }
                        return 2/*SKIP*/;
                      });

                      _bundleNodes(treeKeyNode.replacementItem || treeKey, childrenToBind, nextBundleItem.id, newItem, _parents, _parentsCount, _children, _childrenCount, false);

                      if ((_childrenCount[treeKey] || 0) <= 1 && treeKeyNode.replacementItem == null) {
                        treeKeyNode.replacementItem = nextBundleItem.id;
                      }
                    } else {
                      nextBundleItem = sharedItemsByKey[key];
                    }

                    /* don't add shared item to itself on next items loop*/
                    if (nextBundleItem.id != child) {

                      childrenToBind = nextBundleItem.children.slice(0);
                      loopChildren(this, childNode.replacementItem || child, function (childid, child, level) {
                        if (sharedItemsById[childid] != null && !nextBundleItem.childrenHash[childid]) {

                          isSharedItem = true;
                          loopChildren(this, childid, function (childid, child, level) {
                            if (!nextBundleItem.childrenHash[childid]) {
                              isSharedItem = false;
                              return 1/*BREAK*/;
                            }
                            if (!processed.hasOwnProperty(childid)) {
                              return 2/*SKIP*/;
                            }
                            return SKIP;
                          });
                          if (isSharedItem) {
                            childrenToBind.push(childid);
                          }
                        }
                        return 2/*SKIP*/;
                      });


                      _bundleNodes(childNode.replacementItem || child, childrenToBind, nextBundleItem.id, null, _parents, _parentsCount, _children, _childrenCount, false);

                      /* if all items bundled then use bundle item for following transformations of references instead of original item if references graph*/
                      if ((_childrenCount[child] || 0) <= 1 && childNode.replacementItem == null) {
                        childNode.replacementItem = nextBundleItem.id;
                      }
                    }
                  }
                });
              }); //ignore jslint
            }
          }
        }
        currentItems = nextItems;
      }
    }
  }

  /**
   * Eliminates many to many relations in family structure
   * It is needed to simplify layout process of the diagram
   * 
   * @param {onNewFamilyNodeCallback} onNewBundleItem Callback function for creation of new bundle node  
   */
  function eliminateManyToMany(onNewBundleItem) {
    var parent, bundleNode;

    for (parent in _children) {
      if (_children.hasOwnProperty(parent)) {

        if ((_childrenCount[parent] || 0) > 1) {
          _loop(this, _children, parent, function (child) {
            if ((_parentsCount[child] || 0) > 1) {
              bundleNode = onNewBundleItem();
              bundleChildren(parent, [child], bundleNode.id, bundleNode);
            }
          }); //ignore jslint
        }
      }
    }
  }

  function FamilyEdge(parentid, childid) {
    this.parentid = parentid;
    this.childid = childid;
    this.key = parentid + "," + childid;
  }

  /**
   * Eliminates crossing parent child relations between nodes based of nodes order in treeLevels structure.
   * @param {treeLevels} treeLevels Tree levels structure keeps orders of nodes level by level.
   * @returns {family} Returns planar family structure. 
   */
  function getPlanarFamily(treeLevels) {
    var result = new Family(),
      familyEdgeIndex, familyEdgeLen;

    treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var sequence = new LinkedHashItems(),
        crossings = {},
        familyEdges = {},
        firstBucket = [];

      treeLevels.loopLevelItems(this, levelIndex, function (parentid, parentItem, position) {
        loopChildren(this, parentid, function (childid, childItem) {
          var childPosition = treeLevels.getItemPosition(childid);
          var familyEdge = new FamilyEdge(parentid, childid);

          familyEdges[familyEdge.key] = familyEdge;

          var crossEdges = [];
          if (sequence.isEmpty()) {
            sequence.add(childPosition, [familyEdge]);
          } else {
            sequence.iterateBack(function (sequenceItem, itemPosition) {
              if (itemPosition < childPosition) {
                // add new sequence after itemPosition and exit
                sequence.insertAfter(itemPosition, childPosition, [familyEdge]);
                return true;
              } else if (itemPosition == childPosition) {
                // add new link to existing sequenceItem and exit
                sequenceItem.push(familyEdge);
                return true;
              } else {
                // merge links into output
                for (var crossEdgesIndex = 0, crossEdgesLen = sequenceItem.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
                  var crossEdge = sequenceItem[crossEdgesIndex];
                  if (crossEdge.parentid != parentid) {
                    crossEdges.push(crossEdge);
                  }
                }
              }
            });
            if (sequence.startKey() > childPosition) {
              sequence.unshift(childPosition, [familyEdge]);
            }
          }

          crossings[familyEdge.key] = crossEdges;
          for (var crossEdgesIndex = 0, crossEdgesLen = crossEdges.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
            crossings[crossEdges[crossEdgesIndex].key].push(familyEdge);
          }

          return SKIP;
        });

        if (countChildren(parentid) == 1) {
          var childid = firstChild(parentid);
          if (countParents(childid) == 1) {
            var familyEdge = new FamilyEdge(parentid, childid);
            firstBucket.push(familyEdge.key);
          }
        }
      });

      // distribute edges by number of crossings into buckets
      var buckets = [],
        crossEdges;
      for (var familyEdgeKey in crossings) {
        crossEdges = crossings[familyEdgeKey];
        var len = crossEdges.length;
        if (buckets[len] != null) {
          buckets[len].push(familyEdgeKey);
        } else {
          buckets[len] = [familyEdgeKey];
        }
      }

      var processed = {};

      // leave single parent child relations
      buckets.unshift(firstBucket);

      // break relations having 
      for (var bucketIndex = 0, bucketsLen = buckets.length; bucketIndex < bucketsLen; bucketIndex += 1) {
        var bucket = buckets[bucketIndex];
        if (bucket != null) {
          for (familyEdgeIndex = 0, familyEdgeLen = bucket.length; familyEdgeIndex < familyEdgeLen; familyEdgeIndex += 1) {
            familyEdgeKey = bucket[familyEdgeIndex];
            if (!processed.hasOwnProperty(familyEdgeKey)) {
              processed[familyEdgeKey] = true;

              var familyEdge = familyEdges[familyEdgeKey];

              if (result.node(familyEdge.parentid) == null) {
                result.add(null, familyEdge.parentid, {});
              }
              if (result.node(familyEdge.childid) == null) {
                result.add([familyEdge.parentid], familyEdge.childid, {});
              } else {
                result.adopt([familyEdge.parentid], familyEdge.childid);
              }

              crossEdges = crossings[familyEdgeKey];
              for (var crossEdgesIndex = 0, crossEdgesLen = crossEdges.length; crossEdgesIndex < crossEdgesLen; crossEdgesIndex += 1) {
                processed[crossEdges[crossEdgesIndex].key] = true;
              }
            }
          }
        }
      }
    });

    return result;
  }

  function Link(from, to, distance) {
    this.from = from;
    this.to = to;
    this.distance = 0;
  }

  /**
   * Eliminates direct relations between grand parent nodes.
   * 
   * @returns {family} Returns family structure without direct grand parent relations. 
   */
  function getFamilyWithoutGrandParentsRelations() {
    var result = new Family();

    var hash = {};
    var links = [];
    var level = 0;
    for (var from in _parents) {
      if (_parents.hasOwnProperty(from)) {
        _loop(this, _parents, from, function (to) {
          var fromHash = hash[from];
          if (fromHash == null) {
            fromHash = {};
            hash[from] = fromHash;
          }
          if (!fromHash.hasOwnProperty(to)) {
            var link = new Link(from, to);
            links.push(link);
            hash[from][to] = link;
          }
        }); //ignore jslint
      }
    }

    while (links.length > 0) {
      var newLinks = [];
      level += 1;
      for (var index = 0, len = links.length; index < len; index += 1) {
        var link = links[index];
        from = link.to;
        if (_parents.hasOwnProperty(from)) {
          _loop(this, _parents, from, function (to) {
            var fromHash = hash[link.from];
            if (fromHash == null) {
              fromHash = {};
              hash[link.from] = fromHash;
            }
            if (fromHash.hasOwnProperty(to)) {
              fromHash[to].distance = level;
            } else {
              var newLink = new Link(from, to);
              newLinks.push(newLink);
              fromHash[to] = newLink;
            }
          });
        }
      }
      links = newLinks;
    }

    // return only references to immidiate parents
    loop(this, function (nodeid, node) {
      var parents = [];
      _loop(this, _parents, nodeid, function (to) {
        if (hash[nodeid][to].distance === 0) {
          parents.push(to);
        }
      });
      result.add(parents, nodeid, node);
    });

    return result;
  }

  /**
   * Returns number of children
   * @param {string} parent The parent node id
   * @returns {number} Number of children
   */
  function countChildren(parent) {
    return _childrenCount[parent] || 0;
  }

  /**
   * Returns number of parents
   * @param {string} child The child node id
   * @returns {number} Number of parents
   */
  function countParents(child) {
    return _parentsCount[child] || 0;
  }

  /**
   * First available child
   * @param {string} parent The parent node id
   * @returns {string} Returns first available child id or null.
   */
  function firstChild(parent) {
    var result = null,
      children = _children[parent] || {};
    for (result in children) {
      if (children.hasOwnProperty(result)) {
        return result; //ignore jslint
      }
    }
    return null;
  }

  /**
   * First available parent
   * @param {string} child The child node id
   * @returns {string} Returns first available parent id or null.
   */
  function firstParent(child) {
    var result = null,
      parents = _parents[child] || {};
    for (result in parents) {
      if (parents.hasOwnProperty(result)) {
        return result; //ignore jslint
      }
    }
    return null;
  }

  /**
   * Callback for iterating family node neighbours level by level
   * 
   * @callback onFamilyItemNeighbourCallback
   * @param {string} itemid The node id
   * @param {object} item The node
   * @param {number} levelIndex The neigbour node distance from the start node
   * @returns {number} Returns true to skip further neighbous traversing.
   */

  /**
   * Loops through the node neighbours of the family structure level by level
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {string} itemid The node id to start traversing neighbour nodes
   * @param {onFamilyItemNeighbourCallback} onItem A callback function to call for every neighbour node 
   */
  function loopNeighbours(thisArg, itemid, onItem) {
    var processed = {};

    if (onItem != null) {
      loopChildren(this, itemid, function (childid, child, childLevel) {
        if (!processed.hasOwnProperty(childid)) {
          processed[childid] = null;

          if (onItem.call(thisArg, childid, child, 1)) {
            processed[childid] = SKIP;
          }

          loopParents(this, childid, function (parentid, parent, parentLevel) {
            if (!processed.hasOwnProperty(parentid)) {
              processed[parentid] = null;

              if (onItem.call(thisArg, parentid, parent, 2)) {
                processed[parentid] = SKIP;
              }
            }
            return processed[parentid];
          });
        }
        return processed[childid];
      });

      loopParents(this, itemid, function (parentid, parent, parentLevel) {
        if (!processed.hasOwnProperty(parentid)) {
          processed[parentid] = null;

          if (onItem.call(thisArg, parentid, parent, 1)) {
            processed[parentid] = SKIP;
          }

          loopChildren(this, parentid, function (childid, child, childLevel) {
            if (!processed.hasOwnProperty(childid)) {
              processed[childid] = true;

              if (onItem.call(thisArg, childid, child, 2)) {
                processed[childid] = SKIP;
              }
            }
            return processed[childid];
          });

        }
        return processed[parentid];
      });
    }
  }

  /**
   * Callback for getting default edge value
   * 
   * @callback onFamilyEdgeCallback
   * @param {string} from From node id
   * @param {string} to The node
   * @returns {object} Returns new edge object.
   */

  /**
   * Creates graph structure out of the family structure.
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onFamilyEdgeCallback} onEdge A callback function to call for every new edge added to the final graph
   * @returns {graph} Returns graph structure of the family.
   */
  function getGraph(thisArg, onEdge) {
    var result = Graph(),
      from;

    for (from in _children) {
      if (_children.hasOwnProperty(from)) {
        _loop(this, _children, from, function (to) {
          var edge = result.edge(from, to);
          if (edge == null) {
            if (onEdge == null) {
              edge = new ReferencesEdge({});
            } else {
              edge = onEdge.call(thisArg, from, to);
            }
            result.addEdge(from, to, edge);
          }
        }); //ignore jslint
      }
    }

    return result;
  }



  function GroupBy(parents, children) {
    this.parents = parents;
    this.children = children;
    this.nodes = [];
  }

  /**
   * Callback for grouping nodes having common single parent and child
   * 
   * @callback onFamilyGroupCallback
   * @param {string} parent The common parent node id
   * @param {string} child The common child node id
   * @param {Array.<Array.<FamilyNode>>} nodes Collection of collections of grouped items
   */

  /**
   * Callback for getting group id for group of nodes
   * 
   * @callback onFamilyGroupIdCallback
   * @param {Array.<FamilyNode>} nodes Collection of nodes to get group id for.
   * @returns {string} Returns group id or null. Null adds node to default group. Return -1 to disable grouping.
  */

  /**
   * Creates graph structure out of the family structure.
   * 
   * @param {Object} thisArg The callback function invocation context
   * @param {onFamilyGroupCallback} onGroup A callback function to call for every new group of nodes found
   * @param {onFamilyGroupIdCallback} onGroupId A callback function to call for every new group of nodes found
   */
  function groupBy(thisArg, size, onGroup, onGroupId) {
    if (onGroup != null) {
      var groups = {};
      var processed = {};
      for (var nodeid in _nodes) {
        if(!processed.hasOwnProperty(nodeid) ) {
          processed[nodeid] = true;
          if ((_parentsCount[nodeid] || 0) <= 1 && (_childrenCount[nodeid] || 0) <= 1) {
            var nodes = [new FamilyNode(nodeid, _nodes[nodeid])];
            loopChainParents(this, nodeid, (parentId) => {
              processed[parentId] = true;
              nodes.unshift({id: parentId, node: _nodes[parentId]});
            });
            loopChainChildren(this, nodeid, (childId) => {
              processed[childId] = true;
              nodes.push(new FamilyNode(childId, _nodes[childId]));
            });

            /* find group id*/
            var groupId = null;
            if(onGroupId != null) {
              groupId = onGroupId.call(thisArg, nodes);
            }
            
            /* add node or list of nodes to group */
            if(groupId !== -1) {

              var parents = [];
              loopParents(this, nodes[0].id, function(parentId, parent, levelIndex) {
                if(levelIndex == 0) {
                  parents.push(parentId);
                  return;
                }
                return BREAK;
              });
              parents.sort();

              var children = [];
              loopChildren(this, nodes[nodes.length-1].id, function(childId, child, levelIndex) {
                if(levelIndex == 0) {
                  children.push(childId);
                  return;
                }
                return BREAK;
              });
              children.sort();

              var key = parents.join(",") + " * " + children.join(",");

              if(groupId !== null) {
                key += " * " + groupId;
              }
              if (!groups.hasOwnProperty(key)) {
                groups[key] = new GroupBy(parents, children);
              }
              groups[key].nodes.push(nodes);
            }
          }
        }
      }

      for (key in groups) {
        if (groups.hasOwnProperty(key)) {
          var group = groups[key];
          if (group.nodes.length >= size) {
            if (onGroup.call(thisArg, group.parents, group.children, group.nodes)) {
              break;
            }
          }
        }
      }
    }
  }

  function loopChainParents(thisArg, nodeid, onItem) {
    while(_parentsCount[nodeid] === 1) {
      var parentId = firstParent(nodeid);
      if(_childrenCount[parentId] === 1) {
        onItem.call(thisArg, parentId);
        nodeid = parentId;
      } else {
        break;
      }      
    }
  }

  function loopChainChildren(thisArg, nodeid, onItem) {
    while(_childrenCount[nodeid] === 1) {
      var childId = firstChild(nodeid);
      if(_parentsCount[childId] === 1) {
        onItem.call(thisArg, childId);
        nodeid = childId;
      } else {
        break;
      }
    }
  }

  /**
   * Validates internal data structure consistency of the family.
   * @param {object} info Optional validation object. 
   */
  function validate(info) {
    var parent, child;

    function _count(items) {
      var result = 0, key;
      if (items != null) {
        for (key in items) {
          if (items.hasOwnProperty(key)) {
            result += 1;
          }
        }
      }
      return result;
    }

    loop(this, function (nodeId, node) {
      _loop(this, _children, nodeId, function (child) {
        if (!_parents.hasOwnProperty(child) || !_parents[child].hasOwnProperty(nodeId)) {
          if (info != null) {
            info.message = "Child #" + child + " does not reference parent #" + nodeId;
          }
          return false;
        }
      });
      _loop(this, _parents, nodeId, function (parent) {
        if (!_children.hasOwnProperty(parent) || !_children[parent].hasOwnProperty(nodeId)) {
          if (info != null) {
            info.message = "Parent #" + parent + " does not reference child #" + nodeId;
          }
          return false;
        }
      });
    });

    for (parent in _parents) {
      if (_parents.hasOwnProperty(parent)) {
        if ((_parentsCount[parent] || 0) != _count(_parents[parent])) {
          if (info != null) {
            info.message = "Parents count for item #" + parent + " missmatch.";
          }
          return false;
        }
        if (_parents.hasOwnProperty(parent) && !_nodes.hasOwnProperty(parent)) {
          if (info != null) {
            info.message = "Orphant parents for item #" + parent;
          }
          return false;
        }
      }
    }

    for (child in _children) {
      if (_children.hasOwnProperty(child)) {
        if ((_childrenCount[child] || 0) != _count(_children[child])) {
          if (info != null) {
            info.message = "Children count for item " + child + " missmatch.";
          }
          return false;
        }
        if (_children.hasOwnProperty(child) && !_nodes.hasOwnProperty(child)) {
          if (info != null) {
            info.message = "Orphant children of item " + child;
          }
          return false;
        }
      }
    }

    for (child in _roots) {
      if (_roots.hasOwnProperty(child)) {
        if ((_rootsCount[child] || 0) != _count(_roots[child])) {
          if (info != null) {
            info.message = "Root children count for item @" + child + " missmatch.";
          }
          return false;
        }
        _loop(this, _roots, child, function (nodeid) {
          if (!_nodes.hasOwnProperty(nodeid)) {
            if (info != null) {
              info.message = "Child #" + nodeid + "of root #" + child + " does not exists.";
            }
            return false;
          }
        }); //ignore jslint
      }
    }

    return true;
  }

  /**
   * Checks if family structure has loops in references. 
   * @returns {boolean} Returns true if family structure contains loops in references.
   */
  function hasLoops() {
    var tempFamily = clone();
    loopTopo(this, function (itemid, item, levelIndex) {
      tempFamily.removeNode(itemid);
    });

    return tempFamily.hasNodes();
  }

  /**
   * Clones family structure.
   * 
   * @returns {family} Returns copy of the family structure.
   */
  function clone() {
    return Family({
      roots: _roots,
      rootsCount: _rootsCount,
      children: _children,
      childrenCount: _childrenCount,
      parents: _parents,
      parentsCount: _parentsCount,
      nodes: _nodes
    });
  }

  return {
    /* family structure modification */
    add: add,
    adopt: adopt,
    bundleChildren: bundleChildren,
    bundleParents: bundleParents,
    optimizeReferences: optimizeReferences,
    eliminateManyToMany: eliminateManyToMany,
    groupBy: groupBy,
    getPlanarFamily: getPlanarFamily,
    getFamilyWithoutGrandParentsRelations: getFamilyWithoutGrandParentsRelations,
    getGraph: getGraph,

    removeNode: removeNode,
    removeRelation: removeRelation,
    removeChildRelation: removeChildRelation,

    /* referencing and looping */
    node: node,
    loop: loop,
    loopLevels: loopLevels,
    loopTopo: loopTopo,
    loopTopoReversed: loopTopoReversed,
    loopChildren: loopChildren,
    loopParents: loopParents,
    findLargestRoot: findLargestRoot,
    loopRoots: loopRoots,
    hasNodes: hasNodes,
    hasCommonChild: hasCommonChild,
    loopNeighbours: loopNeighbours,
    countChildren: countChildren,
    countParents: countParents,
    firstParent: firstParent,
    firstChild: firstChild,

    /* force validation */
    validate: validate,
    hasLoops: hasLoops,
    clone: clone,

    // callback return codes
    BREAK: BREAK, // break loop immidiatly
    SKIP: SKIP // skip loop of current node children 
  };
}

function DependencyManager() {
  var hash = {};

  function register(key, value) {
    hash[key] = value;

    return value;
  }

  function resolve() {
    var args = [],
      deps = arguments[0],
      func = arguments[1],
      scope = arguments[2] || {};
    return function () {
      var a = Array.prototype.slice.call(arguments, 0);
      for (var i = 0; i < deps.length; i += 1) {
        var d = deps[i];
        args.push(hash.hasOwnProperty(d) && d !== '' ? hash[d] : a.shift());
      }
      args = args.concat(a);
      return func.apply(scope || {}, args);
    };
  }

  return {
    register: register,
    resolve: resolve
  };
}

function TaskManager() {
  var _taskFamily = new Family();
  var _dependencies = new DependencyManager();
  var _tasks = [];

  function TaskInfo(name, dependencies, factory, color) {
    this.name = name;
    this.dependencies = dependencies;
    this.factory = factory;
    this.task = null;
    this.color = color;
  }

  function addTask(taskName, taskDependencies, factory, color) {
    if (_tasks.length > 0) {
      throw "Task Manager is already initialized";
    }
    _taskFamily.add(taskDependencies, taskName, new TaskInfo(taskName, taskDependencies, factory, color));
  }

  function getTask(taskName) {
    var taskInfo = _taskFamily.node(taskName);
    return taskInfo && taskInfo.task;
  }

  function addDependency(name, dependency) {
    if (_tasks.length > 0) {
      throw "Task Manager is already initialized";
    }
    _dependencies.register(name, dependency);
  }

  function process(startTask, stopTask, debug) {
    var hasChanges = false,
      logtime = debug;
    if (_tasks.length === 0) {
      _taskFamily.loopTopo(this, function (taskName, taskInfo) {
        taskInfo.task = _dependencies.register(taskName, _dependencies.resolve(taskInfo.dependencies, taskInfo.factory)());
        _tasks.push(taskInfo);
      });
    }
    if (debug) {
      // eslint-disable-next-line no-console
      console.log("-- process --");
    }
    var isRequired = {};
    for (var index = 0, len = _tasks.length; index < len; index += 1) {
      var taskInfo = _tasks[index],
        dependents = [];

      if (taskInfo.name == startTask || isRequired.hasOwnProperty(taskInfo.name)) {
        if (logtime) {
          var startAt = performance.now(); //ignore jslint
        }
        if ((hasChanges = taskInfo.task.process(debug))) {
          _taskFamily.loopChildren(this, taskInfo.name, function (childTaskName, childTaskInfo) {
            isRequired[childTaskName] = true;
            if (debug) {
              dependents.push(childTaskName);
            }
            return _taskFamily.SKIP;
          });
        }
        if (logtime) {
          var endAt = performance.now(); //ignore jslint
        }
        if (debug) {
          var spentTime = Math.round((endAt - startAt), 2);
          // eslint-disable-next-line no-console
          console.log(index + ". " + taskInfo.name + (", " + spentTime + " ms. ") + (hasChanges ? " - forces: " + dependents.toString() : ""));
        }
      }
      if (taskInfo.name == stopTask) {
        return;
      }
    }
  }


  function getProcessDiagramConfig() {
    var result = [];
    if (_tasks.length === 0) {
      _taskFamily.loopTopo(this, function (taskName, taskInfo) {
        taskInfo.task = _dependencies.register(taskName, _dependencies.resolve(taskInfo.dependencies, taskInfo.factory)());
        _tasks.push(taskInfo);
      });
    }
    for (var index = 0, len = _tasks.length; index < len; index += 1) {
      var taskInfo = _tasks[index];

      var itemConfig = {
        id: taskInfo.name,
        title: splitCamelCaseName(taskInfo.name).join(" "),
        description: taskInfo.task.description || "",
        itemTitleColor: taskInfo.color,
        parents: []
      };
      _taskFamily.loopParents(this, taskInfo.name, function (parentTaskName, parentTaskInfo) {
        itemConfig.parents.push(parentTaskName);
        return _taskFamily.SKIP;
      });
      result.push(itemConfig);
    }
    return result;
  }

  return {
    addTask: addTask,
    addDependency: addDependency,
    getTask: getTask,
    process: process,
    getProcessDiagramConfig: getProcessDiagramConfig
  };
}

function OptionsTask(getOptions) {

  function process() {
    return true;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Raw options."
  };
}

function ArrayReader(itemTemplate, containsUniqueItems, uniquePropertyKey, createSourceHash, isOrdered) {
  this.itemTemplate = itemTemplate;
  this.containsUniqueItems = containsUniqueItems;
  this.uniquePropertyKey = uniquePropertyKey;
  this.containsPrimitiveValues = isNullOrEmpty(uniquePropertyKey);
  this.createSourceHash = createSourceHash;
  this.isOrdered = isOrdered;
}
ArrayReader.prototype.read = function (target, source, path, context) {
  var result = [], resultHash = {},
    hash, sequence, resultSequence = {},
    sourceHash = {},
    item, itemid,
    index, len,
    newHashObject,
    sequencePath = path + "-seq";

  /* validate source array */
  if (!source || !Array.isArray(source)) {
    source = [];
  }

  /* hash values for tracking changes */
  hash = context.hash.hasOwnProperty(path) ? context.hash[path] : {};
  sequence = context.hash.hasOwnProperty(sequencePath) ? context.hash[sequencePath] : {};

  for (index = 0, len = source.length; index < len; index += 1) {
    item = source[index];

    itemid = this.containsUniqueItems ? (this.containsPrimitiveValues ? item : item[this.uniquePropertyKey]) : index;

    if (!resultHash.hasOwnProperty(itemid)) {
      newHashObject = this.itemTemplate.read(hash.hasOwnProperty(itemid) ? hash[itemid] : {}, item, path + "-" + index, context);

      result.push(newHashObject);
      resultHash[itemid] = newHashObject;
      resultSequence[index] = itemid;
      if (this.createSourceHash) {
        sourceHash[itemid] = item;
      }

      if (this.isOrdered) {
        if (sequence[index] != resultSequence[index]) {
          context.isChanged = true;
        }
      }
    }
  }

  context.hash[path] = resultHash;
  context.hash[sequencePath] = resultSequence;
  if (this.createSourceHash) {
    context.sourceHash[path] = sourceHash;
  }

  if (target == null || target.length != result.length) {
    context.isChanged = true;
  }

  return result;
};

function ValueReader(acceptedTypes, isNullable, defaultValue) {
  this.acceptedTypes = acceptedTypes;
  this.isNullable = isNullable;
  this.defaultValue = defaultValue;

  this.hash = {};

  /* collect valid enumeration values */
  for (var index = 0; index < acceptedTypes.length; index += 1) {
    var acceptedType = acceptedTypes[index];
    this.hash[acceptedType] = true;
  }
}
ValueReader.prototype.stringify = function (target) {
  if (this.hash["object"] == true) {
    var processed = [];
    var result = JSON.stringify(target, function (key, value) {
      if (key[0] === '_') {
        return null;
      }
      if (value !== null && typeof value == "object") {
        if (processed.indexOf(value) == -1) {
          processed.push(value);
          return value;
        }
        return null;
      }
      return value;
    });
    return result;
  }
  return target;
};

ValueReader.prototype.read = function (target, source, path, context) {
  var result = null;

  if (source === null || typeof source == "undefined" || !this.hash.hasOwnProperty(typeof source)) {
    source = this.isNullable ? null : this.defaultValue;
  }

  result = source;

  if (this.stringify(target) !== this.stringify(source)) {
    context.isChanged = true;
  }

  return result;
};

function ObjectReader(dataTemplate, isNullable, defaultValue) {
  this.dataTemplate = dataTemplate;
  this.isNullable = isNullable;
  this.defaultValue = defaultValue;
}
ObjectReader.prototype.read = function (target, source, path, context) {
  var result = null,
    isTargetObject = isObject(target),
    property,
    propertyDataTemplate;

  if (!source) {
    source = this.isNullable ? null : this.defaultValue;
  }

  if (isObject(source)) {
    result = {};

    for (property in this.dataTemplate) {
      if (this.dataTemplate.hasOwnProperty(property)) {
        propertyDataTemplate = this.dataTemplate[property];

        result[property] = propertyDataTemplate.read(isTargetObject ? target[property] : null, source[property], path + "-" + property, context);
      }
    }
  } else {
    result = source;

    if (target !== source) {
      context.isChanged = true;
    }
  }
  return result;
};

function EnumerationReader(enumeration, isNullable, defaultValue) {
  this.enumeration = enumeration;
  this.isNullable = isNullable;
  this.defaultValue = defaultValue;

  this.hash = {};

  /* collect valid enumeration values */
  for (var key in enumeration) {
    this.hash[enumeration[key]] = key;
  }
}
EnumerationReader.prototype.read = function (target, source, path, context) {
  var result = null;

  if (source === null || typeof source == "undefined" || !this.hash.hasOwnProperty(source)) {
    source = this.isNullable ? null : this.defaultValue;
  }

  result = source;

  if (target !== source) {
    context.isChanged = true;
  }

  return result;
};

function CalloutOptionTask(optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    calloutMaximumVisibility: new EnumerationReader(Visibility, false, defaultConfig.calloutMaximumVisibility),
    showCallout: new ValueReader(["boolean"], false, defaultConfig.showCallout),
    calloutPlacementOffset: new ValueReader(["number"], false, defaultConfig.calloutPlacementOffset),
    orientationType: new EnumerationReader(OrientationType, false, defaultConfig.orientationType),

    defaultTemplateName: new ValueReader(["string"], true),
    defaultCalloutTemplateName: new ValueReader(["string"], true),

    calloutfillColor: new ValueReader(["string"], false, defaultConfig.calloutfillColor),
    calloutBorderColor: new ValueReader(["string"], true),
    calloutOffset: new ValueReader(["number"], false, defaultConfig.calloutOffset),
    calloutCornerRadius: new ValueReader(["string"], false, defaultConfig.calloutCornerRadius),
    calloutPointerWidth: new ValueReader(["string"], false, defaultConfig.calloutPointerWidth),
    calloutLineWidth: new ValueReader(["number"], false, defaultConfig.calloutLineWidth),
    calloutOpacity: new ValueReader(["number"], false, defaultConfig.calloutOpacity),

    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        showCallout: new EnumerationReader(Enabled, false, defaultConfig.showCallout),
        calloutTemplateName: new ValueReader(["string"], true),
        templateName: new ValueReader(["string"], true)
      }),
      true,
      "id"
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItemOptions(itemid) {
    return _hash["options-items"][itemid];
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    getItemOptions: getItemOptions,
    description: "Checks item callout options."
  };
}

function ConnectorsOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    arrowsDirection: new EnumerationReader(GroupByType, false, defaultConfig.arrowsDirection),
    showExtraArrows: new ValueReader(["boolean"], false, defaultConfig.showExtraArrows),
    extraArrowsMinimumSpace: new ValueReader(["number"], false, defaultConfig.extraArrowsMinimumSpace),
    connectorType: new EnumerationReader(ConnectorType, false, defaultConfig.hasOwnProperty("connectorType") ? defaultConfig.connectorType : ConnectorType.Squared),
    showNeigboursConnectorsHighlighted: new EnumerationReader(ConnectorType, false, defaultConfig.hasOwnProperty("showNeigboursConnectorsHighlighted") ? defaultConfig.showNeigboursConnectorsHighlighted : false),
    elbowType: new EnumerationReader(ElbowType, false, defaultConfig.elbowType),
    bevelSize: new ValueReader(["number"], false, defaultConfig.bevelSize),
    elbowDotSize: new ValueReader(["number"], false, defaultConfig.elbowDotSize),
    linesColor: new ValueReader(["string"], false, defaultConfig.linesColor),
    linesWidth: new ValueReader(["number"], false, defaultConfig.linesWidth),
    linesType: new EnumerationReader(LineType, false, defaultConfig.linesType),
    highlightLinesColor: new ValueReader(["string"], false, defaultConfig.highlightLinesColor),
    highlightLinesWidth: new ValueReader(["number"], false, defaultConfig.highlightLinesWidth),
    highlightLinesType: new EnumerationReader(LineType, false, defaultConfig.highlightLinesType)
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Checks connector lines drawing options."
  };
}

function OrgItemsOptionTask(optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new ObjectReader({
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        parent: new ValueReader(["string", "number"], true),
        itemType: new EnumerationReader(ItemType, false, defaultItemConfig.itemType),
        adviserPlacementType: new EnumerationReader(AdviserPlacementType, false, defaultItemConfig.adviserPlacementType),
        childrenPlacementType: new EnumerationReader(ChildrenPlacementType, false, defaultItemConfig.childrenPlacementType),
        placeAdvisersAboveChildren: new EnumerationReader(Enabled, false, defaultItemConfig.placeAdvisersAboveChildren),
        placeAssistantsAboveChildren: new EnumerationReader(Enabled, false, defaultItemConfig.placeAssistantsAboveChildren),
        isVisible: new ValueReader(["boolean"], false, defaultItemConfig.isVisible),
        isActive: new ValueReader(["boolean"], false, defaultItemConfig.isActive),
        levelOffset: new ValueReader(["number"], false, null)
      }),
      true,
      "id",
      true,
      true
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash,
      sourceHash: _sourceHash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItems() {
    return _data.items;
  }

  function getConfig(itemId) {
    return _sourceHash["options-items"][itemId];
  }

  return {
    process: process,
    getItems: getItems,
    getConfig: getConfig,
    description: "Checks items configuration options effecting their placement in layout."
  };
}

function ItemsContentOptionTask(optionsTask, defaultItemConfig) {
  var _data = {},
    _hash = {},
    _sourceHash = {};

  var _dataTemplate = new ObjectReader({
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        title: new ValueReader(["string"], true),
        description: new ValueReader(["string"], true),
        image: new ValueReader(["string"], true),
        context: new ValueReader(["string", "number", "object"], true),
        itemTitleColor: new ValueReader(["string"], false, defaultItemConfig.itemTitleColor),
        groupTitle: new ValueReader(["string"], false, defaultItemConfig.groupTitle),
        groupTitleColor: new ValueReader(["string"], false, defaultItemConfig.groupTitleColor)
      }),
      true,
      "id",
      true,
      true
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash,
      sourceHash: _sourceHash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItems() {
    return _data.items;
  }

  function getConfig(itemId) {
    return _sourceHash["options-items"][itemId];
  }

  return {
    process: process,
    getItems: getItems,
    getConfig: getConfig,
    description: "Checks items configuration options effecting their placement in layout."
  };
}

function FunctionReader() {

}
FunctionReader.prototype.read = function (target, source, path, context) {
  var result = null;

  result = (typeof source == "function") ? source : null;

  return result;
};

function ItemsSizesOptionTask(optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    /*item template options*/
    defaultTemplateName: new ValueReader(["string"], true),
    defaultLabelAnnotationTemplate: new ValueReader(["string"], true),
    hasSelectorCheckbox: new EnumerationReader(Enabled, false, defaultConfig.hasSelectorCheckbox),
    hasButtons: new EnumerationReader(Enabled, false, defaultConfig.hasButtons),
    buttonsPanelSize: new ValueReader(["number"], false, defaultConfig.buttonsPanelSize),
    groupTitlePanelSize: new ValueReader(["number"], false, defaultConfig.groupTitlePanelSize),
    groupTitlePlacementType: new EnumerationReader(AdviserPlacementType, false, defaultConfig.groupTitlePlacementType),
    checkBoxPanelSize: new ValueReader(["number"], false, defaultConfig.checkBoxPanelSize),
    selectCheckBoxLabel: new ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
    onButtonsRender: new FunctionReader(),
    /* items visibility */
    pageFitMode: new EnumerationReader(PageFitMode, false, defaultConfig.pageFitMode),
    padding: new ObjectReader({
      left: new ValueReader(["number"], false, defaultConfig.padding.left),
      top: new ValueReader(["number"], false, defaultConfig.padding.top),
      right: new ValueReader(["number"], false, defaultConfig.padding.right),
      bottom: new ValueReader(["number"], false, defaultConfig.padding.bottom)
    }, false, defaultConfig.padding),
    minimalVisibility: new EnumerationReader(Visibility, false, defaultConfig.minimalVisibility),
    selectionPathMode: new EnumerationReader(SelectionPathMode, false, defaultConfig.selectionPathMode),
    autoSizeMinimum: new ObjectReader({
      width: new ValueReader(["number"], false, defaultConfig.autoSizeMinimum.width),
      height: new ValueReader(["number"], false, defaultConfig.autoSizeMinimum.height)
    }, false, defaultConfig.autoSizeMinimum),
    autoSizeMaximum: new ObjectReader({
      width: new ValueReader(["number"], false, defaultConfig.autoSizeMaximum.width),
      height: new ValueReader(["number"], false, defaultConfig.autoSizeMaximum.height)
    }, false, defaultConfig.autoSizeMaximum),
    /* scale */
    scale: new ValueReader(["number"], false, defaultConfig.scale),
    maximumScale: new ValueReader(["number"], false, defaultConfig.maximumScale),
    minimumScale: new ValueReader(["number"], false, defaultConfig.minimumScale),
    /*intervals*/
    normalLevelShift: new ValueReader(["number"], false, defaultConfig.normalLevelShift),
    dotLevelShift: new ValueReader(["number"], false, defaultConfig.dotLevelShift),
    lineLevelShift: new ValueReader(["number"], false, defaultConfig.lineLevelShift),
    normalItemsInterval: new ValueReader(["number"], false, defaultConfig.normalItemsInterval),
    dotItemsInterval: new ValueReader(["number"], false, defaultConfig.dotItemsInterval),
    lineItemsInterval: new ValueReader(["number"], false, defaultConfig.lineItemsInterval),
    /*cousiins branches interval multiplier*/
    cousinsIntervalMultiplier: new ValueReader(["number"], false, defaultConfig.cousinsIntervalMultiplier),

    verticalAlignment: new EnumerationReader(VerticalAlignmentType, false, defaultConfig.verticalAlignment),

    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        groupTitle: new ValueReader(["string", "number"], true),
        isVisible: new ValueReader(["boolean", "number"], false, defaultItemConfig.isVisible),
        isActive: new ValueReader(["boolean", "number"], false, defaultItemConfig.isActive),
        hasSelectorCheckbox: new EnumerationReader(Enabled, false, defaultItemConfig.hasSelectorCheckbox),
        hasButtons: new EnumerationReader(Enabled, false, defaultItemConfig.hasButtons),
        templateName: new ValueReader(["string"], true)
      }),
      true,
      "id"
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItemOptions(itemid) {
    return _hash["options-items"][itemid];
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getItemOptions: getItemOptions,
    getOptions: getOptions,
    description: "Checks items size options."
  };
}

function MinimumVisibleLevelsOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    /* items visibility */
    pageFitMode: new EnumerationReader(PageFitMode, false, defaultConfig.pageFitMode),
    minimalVisibility: new EnumerationReader(Visibility, false, defaultConfig.minimalVisibility),
    minimumVisibleLevels: new ValueReader(["number"], false, defaultConfig.minimumVisibleLevels),
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Checks minimum visible levels options."
  };
}

function LabelsOptionTask(optionsTask, defaultConfig, defaultItemConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    showLabels: new EnumerationReader(Enabled, false, defaultConfig.showLabels),
    labelOffset: new ValueReader(["number"], false, defaultConfig.labelOffset),
    labelFontSize: new ValueReader(["string"], false, defaultConfig.labelFontSize),
    labelFontFamily: new ValueReader(["string"], false, defaultConfig.labelFontFamily),
    labelFontStyle: new ValueReader(["string"], false, defaultConfig.labelFontStyle),
    labelFontWeight: new ValueReader(["string"], false, defaultConfig.labelFontWeight),
    labelColor: new ValueReader(["string"], false, defaultConfig.labelColor),
    labelSize: new ObjectReader({
      width: new ValueReader(["number"], false, defaultConfig.labelSize.width),
      height: new ValueReader(["number"], false, defaultConfig.labelSize.height)
    }, false, defaultConfig.labelSize),
    labelOrientation: new EnumerationReader(TextOrientationType, false, defaultConfig.labelOrientation),
    labelPlacement: new EnumerationReader(PlacementType, false, defaultConfig.labelPlacement),
    arrowsDirection: new EnumerationReader(GroupByType, false, defaultConfig.arrowsDirection),
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        label: new ValueReader(["string", "number", "object"], true),
        showLabel: new EnumerationReader(Enabled, false, defaultItemConfig.showLabel),
        labelSize: new ObjectReader({
          width: new ValueReader(["number"], false, 0),
          height: new ValueReader(["number"], false, 0)
        }, true),
        labelOrientation: new EnumerationReader(TextOrientationType, false, defaultItemConfig.labelOrientation),
        labelPlacement: new EnumerationReader(PlacementType, false, defaultItemConfig.labelPlacement)
      }),
      true,
      "id"
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItemsOptions() {
    return _hash["options-items"];
  }

  function getItemOptions(itemid) {
    return _hash["options-items"][itemid];
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getItemOptions: getItemOptions,
    getItemsOptions: getItemsOptions,
    getOptions: getOptions,
    description: "Checks items labels options."
  };
}

function TemplatesOptionTask(optionsTask, defaultConfig, defaultTemplateConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    groupTitleVerticalAlignment: new EnumerationReader(VerticalAlignmentType, false, defaultConfig.groupTitleVerticalAlignment),
    groupTitleHorizontalAlignment: new EnumerationReader(HorizontalAlignmentType, false, defaultConfig.groupTitleHorizontalAlignment),
    groupTitleOrientation: new EnumerationReader(TextOrientationType, false, defaultConfig.groupTitleOrientation),
    groupTitleFontSize: new ValueReader(["string"], false, defaultConfig.groupTitleFontSize),
    groupTitleFontFamily: new ValueReader(["string"], false, defaultConfig.groupTitleFontFamily),
    groupTitleColor: new ValueReader(["string"], false, defaultConfig.groupTitleColor),
    groupTitleFontWeight: new ValueReader(["string"], false, defaultConfig.groupTitleFontWeight),
    groupTitleFontStyle: new ValueReader(["string"], false, defaultConfig.groupTitleFontStyle),

    itemTitleFirstFontColor: new ValueReader(["string"], false, defaultConfig.itemTitleFirstFontColor),
    itemTitleSecondFontColor: new ValueReader(["string"], false, defaultConfig.itemTitleSecondFontColor),
    selectCheckBoxLabel: new ValueReader(["string"], false, defaultConfig.selectCheckBoxLabel),
    onItemRender: new FunctionReader(),
    onCursorRender: new FunctionReader(),
    onHighlightRender: new FunctionReader(),
    onGroupTitleRender: new FunctionReader(),
    templates: new ArrayReader(
      new ObjectReader({
        name: new ValueReader(["string"], true),
        isActive: new ValueReader(["boolean"], false, defaultTemplateConfig.isActive),
        itemSize: new ObjectReader({
          width: new ValueReader(["number"], false, defaultTemplateConfig.itemSize.width),
          height: new ValueReader(["number"], false, defaultTemplateConfig.itemSize.height)
        }, false, defaultTemplateConfig.itemSize),
        itemBorderWidth: new ValueReader(["number"], false, defaultTemplateConfig.itemBorderWidth),
        itemTemplate: new ValueReader(["string", "object"], true),
        minimizedItemShapeType: new EnumerationReader(ShapeType, true),
        minimizedItemSize: new ObjectReader({
          width: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.width),
          height: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemSize.height)
        }, false, defaultTemplateConfig.minimizedItemSize),
        minimizedItemCornerRadius: new ValueReader(["number"], true),
        minimizedItemLineWidth: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemLineWidth),
        minimizedItemBorderColor: new ValueReader(["string"], true),
        minimizedItemLineType: new EnumerationReader(LineType, false, defaultTemplateConfig.minimizedItemLineType),
        minimizedItemFillColor: new ValueReader(["string"], true),
        minimizedItemOpacity: new ValueReader(["number"], false, defaultTemplateConfig.minimizedItemOpacity),
        highlightPadding: new ObjectReader({
          left: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.left),
          top: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.top),
          right: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.right),
          bottom: new ValueReader(["number"], false, defaultTemplateConfig.highlightPadding.bottom)
        }, false, defaultTemplateConfig.highlightPadding),
        highlightBorderWidth: new ValueReader(["number"], false, defaultTemplateConfig.highlightBorderWidth),
        highlightTemplate: new ValueReader(["string", "object"], true),
        cursorPadding: new ObjectReader({
          left: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.left),
          top: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.top),
          right: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.right),
          bottom: new ValueReader(["number"], false, defaultTemplateConfig.cursorPadding.bottom)
        }, false, defaultTemplateConfig.cursorPadding),
        cursorBorderWidth: new ValueReader(["number"], false, defaultTemplateConfig.cursorBorderWidth),
        cursorTemplate: new ValueReader(["string", "object"], true),
        hasButtons: new EnumerationReader(Enabled, false, defaultTemplateConfig.hasButtons),
        onButtonsRender: new FunctionReader()
      }),
      true,
      "name"
    )
  });


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Checks items template options."
  };
}

function OrientationOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    orientationType: new EnumerationReader(OrientationType, false, defaultConfig.orientationType)
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Checks diagram orientation options."
  };
}

function OrgVisualTreeOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    alignBranches: new ValueReader(["boolean"], false, defaultConfig.alignBranches),
    leavesPlacementType: new EnumerationReader(ChildrenPlacementType, false, defaultConfig.leavesPlacementType),
    childrenPlacementType: new EnumerationReader(ChildrenPlacementType, false, defaultConfig.childrenPlacementType),
    placeAdvisersAboveChildren: new ValueReader(["boolean"], false, defaultConfig.placeAdvisersAboveChildren),
    placeAssistantsAboveChildren: new ValueReader(["boolean"], false, defaultConfig.placeAssistantsAboveChildren),
    maximumColumnsInMatrix: new ValueReader(["number"], false, defaultConfig.maximumColumnsInMatrix),
    horizontalAlignment: new EnumerationReader(HorizontalAlignmentType, false, defaultConfig.horizontalAlignment)
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Checks items layout options."
  };
}

function MinimizedItemsOptionTask(optionsTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    minimizedItemShapeType: new EnumerationReader(ShapeType, true),
    items: new ArrayReader(
      new ObjectReader({
        id: new ValueReader(["string", "number"], true),
        minimizedItemShapeType: new EnumerationReader(ShapeType, true),
        itemTitleColor: new ValueReader(["string"], true)
      }),
      true,
      "id"
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getItemOptions(itemid) {
    return _hash["options-items"][itemid];
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getItemOptions: getItemOptions,
    getOptions: getOptions,
    description: "Checks minimized items drawing options."
  };
}

function CursorItemOptionTask(optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new ObjectReader({
    cursorItem: new ValueReader(["string", "number"], true),
    navigationMode: new EnumerationReader(NavigationMode, false, defaultConfig.navigationMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getCursorItem() {
    return _data.cursorItem;
  }

  function hasCursorEnabled() {
    switch (_data.navigationMode) {
      case NavigationMode.Default:
      case NavigationMode.CursorOnly:
        return true;
    }
    return false;
  }

  return {
    process: process,
    getCursorItem: getCursorItem,
    hasCursorEnabled: hasCursorEnabled,
    description: "Checks currenct cursor item option."
  };
}

function HighlightItemOptionTask(optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new ObjectReader({
    highlightItem: new ValueReader(["string", "number"], true),
    navigationMode: new EnumerationReader(NavigationMode, false, defaultConfig.navigationMode),
    highlightGravityRadius: new ValueReader(["number"], false, defaultConfig.highlightGravityRadius)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getHighlightItem() {
    return _data.highlightItem;
  }

  function getGravityRadius() {
    return _data.highlightGravityRadius;
  }

  function hasHighlightEnabled() {
    switch (_data.navigationMode) {
      case NavigationMode.Default:
      case NavigationMode.HighlightOnly:
        return true;
    }
    return false;
  }

  return {
    process: process,
    getHighlightItem: getHighlightItem,
    hasHighlightEnabled: hasHighlightEnabled,
    getGravityRadius: getGravityRadius,
    description: "Checks highlight item option."
  };
}

function SelectedItemsOptionTask(optionsTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    selectedItems: new ArrayReader(
      new ValueReader(["string", "number"], true),
      true
    )
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      options = optionsTask.getOptions();

    _data = _dataTemplate.read(_data, options, "options", context);
    return context.isChanged;
  }

  function getSelectedItems() {
    return _data.selectedItems;
  }

  return {
    process: process,
    getSelectedItems: getSelectedItems,
    description: "Checks user selected items option."
  };
}

function CursorSelectionPathModeOptionTask(optionsTask, defaultConfig) {
  var _data = {};

  var _dataTemplate = new ObjectReader({
    selectionPathMode: new EnumerationReader(SelectionPathMode, false, defaultConfig.selectionPathMode)
  });

  function process() {
    var context = {
      isChanged: false
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getSelectionPathMode() {
    return _data.selectionPathMode;
  }

  return {
    process: process,
    getSelectionPathMode: getSelectionPathMode,
    description: "Checks cursor selection path option."
  };
}

function SplitAnnotationsOptionTask(optionsTask) {
  var _data = {
    annotations: {}
  };

  function process() {
    var options = optionsTask.getOptions(),
      annotations = options.annotations,
      index, len,
      annotationConfig,
      annotationType,
      zOrderType,
      key,
      hash = {};

    if (Array.isArray(annotations)) {
      for (index = 0, len = annotations.length; index < len; index += 1) {
        annotationConfig = annotations[index];
        annotationType = annotationConfig.annotationType;

        switch (annotationType) {
          case AnnotationType.Shape:
          case AnnotationType.Connector:
          case AnnotationType.HighlightPath:
            switch (annotationConfig.zOrderType) {
              case ZOrderType.Background:
                zOrderType = ZOrderType.Background;
                break;
              case ZOrderType.Foreground:
              case ZOrderType.Auto: //ignore jslint
              default:
                zOrderType = ZOrderType.Foreground;
                break;
            }
            break;
          case AnnotationType.Background:
          case AnnotationType.Label: //ignore jslint
          default:
            zOrderType = null;
            break;
        }

        if (annotationType != null) {
          key = annotationType * 1000 + (zOrderType || 0);

          if (!hash.hasOwnProperty(key)) {
            hash[key] = [];
          }
          hash[key].push(annotationConfig);
        }
      }
    }

    _data.annotations = hash;

    return true;
  }

  function getAnnotations(annotationType, zOrderType) {
    var key = annotationType * 1000 + (zOrderType || 0);
    return _data.annotations[key];
  }

  return {
    process: process,
    getAnnotations: getAnnotations
  };
}

function ShapeAnnotationOptionTask(splitAnnotationsOptionTask, defaultShapeAnnotationConfig, zOrderType) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      zOrderType: new EnumerationReader(ZOrderType, false, defaultShapeAnnotationConfig.zOrderType),
      items: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      ),
      shapeType: new EnumerationReader(ShapeType, false, defaultShapeAnnotationConfig.shapeType),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultShapeAnnotationConfig.offset.bottom)
      }, false, defaultShapeAnnotationConfig.offset),
      lineWidth: new ValueReader(["number"], false, defaultShapeAnnotationConfig.lineWidth),
      cornerRadius: new ValueReader(["string"], false, defaultShapeAnnotationConfig.cornerRadius),
      opacity: new ValueReader(["number"], false, defaultShapeAnnotationConfig.opacity),
      borderColor: new ValueReader(["string"], false, defaultShapeAnnotationConfig.borderColor),
      fillColor: new ValueReader(["string"], false, defaultShapeAnnotationConfig.fillColor),
      lineType: new EnumerationReader(LineType, false, defaultShapeAnnotationConfig.lineType),
      selectItems: new ValueReader(["boolean"], false, defaultShapeAnnotationConfig.selectItems),
      label: new ValueReader(["string", "object"], false, defaultShapeAnnotationConfig.label),
      labelSize: new ObjectReader({
        width: new ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.width),
        height: new ValueReader(["number"], false, defaultShapeAnnotationConfig.labelSize.height)
      }, false, defaultShapeAnnotationConfig.labelSize),
      labelPlacement: new EnumerationReader(PlacementType, false, defaultShapeAnnotationConfig.labelPlacement),
      labelOffset: new ValueReader(["number"], false, defaultShapeAnnotationConfig.labelOffset)
    },
      false
    )
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Shape, zOrderType), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _annotations;
  }

  return {
    process: process,
    getAnnotations: getAnnotations
  };
}

function HighlightPathAnnotationOptionTask(splitAnnotationsOptionTask, defaultHighlightPathAnnotationConfig, zOrderType) {
  var _annotations = [],
    _hash = {};

  var _dataAnnotationsTemplate = new ArrayReader(
    new ObjectReader({
      zOrderType: new EnumerationReader(ZOrderType, false, defaultHighlightPathAnnotationConfig.zOrderType),
      lineWidth: new ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.lineWidth),
      opacity: new ValueReader(["number"], false, defaultHighlightPathAnnotationConfig.opacity),
      color: new ValueReader(["string"], false, defaultHighlightPathAnnotationConfig.color),
      lineType: new EnumerationReader(LineType, false, defaultHighlightPathAnnotationConfig.lineType),
      items: new ArrayReader(
        new ValueReader(["string", "number"], true),
        false
      ),
      selectItems: new ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.selectItems),
      showArrows: new ValueReader(["boolean"], false, defaultHighlightPathAnnotationConfig.showArrows)
    },
      false)
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataAnnotationsTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.HighlightPath, zOrderType), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _annotations;
  }

  return {
    process: process,
    getAnnotations: getAnnotations
  };
}

function ConnectorAnnotationOptionTask(splitAnnotationsOptionTask, defaultConnectorAnnotationConfig, zOrderType) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      zOrderType: new EnumerationReader(ZOrderType, false, defaultConnectorAnnotationConfig.zOrderType),
      fromItem: new ValueReader(["string", "number"], true),
      toItem: new ValueReader(["string", "number"], true),
      connectorShapeType: new EnumerationReader(ShapeType, false, defaultConnectorAnnotationConfig.connectorShapeType),
      connectorPlacementType: new EnumerationReader(ConnectorPlacementType, false, defaultConnectorAnnotationConfig.connectorPlacementType),
      labelPlacementType: new EnumerationReader(ConnectorLabelPlacementType, false, defaultConnectorAnnotationConfig.labelPlacementType),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.offset.bottom)
      }, false, defaultConnectorAnnotationConfig.offset),
      lineWidth: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.lineWidth),
      color: new ValueReader(["string"], false, defaultConnectorAnnotationConfig.color),
      lineType: new EnumerationReader(LineType, false, defaultConnectorAnnotationConfig.lineType),
      selectItems: new ValueReader(["boolean"], false, defaultConnectorAnnotationConfig.selectItems),
      label: new ValueReader(["string", "object"], false, defaultConnectorAnnotationConfig.label),
      labelSize: new ObjectReader({
        width: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.width),
        height: new ValueReader(["number"], false, defaultConnectorAnnotationConfig.labelSize.height)
      }, false, defaultConnectorAnnotationConfig.labelSize)
    }),
    false
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Connector, zOrderType), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _annotations;
  }

  return {
    process: process,
    getAnnotations: getAnnotations
  };
}

function BackgroundAnnotationOptionTask(splitAnnotationsOptionTask, defaultBackgroundAnnotationConfig) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      items: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      ),
      includeChildren: new ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.includeChildren),
      zOrderType: new EnumerationReader(ZOrderType, false, defaultBackgroundAnnotationConfig.zOrderType),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.offset.bottom)
      }, false, defaultBackgroundAnnotationConfig.offset),
      lineWidth: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.lineWidth),
      opacity: new ValueReader(["number"], false, defaultBackgroundAnnotationConfig.opacity),
      borderColor: new ValueReader(["string"], false, defaultBackgroundAnnotationConfig.borderColor),
      fillColor: new ValueReader(["string"], false, defaultBackgroundAnnotationConfig.fillColor),
      lineType: new EnumerationReader(LineType, false, defaultBackgroundAnnotationConfig.lineType),
      selectItems: new ValueReader(["boolean"], false, defaultBackgroundAnnotationConfig.selectItems)
    }),
    false
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Background, null), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _annotations;
  }

  return {
    process: process,
    getAnnotations: getAnnotations
  };
}

function LevelAnnotationOptionTask(splitAnnotationsOptionTask, defaultLevelAnnotationConfig) {
  var _annotations = [],
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ObjectReader({
      levels: new ArrayReader(
        new ValueReader(["string", "number"], true),
        true
      ),
      title: new ValueReader(["string"], true),
      titleFontColor: new ValueReader(["string"], true),
      titleColor: new ValueReader(["string"], true),
      offset: new ObjectReader({
        left: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.left),
        top: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.top),
        right: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.right),
        bottom: new ValueReader(["number"], false, defaultLevelAnnotationConfig.offset.bottom)
      }, false, defaultLevelAnnotationConfig.offset),
      lineWidth: new ObjectReader({
        left: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.left),
        top: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.top),
        right: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.right),
        bottom: new ValueReader(["number"], false, defaultLevelAnnotationConfig.lineWidth.bottom)
      }, false, defaultLevelAnnotationConfig.lineWidth),
      opacity: new ValueReader(["number"], false, defaultLevelAnnotationConfig.opacity),
      borderColor: new ValueReader(["string"], true),
      fillColor: new ValueReader(["string"], false, defaultLevelAnnotationConfig.fillColor),
      lineType: new EnumerationReader(LineType, false, defaultLevelAnnotationConfig.lineType)
    }),
    false
  );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _annotations = _dataTemplate.read(_annotations, splitAnnotationsOptionTask.getAnnotations(AnnotationType.Level, null), "annotations", context);

    return context.isChanged;
  }

  function getAnnotations() {
    return _annotations;
  }

  return {
    process: process,
    getAnnotations: getAnnotations,
    description: "Collects Level Annotations"
  };
}

function ScaleOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    scale: new ValueReader(["number"], false, defaultConfig.scale),
    minimumScale: new ValueReader(["number"], false, defaultConfig.minimumScale),
    maximumScale: new ValueReader(["number"], false, defaultConfig.maximumScale)
  });
  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Checks control scale options."
  };
}

function FrameOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    showFrame: new ValueReader(["boolean"], false, defaultConfig.showFrame),
    frameInnerPadding: new ObjectReader({
      left: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.left),
      top: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.top),
      right: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.right),
      bottom: new ValueReader(["number"], false, defaultConfig.frameInnerPadding.bottom)
    }, false, defaultConfig.frameInnerPadding),
    frameOuterPadding: new ObjectReader({
      left: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.left),
      top: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.top),
      right: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.right),
      bottom: new ValueReader(["number"], false, defaultConfig.frameOuterPadding.bottom)
    }, false, defaultConfig.frameOuterPadding)
  });
  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Checks frame options."
  };
}

function LevelTitlePlacementOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    levelTitlePlaceInside: new ValueReader(["boolean"], false, defaultConfig.levelTitlePlaceInside),
    levelTitlePanelSize: new ValueReader(["number"], false, defaultConfig.levelTitlePanelSize),
    levelTitlePlacementType: new EnumerationReader(AdviserPlacementType, false, defaultConfig.levelTitlePlacementType)
  });
  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Level annotation title placement options."
  };
}

function LevelTitleTemplateOptionTask(optionsTask, defaultConfig) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    levelTitleOrientation: new EnumerationReader(TextOrientationType, false, defaultConfig.levelTitleOrientation),
    levelTitleVerticalAlignment: new EnumerationReader(VerticalAlignmentType, false, defaultConfig.levelTitleVerticalAlignment),
    levelTitleHorizontalAlignment: new EnumerationReader(HorizontalAlignmentType, false, defaultConfig.levelTitleHorizontalAlignment),
    levelTitleFontSize: new ValueReader(["string"], false, defaultConfig.levelTitleFontSize),
    levelTitleFontFamily: new ValueReader(["string"], false, defaultConfig.levelTitleFontFamily),
    levelTitleFontColor: new ValueReader(["string"], false, defaultConfig.levelTitleFontColor),
    levelTitleColor: new ValueReader(["string"], false, defaultConfig.levelTitleColor),
    levelTitleFontWeight: new ValueReader(["string"], false, defaultConfig.levelTitleFontWeight),
    levelTitleFontStyle: new ValueReader(["string"], false, defaultConfig.levelTitleFontStyle),
    onLevelTitleRender: new FunctionReader(),
    onLevelBackgroundRender: new FunctionReader()
  });
  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, optionsTask.getOptions(), "options", context);

    return context.isChanged;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Level annotation title template options."
  };
}

function CombinedContextsTask(task1, task2) {
  function process() {
    return true;
  }

  function getConfig(itemId) {
    return task1.getConfig(itemId) || (task2 != null && task2.getConfig(itemId));
  }

  return {
    process: process,
    getConfig: getConfig
  };
}

/* This is model class is used to define intermediate organizational chart structure */
function OrgItem(options) {
  var index, len,
    property;

  this.id = null; // Unique org item id. 

  this.isVisible = true; // If it is true then item is shown and selectable in hierarchy. 
  this.isActive = true; // If it is true then item is clickable in hierarchy. 

  this.itemType = ItemType.Regular; // This property defines how item should be placed in chart. 
  this.adviserPlacementType = AdviserPlacementType.Auto; // Left or Right placement relative to parent
  this.childrenPlacementType = ChildrenPlacementType.Auto; // Children shape

  this.placeAdvisersAboveChildren = Enabled.Auto;
  this.placeAssistantsAboveChildren = Enabled.Auto;
  this.levelOffset = null;

  this.level = null;
  this.hideParentConnection = false;
  this.hideChildrenConnection = false;

  /* org tree balancing properties */
  this.childIndex = null; // Item index in array of parent's children

  // Following properties we copy from user's item config to new OrgItem instance
  // If user's property is undefined we take default value from OrgItemConfig
  var properties = [
    'id', 'parent', 'isVisible', 'isActive',
    'itemType', 'adviserPlacementType', 'childrenPlacementType',
    'placeAdvisersAboveChildren', 'placeAssistantsAboveChildren',
    'levelOffset'
  ];

  /* copy general org chart items properties */
  for (index = 0, len = properties.length; index < len; index += 1) {
    property = properties[index];

    if (options.hasOwnProperty(property)) {
      this[property] = options[property];
    }
  }
}

function OrgTreeTask(itemsOptionTask) {
  var _data = {
    orgTree: null, /*Tree OrgItem */
    maximumId: null /* maximum of OrgItem.id */
  };

  function process() {
    createOrgTree(itemsOptionTask.getItems());

    return true;
  }

  function createOrgTree(items) {
    var orgItem,
      orgItemRoot,
      userItem,
      index, len,
      maximumId = 0,
      parsedId,
      // Organizational chart definition 
      orgTree = Tree(),
      rootItemConfig;

    /* convert items to hash table */
    for (index = 0, len = items.length; index < len; index += 1) {
      userItem = items[index];
      /* user should define unique id for every OrgItemConfig otherwise we ignore it
        if parent does not exists in the tree then item is considered as root item
      */
      if (userItem.id != null) {
        /* Organizational chart OrgItemConfig is almost the same as OrgItem 
          except options used to draw connectors in multi parent chart
        */
        orgItem = new OrgItem(userItem);

        // OrgItem id coincides with OrgItemConfig id since we don't add any new org items to user's org chart definition
        parsedId = parseInt(userItem.id, 10);
        maximumId = Math.max(isNaN(parsedId) ? 0 : parsedId, maximumId);

        // Collect org items
        orgTree.add(userItem.parent, orgItem.id, orgItem);

        /* We ignore looped items, it is applications responsibility to control data consistency */
      }
    }
    /* create chart root item config */
    maximumId += 1;

    rootItemConfig = new OrgItemConfig();
    rootItemConfig.id = maximumId;
    rootItemConfig.title = "internal root";
    rootItemConfig.isVisible = false;
    rootItemConfig.isActive = false;

    /* create chart org root item */
    orgItemRoot = new OrgItem(rootItemConfig);
    orgItemRoot.hideParentConnection = true;
    orgItemRoot.hideChildrenConnection = true;
    /* if user needs custom root item layout, it should explicitly create invisible node and set its children layout manually up */
    orgItemRoot.childrenPlacementType = ChildrenPlacementType.Horizontal; 

    orgTree.add(null, orgItemRoot.id, orgItemRoot);

    orgTree.loopLevels(this, function (nodeid, node, levelid) {
      if (levelid > 0) {
        return orgTree.BREAK;
      }
      if (orgItemRoot.id != nodeid) {
        orgTree.adopt(orgItemRoot.id, nodeid);

        /* root item must be regular */
        node.itemType = ItemType.Regular;
      }
    });

    hideRootConnectors(orgTree);

    _data.orgTree = orgTree;
    _data.maximumId = maximumId;

    return true;
  }

  function hideRootConnectors(orgTree) {
    orgTree.loopLevels(this, function (nodeid, node, levelid) {
      var allRegular = true;
      if (!node.isVisible) {
        orgTree.loopChildren(this, nodeid, function (childid, child, index) {
          if (child.itemType != ItemType.Regular) {
            allRegular = false;
            return true; // break
          }
        }); //ignore jslint

        if (allRegular) {
          node.hideChildrenConnection = true;

          orgTree.loopChildren(this, nodeid, function (childid, child, index) {
            child.hideParentConnection = true;
          });
        } else {
          return orgTree.SKIP; // skip children
        }
      } else {
        return orgTree.SKIP;
      }
    });
  }

  function getOrgTree() {
    return _data.orgTree;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  return {
    process: process,
    getOrgTree: getOrgTree,
    getMaximumId: getMaximumId
  };
}

function Template(templateConfig, itemTemplate, highlightTemplate, dotHighlightTemplate, cursorTemplate) {
  this.templateConfig = templateConfig;
  this.itemTemplate = itemTemplate;
  this.highlightTemplate = highlightTemplate;
  this.dotHighlightTemplate = dotHighlightTemplate;
  this.cursorTemplate = cursorTemplate;
}

function ReadTemplatesTask(templatesOptionTask, defaultTemplates) {
  var _data = {
    templates: {},
    itemTemplates: []
  },
    _defaultWidgetTemplateName = "DefaultWidgetTemplate",
    _defaultWidgetLabelAnnotationTemplateName = "DefaultWidgetLabelAnnotationTemplate";

  function process() {
    var index, len,
      templateConfig,
      options = templatesOptionTask.getOptions(),
      templates = options.templates;


    _data.templates = {};
    _data.itemTemplates = [];

    templateConfig = new TemplateConfig();

    _data.templates[_defaultWidgetTemplateName] = new Template(
      templateConfig,
      new defaultTemplates.ItemTemplate(options, templateConfig),
      new defaultTemplates.HighlightTemplate(options, templateConfig),
      new defaultTemplates.DotHighlightTemplate(options, templateConfig),
      new defaultTemplates.CursorTemplate(options, templateConfig)
    );

    _data.itemTemplates.push(_data.templates[_defaultWidgetTemplateName]);

    templateConfig = getLabelAnnotationTemplateConfig(_defaultWidgetLabelAnnotationTemplateName);

    _data.templates[_defaultWidgetLabelAnnotationTemplateName] = new Template(
      templateConfig,
      new defaultTemplates.LabelAnnotationTemplate(),
      null,
      new defaultTemplates.DotHighlightTemplate(options, templateConfig),
      null
    );

    for (index = 0, len = templates.length; index < len; index += 1) {
      templateConfig = templates[index];

      _data.templates[templateConfig.name] = new Template(
        templateConfig,
        isNullOrEmpty(templateConfig.itemTemplate) ?
          new defaultTemplates.ItemTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.itemTemplate, options.onItemRender),
        isNullOrEmpty(templateConfig.highlightTemplate) ?
          new defaultTemplates.HighlightTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.highlightTemplate, options.onHighlightRender),
        new defaultTemplates.DotHighlightTemplate(options, templateConfig),
        isNullOrEmpty(templateConfig.cursorTemplate) ?
          new defaultTemplates.CursorTemplate(options, templateConfig) :
          new defaultTemplates.UserTemplate(options, templateConfig.cursorTemplate, options.onCursorRender)
      );

      _data.itemTemplates.push(_data.templates[templateConfig.name]);
    }

    return true;
  }

  function getLabelAnnotationTemplateConfig(name) {
    var config = new TemplateConfig();
    config.name = name;
    config.isActive = false;
    config.itemSize = new Size(100, 20);
    config.minimizedItemSize = new Size(0, 0);
    config.minimizedItemCornerRadius = config.minimizedItemSize.width / 2;
    return config;
  }

  function getTemplate(templateName1, templateName2, templateName3) {
    var result = _data.templates[templateName1] || _data.templates[templateName2] || _data.templates[templateName3];
    return result;
  }

  function getItemTemplates() {
    return _data.itemTemplates;
  }

  return {
    process: process,
    getTemplate: getTemplate,
    getItemTemplates: getItemTemplates,
    DefaultWidgetTemplateName: _defaultWidgetTemplateName,
    DefaultWidgetLabelAnnotationTemplateName: _defaultWidgetLabelAnnotationTemplateName
  };
}

function ActiveItemsTask(itemsSizesOptionTask, readTemplatesTask) {
  var _data = {
    items: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ValueReader(["string", "number"], true),
    true
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      itemsSizesOptions = itemsSizesOptionTask.getOptions(),
      items = itemsSizesOptions.items;

    _data.items = _dataTemplate.read(_data.items, collectActiveItems(itemsSizesOptions, items), "items", context);

    return context.isChanged;
  }

  function collectActiveItems(itemsSizesOptions, items) {
    var result = [],
      index, len;
    for (index = 0, len = items.length; index < len; index += 1) {
      var itemConfig = items[index],
        template = readTemplatesTask.getTemplate(itemConfig.templateName, itemsSizesOptions.defaultTemplateName, readTemplatesTask.DefaultWidgetTemplateName),
        templateConfig = template.templateConfig,
        isActive = itemConfig.isActive && templateConfig.isActive;

      if (isActive) {
        result.push(itemConfig.id);
      }
    }
    return result;
  }

  function getActiveItems() {
    return _hash.items;
  }

  return {
    process: process,
    getActiveItems: getActiveItems
  };
}

function TemplateParams() {
  this.template = null;
  this.isActive = false;
  this.hasSelectorCheckbox = false;
  this.hasButtons = false;
  this.hasGroupTitle = false;
  this.onButtonsRender = null;
}

function ItemTemplateParamsTask(itemsSizesOptionTask, cursorItemOptionTask, readTemplatesTask) {
  var _data = {
    items: {} // TemplateParams
  };

  function process() {
    var itemsSizesOptions = itemsSizesOptionTask.getOptions(),
      cursorItem = cursorItemOptionTask.getCursorItem(),
      items = itemsSizesOptions.items,
      index, len;

    _data.items = {};

    for (index = 0, len = items.length; index < len; index += 1) {
      var itemConfig = items[index],
        templateParams = new TemplateParams(),
        isCursor = (cursorItem == itemConfig.id),
        template = readTemplatesTask.getTemplate(itemConfig.templateName, itemsSizesOptions.defaultTemplateName, readTemplatesTask.DefaultWidgetTemplateName),
        templateConfig = template.templateConfig,
        hasButtonsRender = itemsSizesOptions.onButtonsRender != null || templateConfig.onButtonsRender != null;

      templateParams.template = template;

      templateParams.isActive = itemConfig.isActive && templateConfig.isActive;
      if (templateParams.isActive) {
        templateParams.hasSelectorCheckbox = getSelectionVisibility(isCursor, itemConfig.hasSelectorCheckbox, itemsSizesOptions.hasSelectorCheckbox);
        templateParams.hasButtons = (templateConfig.hasButtons !== Enabled.Auto) ? (templateConfig.hasButtons == Enabled.True) : (hasButtonsRender && getSelectionVisibility(isCursor, itemConfig.hasButtons, itemsSizesOptions.hasButtons));
        if (templateParams.hasButtons) {
          templateParams.onButtonsRender = templateConfig.onButtonsRender || itemsSizesOptions.onButtonsRender;
        }
      }
      templateParams.hasGroupTitle = !isNullOrEmpty(itemConfig.groupTitle);
      _data.items[itemConfig.id] = templateParams;
    }
    return true;
  }

  function getSelectionVisibility(isCursor, itemState, widgetState) {
    var result = false;
    switch (itemState) {
      case Enabled.Auto:
        switch (widgetState) {
          case Enabled.Auto:
            result = isCursor;
            break;
          case Enabled.True:
            result = true;
            break;
          case Enabled.False:
            result = false;
            break;
        }
        break;
      case Enabled.True:
        result = true;
        break;
      case Enabled.False:
        result = false;
        break;
    }
    return result;
  }

  function getTemplateParams(orgItemId) {
    return _data.items[orgItemId];
  }

  return {
    process: process,
    getTemplateParams: getTemplateParams
  };
}

function GroupTitleTemplateTask(templatesOptionTask, templates) {
  var _data = {
    template: null
  };

  function process() {
    _data.template = null;
    return true;
  }

  function getTemplate() {
    var options;
    if (_data.template == null) {
      options = templatesOptionTask.getOptions();
      var { onGroupTitleRender } = options;
      if(onGroupTitleRender != null) {
        _data.template = new templates.CustomRenderTemplate(options, onGroupTitleRender);  
      } else {
        _data.template = new templates.GroupTitleTemplate(options);
      }
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
}

function CheckBoxTemplateTask(itemsSizesOptionTask, templates) {
  var _data = {
    template: null
  };

  function process() {
    _data.template = null;
    return true;
  }

  function getTemplate() {
    var options;
    if (_data.template == null) {
      options = itemsSizesOptionTask.getOptions();
      _data.template = new templates.CheckBoxTemplate(options.selectCheckBoxLabel);
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
}

function ButtonsTemplateTask(itemsSizesOptionTask, templates) {
  var _data = {
    template: null
  };

  function process() {
    return false;
  }

  function getTemplate() {
    if (_data.template == null) {
      _data.template = new templates.ButtonsTemplate;
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
}

function AnnotationLabelTemplateTask(itemsSizesOptionTask, templates) {
  var _data = {
    template: null
  };

  function process() {
    return false;
  }

  function getTemplate() {
    if (_data.template == null) {
      _data.template = new templates.AnnotationLabelTemplate();
    }
    return _data.template;
  }

  return {
    process: process,
    getTemplate: getTemplate
  };
}

function LevelAnnotationTemplateTask(orientationOptionTask, levelTitleTemplateOptionTask, templates) {
  var _data = {
    backgroundTemplate: null,
    titleTemplate: null
  };

  function process() {
    _data.backgroundTemplate = null;
    _data.titleTemplate = null;
    return true;
  }

  function getBackgroundTemplate() {
    var options;
    if (_data.backgroundTemplate == null) {
      options = levelTitleTemplateOptionTask.getOptions();
      var { onLevelBackgroundRender } = options;
      if( onLevelBackgroundRender != null ) {
        _data.backgroundTemplate = new templates.CustomRenderTemplate(options, onLevelBackgroundRender);  
      } else {
        _data.backgroundTemplate = new templates.LevelBackgroundTemplate(options);
      }
    }
    return _data.backgroundTemplate;
  }

  function getTitleTemplate() {
    var options;
    if (_data.titleTemplate == null) {
      var { orientationType: orientation } = orientationOptionTask.getOptions();
      options = levelTitleTemplateOptionTask.getOptions();
      var { onLevelTitleRender } = options;
      if( onLevelTitleRender != null ) {
        _data.titleTemplate = new templates.CustomRenderTemplate(options, onLevelTitleRender);  
      } else {
        _data.titleTemplate = new templates.LevelTitleTemplate(options, orientation);
      }
    }
    return _data.titleTemplate;
  }

  return {
    process: process,
    getBackgroundTemplate: getBackgroundTemplate,
    getTitleTemplate: getTitleTemplate
  };
}

var GroupType = {
    Items: 0,
    Assistants: 1,
    RowChildren: 2,
    Children: 3
};

var RowType = {
    Items: 0,
    Advisers: 1,
    SubAdvisers: 2,
    Assistants: 3,
    SubAssistants: 4,
    RowChildren: 5,
    Children: 6
  };

var RowTypeToGroupTypeMap = {};
RowTypeToGroupTypeMap[RowType.Items] = GroupType.Items;
RowTypeToGroupTypeMap[RowType.Advisers] = GroupType.Items;
RowTypeToGroupTypeMap[RowType.SubAdvisers] = GroupType.Items;
RowTypeToGroupTypeMap[RowType.Assistants] = GroupType.Assistants;
RowTypeToGroupTypeMap[RowType.SubAssistants] = GroupType.Assistants;
RowTypeToGroupTypeMap[RowType.RowChildren] = GroupType.RowChildren;
RowTypeToGroupTypeMap[RowType.Children] = GroupType.Children;

function RowKeyGenerator() {
  var _rowsHash = {};
  var _rowIndex = 1;

  function find(parentId, rowType, index) {
    var key = parentId + '-' + rowType + '-' + index;
    if(!_rowsHash.hasOwnProperty(key)) {
        _rowsHash[key] = _rowIndex;
        _rowIndex+=1;
    }
    return _rowsHash[key];
  }

  function get() {
    var result = _rowIndex;
    _rowIndex+=1;
    return result;
  }

  return {
    find: find,
    get: get
  }
}

function Row(id) {
  this.id = id;
  this.rowType = RowType.Items;
  this.index = 0;
  this.offset = 0;
  this.extend = true; /* indicates that we need to keep branches of this row children above subsequent rows */
  this.depth = 0;
  
  this.groups = [];
  this.groups[GroupType.Items] = [[1,1]];
  
  this.getDepth = function() {
    var [currExtend, currDepth] = this.groups.reduce((acc, row) => {
        return row.reduce(([currExtend, currDepth], item) => {
          var [extend, depth] = item || [1, 1];
          return [currExtend + extend, Math.max(currDepth, currExtend + depth)];
        }, acc)
    }, [0,0]);
    return Math.max(currExtend, currDepth) || 1;
  };


  this.addRowDepth = function(rowType, extend, index, depth) {
    var groupIndex = RowTypeToGroupTypeMap[rowType];
    if(!this.groups[groupIndex]) {
      this.groups[groupIndex] = [];
    }
    var rows = this.groups[groupIndex];
    var [currExtend, currDepth] = rows[index] || [1,1];
    rows[index] = [Math.max(currExtend, extend ? depth : 1), Math.max(currDepth, depth)];
  };
}

function BranchAligner() {
  var _rowsTree = Tree();
  var _rowKeyGenerator = RowKeyGenerator();
  var _rowHash = {}; // rowHash[nodeId] = rowKey;

  function _createParentRow(parentNodeId) {
      var parentRowId = _rowKeyGenerator.find(null, RowType.Children, 0);
      var parentRow = new Row(parentRowId);
      parentRow.rowType = RowType.Items;
      parentRow.index = 0;
      parentRow.offset = 0;
      parentRow.extend = false;
      _rowsTree.add(null, parentRowId, parentRow);
      _rowHash[parentNodeId] = parentRowId;
      return parentRowId;
  }

  function mergeToParent(parentNodeId, nodes) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    nodes.forEach(child => {
        _rowHash[child.id] = parentRowId;
    });
  }

  function mergeToChild(parentNodeId, nodes, rowType, index, offset, extendChildren) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    var rowId = _rowKeyGenerator.find(parentRowId, rowType, index);
    _add(parentRowId, rowId, nodes, rowType, index, offset, extendChildren);
  }

  function addChild(parentNodeId, nodes, rowType, index, offset, extendChildren) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    var rowId = _rowKeyGenerator.get();
    _add(parentRowId, rowId, nodes, rowType, index, offset, extendChildren);
  }

  function addSplitChildren(parentNodeId, nodes, rowType, index, offset) {
    var parentRowId = _rowHash[parentNodeId] || _createParentRow(parentNodeId);
    nodes.forEach(child => {
      var rowId = _rowKeyGenerator.get();
      var row = new Row(rowId);
      row.extend = false;
      row.index = index || 0;
      row.offset = offset || 0;
      row.rowType = rowType;
      _rowsTree.add(parentRowId, rowId, row);
      _rowHash[child.id] = rowId;
    });
  }

  function _add(parentRowId, rowId, nodes, rowType, index, offset, extendChildren) {
    var row = _rowsTree.node(rowId);
    if(!row) {
      row = new Row(rowId);
      row.extend = extendChildren;
      row.index = index || 0;
      row.offset = offset || 0;
      row.rowType = rowType;
      _rowsTree.add(parentRowId, rowId, row);
    }
    nodes.forEach(child => {
      _rowHash[child.id] = rowId;
    });
  }

  /* measure depth of rows in rowsTree, count number of assistants and child rows, find depth of partner's branches */
  function align(debug) {
    _rowsTree.loopPostOrder(this, function (rowId, row, parentRowId, parentRow) {
        row.depth = row.getDepth() + row.offset;
        if(parentRow != null) {
            parentRow.addRowDepth(row.rowType, row.extend, row.index, row.depth);
        }
    });
  }

  // function loopGroupTypes(rowType, len)
  function loopGroupTypes(thisArg, nodeId, onGroupType) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    if(row) {
      for(var index = 0, len = row.groups.length; index < len; index+=1) {
        if(row.groups[index]) {
          if(onGroupType.call(thisArg, index, len)) {
            break;
          }
        }
      }
    }
  }    

  function getRowDepth(nodeId, groupType, index) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    var childRow = (row.groups[groupType] || [])[index];
    return (childRow && childRow[0]) || 1;
  }

  function getGroupSize(nodeId, groupType) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    if(row) {
      if(row.groups.hasOwnProperty(groupType)){
        return row.groups[groupType].length; 
      } 
    }
    return 0;
  }  

  function getRowsDepth(nodeId, groupType) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    var children = row.groups[groupType] || [];
    return children.map(item => item[0]);
  }

  // function onRow(rowDepth, index)
  function loopRows(thisArg, nodeId, rowType, onRow) {
    var rowId = _rowHash[nodeId];
    var row = _rowsTree.node(rowId);
    var groupIndex = RowTypeToGroupTypeMap[rowType];
    var children = row.groups[groupIndex] || [];
    for(var index = 0; index < children.length; index+=1) {
      var childRow = children[index];
      if(childRow) {
        if(onRow.call(thisArg, childRow[0], index)) {
          break;
        }
      }
    }
  }

  return {
      mergeToParent: mergeToParent,
      mergeToChild: mergeToChild,
      addChild: addChild,
      addSplitChildren: addSplitChildren,
      align: align,
      loopGroupTypes: loopGroupTypes,
      getRowDepth: getRowDepth,
      getRowsDepth: getRowsDepth,
      loopRows: loopRows,
      getGroupSize: getGroupSize
  }
}

/* This is model class used to define visual structure of the chart */
function TreeItem() {
  /* auto generated internal item id */
  this.id = null;

  /* Visual child id which is supposed to be straight under it */
  this.visualAggregatorId = null;

  this.partners = []; /* nodes connected with bottom line together into one family, family is group of items having common set of children */

  this.visibility = Visibility.Normal;

  this.actualItemType = null; // ItemType
  this.connectorPlacement = 0; // SideFlag
  this.gravity = 0; // HorizontalAlignmentType.Center

  /* This value is used to increase space on the left side of the item */
  this.relationDegree = 0;
}

function NodeTypeSorter() {
  var _rows = [];

  function getRow(itemType, index) {
    return (_rows[itemType] || [])[index || 0] || [];
  }

  function getRows(itemType) {
    return _rows[itemType] || [];
  }

  function addChild(itemType, levelOffset, orgItem) {
    switch (itemType) {
      case ItemType.SubAssistant:
      case ItemType.Assistant:
        levelOffset = levelOffset < 0 || levelOffset == null ? 0 : levelOffset;
        break;
      default:
        levelOffset = 0;
        break;
    }
    _rows[itemType] = _rows[itemType] || [];
    var groups = _rows[itemType];
    groups[levelOffset] = groups[levelOffset] || [];
    groups[levelOffset].push(orgItem);
  }

  return {
    addChild: addChild,
    getRow: getRow,
    getRows: getRows,
  };
}

function NodeGroupSorter() {
  var _rows = [];

  function getRow(groupType, index) {
    return (_rows[groupType] || [])[index || 0] || [];
  }

  function getRows(groupType) {
    return _rows[groupType] || [];
  }

  function getLength() {
    return _rows.length;
  }

  function _addChild(groupType, index, orgItem) {
    _rows[groupType] = _rows[groupType] || [];
    var groups = _rows[groupType];
    groups[index] = groups[index] || [];
    groups[index].push(orgItem);
  }

  function addChild(itemType, index, orgItem) {
    switch (itemType) {
      case ItemType.SubAdviser:
      case ItemType.Adviser:
        _addChild(GroupType.Items, 0, orgItem);
        break;
      case ItemType.SubAssistant:
      case ItemType.Assistant:
        index = index < 0 || index == null ? 0 : index;
        _addChild(GroupType.Assistants, index, orgItem);
        break;
      case ItemType.Regular:
        if (index < 0 || index === undefined || index === null) {
          _addChild(GroupType.Children, 0, orgItem);
        } else {
          _addChild(GroupType.RowChildren, index, orgItem);
        }
        break;
    }
  }

  return {
    addChild: addChild,
    getLength: getLength,
    getRow: getRow,
    getRows: getRows,
  };
}

function NavigationalFamily(activeItems) {
  var _activeItems = activeItems,
    _navigationFamily = Family();

  function define(parentItem, treeItem, skipFirstParent) {
    var parents = [];
    /* take parentItem when it is visible or collect all visible immediate parents of the parentItem */
    if (
      skipFirstParent ||
      !parentItem.isVisible ||
      !_activeItems.hasOwnProperty(parentItem.id)
    ) {
      if (!skipFirstParent && parentItem.isVisible) {
        parents.push(parentItem.id);
      }
      _navigationFamily.loopParents(
        this,
        parentItem.id,
        function (parentId, parent, level) {
          if (parent.isVisible) {
            parents.push(parentId);
            if (_activeItems.hasOwnProperty(parentId)) {
              return _navigationFamily.SKIP;
            }
          }
        }
      );
    } else {
      parents.push(parentItem.id);
    }
    if (_navigationFamily.node(treeItem.id) != null) {
      _navigationFamily.adopt(parents, treeItem.id);
    } else {
      _navigationFamily.add(parents, treeItem.id, treeItem);
    }
  }

  function getFamily() {
    return _navigationFamily;
  }

  return {
    define: define,
    getFamily: getFamily,
  };
}

function NodeProps() {
  this.hasVisibleChildren = false;
  this.hasPartners = false;
  this.isPartner = false;
  this.hasLeavesOnly = true;
  this.hasChildren = false;

  this.typeSorter = NodeTypeSorter();
  this.groupSorter = NodeGroupSorter();
}

/* method uses structures created in orgTreeTask to create visual tree used to render chart
  It populates visualTree structure with TreeItem objects.
*/
function VisualTreeBuilder() {
  var _treeItemCounter;

  function build(orgTree, maximumId, activeItems, options) {
    _treeItemCounter = maximumId;
    
    var {visualTree, navigationFamily, branchAligner} = createVisualTreeItems(orgTree, options, activeItems);

    return {
        visualTree: visualTree,
        navigationFamily: navigationFamily.getFamily(),
        branchAligner: branchAligner,
        treeItemCounter: _treeItemCounter
    };
  }

  function createVisualTreeItems(orgTree, options, activeItems) {
    var index,
      leftSiblingOffset,
      rightSiblingOffset,
      orgTreeProps = {},
      visualTree = Tree(), /* Tree(); key: TreeItem.id value: TreeItem */
      navigationFamily = NavigationalFamily(activeItems); /* Family structure where key: TreeItem.id and value: TreeItem */
   
    /* stage 1: orgTreeProps hash, find and set actualItemType, hasPartners, hasVisibleChildren, hasLeavesOnly */
    orgTree.loopPostOrder(this, function (nodeId, node, parentId, parent) {
      if(!orgTreeProps.hasOwnProperty(nodeId)) {
        orgTreeProps[nodeId] = new NodeProps();
      }
      var nodeProps = orgTreeProps[nodeId];
      nodeProps.actualItemType = node.itemType;
      if (parent != null) {
        if(!orgTreeProps.hasOwnProperty(parentId)) {
          orgTreeProps[parentId] = new NodeProps();
        }
        var parentProps = orgTreeProps[parentId];
        parentProps.hasVisibleChildren = parentProps.hasVisibleChildren || node.isVisible || nodeProps.hasVisibleChildren;
        parentProps.hasChildren = true;
        parentProps.hasLeavesOnly = parentProps.hasLeavesOnly && !nodeProps.hasChildren;
      }
    });

    /* stage 2: convert not supported combinations of child and parent items */
    orgTree.loopPreOrder(this, function (nodeId, node, parentId, parent) {
      var nodeProps = orgTreeProps[nodeId];
      var parentProps = orgTreeProps[parentId];
      if(!parentProps) {
        parentProps = new NodeProps();
        parentProps.actualItemType = ItemType.Regular;
        orgTreeProps[parentId] = parentProps;
      }
      switch (nodeProps.actualItemType) {
        case ItemType.LimitedPartner:
        case ItemType.AdviserPartner:
        case ItemType.GeneralPartner:
          /* Don't support partner of partner */
          if(parentProps.isPartner) {
            nodeProps.actualItemType = ItemType.Adviser;
          } else {
            nodeProps.isPartner = true;
            parentProps.hasPartners = true;
          }
          break;
        case ItemType.Regular:
          /* Don't support regular children of partner */
          if(parentProps.isPartner) {
            nodeProps.actualItemType = ItemType.Assistant;
          }
          break;
      }
    });

    /* stage 3: find nodes alignment levels, so nodes from different branches of the hierarchy will be placed at the same level */
    var branchAligner = BranchAligner();
    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
      var parentProps = orgTreeProps[parentOrgItemId];
      if (!parentProps.hasVisibleChildren) {
        return orgTree.SKIP;
      }
      orgTree.loopChildren(this, parentOrgItemId, function (orgItemId, orgItem, index) {
        var treeItemProps = orgTreeProps[orgItemId];
        parentProps.typeSorter.addChild(treeItemProps.actualItemType, orgItem.levelOffset, orgItem);
        parentProps.groupSorter.addChild(treeItemProps.actualItemType, orgItem.levelOffset, orgItem);
      });

      var partners = [];
      if(parentProps.hasPartners) {
        partners = [...parentProps.typeSorter.getRow(ItemType.AdviserPartner), ...parentProps.typeSorter.getRow(ItemType.LimitedPartner), ...parentProps.typeSorter.getRow(ItemType.GeneralPartner)];
      }
      var advisers = parentProps.typeSorter.getRow(ItemType.Adviser);
      if(advisers.length > 0) {
        /* extend advisers level */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAdvisersAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAdvisersAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        if(options.alignBranches) {
          if(parentProps.isPartner) {
            extendChildren = true;
          }
          if(extendChildren) {
            branchAligner.mergeToChild(parentOrgItemId, advisers, RowType.Advisers, 0, 0, extendChildren);
          } else {
            branchAligner.mergeToParent(parentOrgItemId, advisers);
          }
        } else {
          branchAligner.addChild(parentOrgItemId, advisers, RowType.Advisers, 0, 0, extendChildren);
        }
      }

      var subAdvisers = parentProps.typeSorter.getRow(ItemType.SubAdviser);
      if(subAdvisers.length > 0) {
        /* extend advisers level */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAdvisersAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAdvisersAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        if(options.alignBranches) {
          if(parentProps.isPartner) {
            extendChildren = true;
          }
          branchAligner.mergeToChild(parentOrgItemId, subAdvisers, RowType.SubAdvisers, 0, 1, extendChildren);

        } else {
          branchAligner.addChild(parentOrgItemId, subAdvisers, RowType.SubAdvisers, 0, 1, extendChildren);
        }
      }

      var assistants = parentProps.typeSorter.getRows(ItemType.Assistant);
      /* create assistants levels */
      if(assistants.length > 0) {
        /* extend assistants levels */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAssistantsAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAssistantsAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        assistants.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.Assistants, index, 0, extendChildren);
          } else {
            branchAligner.addChild(parentOrgItemId, nodes, RowType.Assistants, index, 0, extendChildren);
          }
        });
      }

      var subAssistants = parentProps.typeSorter.getRows(ItemType.SubAssistant);
      /* create assistants levels */
      if(subAssistants.length > 0) {
        /* extend assistants levels */
        var extendChildren = partners.length > 0;
        if(!extendChildren) {
          switch (parentOrgItem.placeAssistantsAboveChildren) {
            case Enabled.Auto:
              extendChildren = options.placeAssistantsAboveChildren;
              break;
            case Enabled.True:
              extendChildren = true;
              break;
          }
        }
        subAssistants.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.SubAssistants, index, 1, extendChildren);
          } else {
            branchAligner.addChild(parentOrgItemId, nodes, RowType.SubAssistants, index, 1, extendChildren);
          }
        });
      }

      if(partners.length > 0) {
        branchAligner.mergeToParent(parentOrgItemId, partners);
      }

      var rowChildren = parentProps.groupSorter.getRows(GroupType.RowChildren);
      /* create row children levels */
      if(rowChildren.length > 0) {
        rowChildren.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.RowChildren, index, 0, true);
          } else {
            branchAligner.addChild(parentOrgItemId, nodes, RowType.RowChildren, index, 0, true);
          }
        });
      }

      /* add remaining children in formation */
      var children = parentProps.groupSorter.getRow(GroupType.Children);
      if(children.length > 0) {
        var props = orgTreeProps[parentOrgItemId];
        var childrenRows = getRegularChildrenRows(options, children, parentOrgItem.childrenPlacementType, props.hasLeavesOnly);
        childrenRows.forEach((nodes, index) => {
          if(options.alignBranches) {
            branchAligner.mergeToChild(parentOrgItemId, nodes, RowType.Children, index, 0, true);
          } else {
            if(index == childrenRows.length - 1) {
              branchAligner.addSplitChildren(parentOrgItemId, nodes, RowType.Children, index, 0);
            } else {
              branchAligner.addChild(parentOrgItemId, nodes, RowType.Children, index, 0, true);
            }
          }
        });
      }
    });

    /* stage 4: measure depth of alignment levels */
    branchAligner.align();

    /* stage 5: create visual tree */
    var visualPartners = {};
    orgTree.loopLevels(this, function (parentOrgItemId, parentOrgItem, levelid) {
      var parentProps = orgTreeProps[parentOrgItemId];

      var logicalParentItem = visualTree.node(parentOrgItemId);
      if (!logicalParentItem) {
        logicalParentItem = getNewTreeItem({
          visibility: Visibility.Invisible,
          connectorPlacement: 0,
          parentId: null,
          actualItemType: ItemType.Regular
        }, parentOrgItem);
        visualTree.add(null, parentOrgItemId, logicalParentItem);
      }

      /* find left and right siblings margins of logical parent item
        they are needed to properly place GeneralPartner & LimitedPartner nodes. */
      leftSiblingOffset = 0;
      rightSiblingOffset = 0;
      if ((index = visualTree.indexOf(parentOrgItemId)) != null) {
        leftSiblingOffset = index;
        rightSiblingOffset = visualTree.countSiblings(parentOrgItemId) - index - 1;
      }

      var partners = [];
      if(parentProps.hasPartners) {
        partners = [
          ...parentProps.typeSorter.getRow(ItemType.AdviserPartner), 
          ...parentProps.typeSorter.getRow(ItemType.LimitedPartner), 
          ...parentProps.typeSorter.getRow(ItemType.GeneralPartner)
        ];
      }
      var visualParent = logicalParentItem;
      var visualParent2 = null;
      var flagPartners = true;
      branchAligner.loopGroupTypes(this, parentOrgItemId, function(groupType, len) {
        if(!(parentProps.hasPartners || parentProps.isPartner) && groupType > parentProps.groupSorter.getLength() - 1) {
          return true;
        }
        if(groupType > GroupType.Assistants && flagPartners) {
          flagPartners = false;
          if(parentProps.hasPartners) {
            visualPartners[parentOrgItemId] = [visualParent.id];
            visualParent = visualParent2 || visualParent;
            visualParent2 = null;
            visualParent.partners = visualPartners[parentOrgItemId];
          }
          if(parentProps.isPartner) {
            visualPartners[parentOrgItem.parent].push(visualParent.id);
          }
        }
        var fillEmptyLevels = ((parentProps.isPartner || parentProps.hasPartners) && groupType <= GroupType.Assistants);
        fillEmptyLevels = fillEmptyLevels || groupType < parentProps.groupSorter.getLength() - 1;

        var rows = [];
        switch(groupType) {
          case GroupType.Items:
            var row = parentProps.groupSorter.getRows(GroupType.Items)[0] || [];
            var depth = branchAligner.getRowDepth(parentOrgItemId, GroupType.Items, 0);
            addAdvisers(visualTree, orgTreeProps, visualParent, row, leftSiblingOffset, rightSiblingOffset);
            row.forEach(item => navigationFamily.define(parentOrgItem, item));
            if(partners.length > 0) {
              visualParent2 = addPartners(visualTree, orgTreeProps, visualParent, partners, leftSiblingOffset, rightSiblingOffset);
              /* every child logically belongs to every partner */
              partners.forEach( partner => {
                navigationFamily.define(parentOrgItem, partner, true);
                if(partner.id != logicalParentItem.id) {
                  var rowChildren = parentProps.groupSorter.getRows(GroupType.RowChildren);
                  rowChildren.forEach(row => row.forEach(child => navigationFamily.define(partner, child)));
                  var regularChildren = parentProps.groupSorter.getRow(GroupType.Children);
                  regularChildren.forEach(child => navigationFamily.define(partner, child));
                }
              });
            }
            if(parentProps.hasPartners || parentProps.isPartner || groupType < parentProps.groupSorter.getLength() - 1) {
              while(depth > 1) {
                visualParent = createNewVisualAggregator(visualTree, visualParent, false);
                if(visualParent2) {
                  visualParent2 = createNewVisualAggregator(visualTree, visualParent2, false);
                }
                depth-=1;
              }
            }
            break;
          case GroupType.Assistants:
            var rows = parentProps.groupSorter.getRows(GroupType.Assistants);
            branchAligner.loopRows(this, parentOrgItemId, RowType.Assistants, function(depth, rowIndex) {
              var row = rows[rowIndex] || [];
              if(!fillEmptyLevels && rowIndex > rows.length - 1) {
                return true;
              }
              visualParent = addAssistants(visualTree, orgTreeProps, visualParent, row);
              if(visualParent2) {
                visualParent2 = createNewVisualAggregator(visualTree, visualParent2, false);
              }
              row.forEach(item => navigationFamily.define(parentOrgItem, item));
              if(parentProps.hasPartners || parentProps.isPartner || rowIndex < rows.length - 1 || groupType < parentProps.groupSorter.getLength() - 1) {
                while(depth > 1) {
                  visualParent = createNewVisualAggregator(visualTree, visualParent, false);
                  if(visualParent2) {
                    visualParent2 = createNewVisualAggregator(visualTree, visualParent2, false);
                  }
                  depth-=1;
                }
              }
            });
            break;
          case GroupType.RowChildren:
            var rows = parentProps.groupSorter.getRows(GroupType.RowChildren);
            branchAligner.loopRows(this, parentOrgItemId, RowType.RowChildren, function(depth, rowIndex) {
              var row = rows[rowIndex] || [];
              if(!fillEmptyLevels && rowIndex > rows.length - 1) {
                return true;
              }
              var hideChildConnector = (logicalParentItem.visibility == Visibility.Invisible) && (logicalParentItem.connectorPlacement === 0);
              visualParent = addRowChildren(visualTree, visualParent, row, fillEmptyLevels || rowIndex < rows.length - 1, hideChildConnector, options.horizontalAlignment);
              row.forEach(item => navigationFamily.define(parentOrgItem, item));
              if(rowIndex < rows.length - 1 || groupType < parentProps.groupSorter.getLength() - 1) {
                while(depth > 1) {
                  visualParent = createNewVisualAggregator(visualTree, visualParent, false);
                  depth-=1;
                }
              }
            });
            break;
          case GroupType.Children:
            var regularChildren = parentProps.groupSorter.getRow(GroupType.Children); /* children added after all other custom item types */
            /* add remaining children in formation */
            if(regularChildren.length > 0) {
              var props = orgTreeProps[logicalParentItem.id];
              var depths = branchAligner.getRowsDepth(parentOrgItemId, GroupType.Children);
              addChildren(orgTree, visualTree, depths, options, logicalParentItem, visualParent, regularChildren, parentOrgItem.childrenPlacementType, props.hasLeavesOnly);
              regularChildren.forEach(item => navigationFamily.define(parentOrgItem, item));
            }
            break;
        }
      });
      if(flagPartners) {
        flagPartners = false;
        if(parentProps.hasPartners) {
          visualPartners[parentOrgItemId] = [visualParent.id];
          visualParent = visualParent2 || visualParent;
          visualParent2 = null;
          visualParent.partners = visualPartners[parentOrgItemId];
        }
        if(parentProps.isPartner) {
          visualPartners[parentOrgItem.parent].push(visualParent.id);
        }
      }
      if (!parentProps.hasVisibleChildren) {
        return orgTree.SKIP;
      }
    });

    return {
        visualTree: visualTree,
        navigationFamily: navigationFamily,
        branchAligner: branchAligner
    }
  }

  function addPartners(visualTree, orgTreeProps, parent, partners, leftSiblingOffset, rightSiblingOffset) {
    var leftItems = [];
    var rightItems = [];
    partners.map(partner => getNewTreeItem({}, partner)).forEach(item => {
      var isLeft = true;
      if (parent.connectorPlacement & SideFlag.Right) {
        isLeft = true;
        item.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
      } else if (parent.connectorPlacement & SideFlag.Left) {
        isLeft = false;
        item.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
      } else {
        switch (item.adviserPlacementType) {
          case AdviserPlacementType.Left:
            isLeft = true;
            item.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
            break;
          default:
            isLeft = false;
            item.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
            break;
        }
        var itemProp = orgTreeProps[item.id];
        switch (itemProp.actualItemType) {
          case ItemType.GeneralPartner:
            item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
            break;
          case ItemType.LimitedPartner:
            item.connectorPlacement = SideFlag.Bottom;
            break;
        }
      }
      if(isLeft) {
        leftItems.unshift(item);
      } else {
        rightItems.push(item);
      }
    });

    var partners = [...leftItems, parent, ...rightItems];
    var parentIndex = leftItems.length;
    var centerIndex = Math.floor((partners.length) / 2);
    var invisiblePartner = null;
    if(partners.length % 2 == 0) {
      invisiblePartner = getNewTreeItem({ visibility: Visibility.Invisible });
      partners.splice(centerIndex, 0, invisiblePartner);
      if(centerIndex <= parentIndex) {
        parentIndex+=1;
      }
    }

    var visualParent = visualTree.parent(parent.id);
    for (var index = parentIndex - 1; index >= 0; index -= 1) {
      var item = partners[index];
      visualTree.add(visualParent.id, item.id, item, leftSiblingOffset);

      item.gravity = HorizontalAlignmentType.Right;
    }
    for (var index = parentIndex + 1; index < partners.length; index += 1) {
      var item = partners[index];
      visualTree.add(visualParent.id, item.id, item, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
      
      item.gravity = HorizontalAlignmentType.Left;
    }

    if(invisiblePartner != null) {
      var mimicPartner = null;
      if(centerIndex <= parentIndex) {
        mimicPartner = partners[centerIndex - 1];
      } else {
        mimicPartner = partners[centerIndex + 1];
      }
      invisiblePartner.connectorPlacement = mimicPartner.connectorPlacement & (SideFlag.Left | SideFlag.Right);
    }

    var centerPartner = partners[centerIndex];
    return centerPartner;
  }

  function addAdvisers(visualTree, orgTreeProps, parent, advisers, leftSiblingOffset, rightSiblingOffset) {
    advisers.map(adviser => getNewTreeItem({}, adviser)).forEach(item => {
      var itemProps = orgTreeProps[item.id];
      var alteredItem;
      switch(itemProps.actualItemType) {
        case ItemType.SubAdviser:
          item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
          alteredItem = getNewTreeItem({ visibility: Visibility.Invisible });
          visualTree.add(alteredItem.id, item.id, item);
          break;
        default:
          alteredItem = item;
          break;
      }
      var visualParent = visualTree.parent(parent.id);
      if (parent.connectorPlacement & SideFlag.Right) {
        visualTree.add(visualParent.id, alteredItem.id, alteredItem, leftSiblingOffset);
        alteredItem.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
        alteredItem.gravity = HorizontalAlignmentType.Right;
      } else if (parent.connectorPlacement & SideFlag.Left) {
        visualTree.add(visualParent.id, alteredItem.id, alteredItem, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
        alteredItem.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
        alteredItem.gravity = HorizontalAlignmentType.Left;
      } else {
        switch (item.adviserPlacementType) {
          case AdviserPlacementType.Left:
            visualTree.add(visualParent.id, alteredItem.id, alteredItem, leftSiblingOffset);
            alteredItem.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
            alteredItem.gravity = HorizontalAlignmentType.Right;
            break;
          default:
            visualTree.add(visualParent.id, alteredItem.id, alteredItem, visualTree.countChildren(visualParent.id) - rightSiblingOffset);
            alteredItem.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
            alteredItem.gravity = HorizontalAlignmentType.Left;
            break;
        }
        switch (item.actualItemType) {
          case ItemType.GeneralPartner:
            alteredItem.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
            break;
          case ItemType.LimitedPartner:
            alteredItem.connectorPlacement = SideFlag.Bottom;
            break;
        }
      }
    });
  }
  
  function addAssistants(visualTree, orgTreeProps, visualParent, assistants) {
    var nextVisualParent = createNewVisualAggregator(visualTree, visualParent, false);
    assistants.map(assistant => getNewTreeItem({}, assistant)).forEach(item => {
      var itemProps = orgTreeProps[item.id];
      var alteredItem;
      switch(itemProps.actualItemType) {
        case ItemType.SubAssistant:
          item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
          alteredItem = getNewTreeItem({ visibility: Visibility.Invisible });
          visualTree.add(alteredItem.id, item.id, item);
          break;
        case ItemType.Assistant:
          alteredItem = item;
          break;
      }
      switch (item.adviserPlacementType) {
        case AdviserPlacementType.Left:
          visualTree.add(visualParent.id, alteredItem.id, alteredItem, 0);
          alteredItem.connectorPlacement = SideFlag.Right | SideFlag.Bottom;
          alteredItem.gravity = HorizontalAlignmentType.Right;
          break;
        default:
          visualTree.add(visualParent.id, alteredItem.id, alteredItem);
          alteredItem.connectorPlacement = SideFlag.Left | SideFlag.Bottom;
          alteredItem.gravity = HorizontalAlignmentType.Left;
          break;
      }
    });
    return nextVisualParent;
  }

  function addRowChildren(visualTree, visualParent, rowOfChildren, fillEmptyLevels, hideChildConnector, horizontalAlignment) {
    var nextVisualParent = null;
    if(fillEmptyLevels) {
      nextVisualParent = createNewVisualAggregator(visualTree, visualParent, hideChildConnector);
    }
    var medianIndex = 0;
    switch (horizontalAlignment) {
      case HorizontalAlignmentType.Center:
        medianIndex = Math.ceil(rowOfChildren.length / 2) - 1;
        break;
      case HorizontalAlignmentType.Left:
        medianIndex = -1;
        break;
      case HorizontalAlignmentType.Right:
        medianIndex = rowOfChildren.length - 1;
        break;
    }
    for (var index = medianIndex; index >= 0; index -= 1) {
      var item = getNewTreeItem({}, rowOfChildren[index]);
      visualTree.add(visualParent.id, item.id, item, 0);
      item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
      item.gravity = HorizontalAlignmentType.Right;
    }

    for (index = medianIndex + 1; index < rowOfChildren.length; index += 1) {
      item = getNewTreeItem({}, rowOfChildren[index]);
      visualTree.add(visualParent.id, item.id, item);
      item.connectorPlacement = SideFlag.Top | SideFlag.Bottom;
      item.gravity = HorizontalAlignmentType.Left;
    }
    return nextVisualParent;
  }

  function addChildren(orgTree, visualTree, depths, options, treeItem, visualParent, regularChildren, childrenPlacementType, hasLeavesOnly) {
    var visualParent,
      currentVisualParent,
      leftChildItem,
      rightChildItem,
      newAggregatorItem,
      childItem, orgChildItem,
      width,
      height,
      twinColumns,
      rowIndex,
      index, len,
      singleItemPlacement,
      hideParentConnector = (treeItem.visibility == Visibility.Invisible) && (treeItem.connectorPlacement === 0);

    switch (options.horizontalAlignment) {
      case HorizontalAlignmentType.Center:
      case HorizontalAlignmentType.Left:
        singleItemPlacement = AdviserPlacementType.Right;
        break;
      case HorizontalAlignmentType.Right:
        singleItemPlacement = AdviserPlacementType.Left;
        break;
    }

    if (childrenPlacementType === ChildrenPlacementType.Auto) {
      if (hasLeavesOnly) {
        childrenPlacementType = (options.leavesPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Matrix : options.leavesPlacementType;
      }
      else {
        childrenPlacementType = (options.childrenPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Horizontal : options.childrenPlacementType;
      }
    }

    if (childrenPlacementType == ChildrenPlacementType.Matrix && regularChildren.length < 3) {
      childrenPlacementType = ChildrenPlacementType.Horizontal;
    }

    switch (childrenPlacementType) {
      case ChildrenPlacementType.Horizontal:
        for (index = 0, len = regularChildren.length; index < len; index += 1) {
          childItem = getNewTreeItem({}, regularChildren[index]);
          orgChildItem = orgTree.node(childItem.id);
          visualTree.add(visualParent.id, childItem.id, childItem);
          childItem.connectorPlacement = (orgChildItem.hideParentConnection ? 0 : SideFlag.Top) | (orgChildItem.hideChildrenConnection ? 0 : SideFlag.Bottom);

          if (index === 0) {
            childItem.relationDegree = 1;
          }
        }
        break;
      case ChildrenPlacementType.Matrix:
        width = Math.min(options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(regularChildren.length)));
        height = Math.ceil(regularChildren.length / width);
        twinColumns = Math.ceil(width / 2.0);
        for (var columnIndex = 0; columnIndex < twinColumns; columnIndex += 1) {
          currentVisualParent = visualParent;
          for (rowIndex = 0; rowIndex < height; rowIndex += 1) {
            leftChildItem = getMatrixItem(regularChildren, columnIndex * 2, rowIndex, width);
            rightChildItem = getMatrixItem(regularChildren, columnIndex * 2 + 1, rowIndex, width);
            if (leftChildItem !== null || rightChildItem !== null) {
              var depth = depths[rowIndex - 1] || 1;
              while(depth > 1) {
                newAggregatorItem = getNewTreeItem({
                  visibility: Visibility.Invisible,
                  connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
                });
                visualTree.add(currentVisualParent.id, newAggregatorItem.id, newAggregatorItem);
                currentVisualParent = newAggregatorItem;
                depth -= 1;
              }
            }
            if (leftChildItem !== null) {
              leftChildItem =  getNewTreeItem({},leftChildItem);
              if (columnIndex === 0) {
                leftChildItem.relationDegree = 1;
              }
              visualTree.add(currentVisualParent.id, leftChildItem.id, leftChildItem);
              leftChildItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Right) | SideFlag.Bottom;
              leftChildItem.gravity = HorizontalAlignmentType.Right;
            }
            if (leftChildItem !== null || rightChildItem !== null) {
              newAggregatorItem = getNewTreeItem({
                visibility: Visibility.Invisible,
                connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
              });
              visualTree.add(currentVisualParent.id, newAggregatorItem.id, newAggregatorItem);
            }
            if (rightChildItem !== null) {
              rightChildItem = getNewTreeItem({},rightChildItem);
              visualTree.add(currentVisualParent.id, rightChildItem.id, rightChildItem);
              rightChildItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Left) | SideFlag.Bottom;
              rightChildItem.gravity = HorizontalAlignmentType.Left;
            }
            currentVisualParent = newAggregatorItem;
          }
        }
        if (width > 2) {
          // No center alignment to aggregator required
          visualParent.visualAggregatorId = null;
        }
        break;
      case ChildrenPlacementType.Vertical:
        for (index = 0, len = regularChildren.length; index < len; index += 1) {
          childItem = getNewTreeItem({}, regularChildren[index]);
          var depth = (index == len - 1) ?  1 : depths[index] || 1;
          var aggregatorItem = visualParent;
          while(depth > 0) {
            newAggregatorItem = getNewTreeItem({
              visibility: Visibility.Invisible,
              connectorPlacement: hideParentConnector ? 0 : SideFlag.Top | SideFlag.Bottom
            });
            visualTree.add(aggregatorItem.id, newAggregatorItem.id, newAggregatorItem);
            aggregatorItem = newAggregatorItem;
            depth -= 1;
          }

          switch (singleItemPlacement) {
            case AdviserPlacementType.Left:
              visualTree.add(visualParent.id, childItem.id, childItem, 0);
              childItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Right) | SideFlag.Bottom;
              childItem.gravity = HorizontalAlignmentType.Right;
              break;
            case AdviserPlacementType.Right:
              visualTree.add(visualParent.id, childItem.id, childItem);
              childItem.connectorPlacement = (hideParentConnector ? 0 : SideFlag.Left) | SideFlag.Bottom;
              childItem.gravity = HorizontalAlignmentType.Left;
              break;
          }
          visualParent = newAggregatorItem;
        }
        break;
      default:
        throw "Children placement is undefined!";
    }
  }

  function getRegularChildrenRows(options, regularChildren, childrenPlacementType, hasLeavesOnly) {
    var results = [];

    if (childrenPlacementType === ChildrenPlacementType.Auto) {
      if (hasLeavesOnly) {
        childrenPlacementType = (options.leavesPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Matrix : options.leavesPlacementType;
      }
      else {
        childrenPlacementType = (options.childrenPlacementType === ChildrenPlacementType.Auto) ?
          ChildrenPlacementType.Horizontal : options.childrenPlacementType;
      }
    }

    if (childrenPlacementType == ChildrenPlacementType.Matrix && regularChildren.length < 3) {
      childrenPlacementType = ChildrenPlacementType.Horizontal;
    }

    switch (childrenPlacementType) {
      case ChildrenPlacementType.Horizontal:
        results.push(regularChildren);
        break;
      case ChildrenPlacementType.Matrix:
        var width = Math.min(options.maximumColumnsInMatrix, Math.ceil(Math.sqrt(regularChildren.length)));
        for(var index = 0; index < regularChildren.length; index+= width) {
          results.push(regularChildren.slice(index, index + width));
        }
        break;
      case ChildrenPlacementType.Vertical:
        regularChildren.forEach(childItem => {
          results.push([childItem]);
        });
        break;
    }
    return results;
  }

  function getMatrixItem(items, x, y, width) {
    var result,
      isOdd = (width % 2 > 0),
      index;

    if (isOdd) {
      if (x === width - 1) {
        x = items.length;
      }
      else if (x === width) {
        x = width - 1;
      }
    }
    index = y * width + x;

    result = (index > items.length - 1) ? null : items[index];

    return result;
  }

  function createNewVisualAggregator(visualTree, treeItem, hideChildrenConnector) {
    var newAggregatorItem,
      hideParentConnector = ((treeItem.visibility == Visibility.Invisible) && ((treeItem.connectorPlacement & SideFlag.Top) === 0)) || hideChildrenConnector;

    newAggregatorItem = getNewTreeItem({
      visibility: Visibility.Invisible,
      visualAggregatorId: treeItem.visualAggregatorId,
      connectorPlacement: hideParentConnector ? 0 : (SideFlag.Top | SideFlag.Bottom)
    });

    visualTree.insert(treeItem.id, newAggregatorItem.id, newAggregatorItem);

    treeItem.visualAggregatorId = newAggregatorItem.id;
    return newAggregatorItem;
  }

  function getNewTreeItem(properties, orgItem) {
    var result = new TreeItem(),
      optionKey;

    if (orgItem != null) {
      result.actualItemType = orgItem.itemType;
      result.adviserPlacementType = orgItem.adviserPlacementType;
    }

    for (optionKey in properties) {
      if (properties.hasOwnProperty(optionKey)) {
        result[optionKey] = properties[optionKey];
      }
    }

    if (orgItem != null) {
      result.id = orgItem.id;
      result.visibility = orgItem.isVisible ? Visibility.Auto : Visibility.Invisible;
    } else {
      _treeItemCounter += 1;
      result.id = _treeItemCounter;
    }

    return result;
  }

  return {
    build: build
  };
}

function VisualTreeTask(orgTreeTask, activeItemsTask, visualTreeOptionTask) {
  var _visualTree, /* Tree(); key: TreeItem.id value: TreeItem */
    _leftMargins,
    _rightMargins,
    _navigationFamily, /* Family structure where key: TreeItem.id and value: TreeItem */
    _treeItemCounter,
    _branchAligner,
    _visualTreeBuilder = VisualTreeBuilder();

  function process() {
    var orgTree = orgTreeTask.getOrgTree();
    var options = visualTreeOptionTask.getOptions();
    var activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};

    _treeItemCounter = orgTreeTask.getMaximumId();

    if (orgTree.hasNodes()) {
      ({ 
        visualTree: _visualTree, 
        navigationFamily: _navigationFamily,
        treeItemCounter: _treeItemCounter,
        branchAligner: _branchAligner
      } = _visualTreeBuilder.build(orgTree, _treeItemCounter, activeItems, options));
    } else {
      _visualTree = Tree();
      _navigationFamily = Family();
      _branchAligner = BranchAligner();
    }

    ({
      leftMargins: _leftMargins,
      rightMargins: _rightMargins
    } = getVisualTreeMargins(_visualTree));

    return true;
  }

  function getVisualTreeMargins(visualTree) {
    var leftMargins = {};
    var rightMargins = {};
    visualTree.loop(this, function (nodeid, node) {
      leftMargins[nodeid] = [];
      rightMargins[nodeid] = [];
    });

    visualTree.loopPostOrder(this, function (nodeid, node, parentid, parent) {
      var parentLeftMargins = leftMargins[parentid],
        parentRightMargins = rightMargins[parentid],
        nodeLeftMargins = leftMargins[nodeid],
        nodeRightMargins = rightMargins[nodeid],
        index, len;

      if (parentid != null) {
        /* update parent left margins */
        if (!parentLeftMargins[0]) {
          parentLeftMargins[0] = nodeid;
        }

        for (index = 0, len = nodeLeftMargins.length; index < len; index += 1) {
          if (!parentLeftMargins[index + 1]) {
            parentLeftMargins[index + 1] = nodeLeftMargins[index];
          }
        }

        /* update parent rights margins */
        parentRightMargins[0] = nodeid;

        for (index = 0, len = nodeRightMargins.length; index < len; index += 1) {
          parentRightMargins[index + 1] = nodeRightMargins[index];
        }
      }
    });

    return {
      leftMargins: leftMargins,
      rightMargins: rightMargins
    }
  }

  function getVisualTree() {
    return _visualTree;
  }

  function getLogicalFamily() {
    return _navigationFamily;
  }

  function getBranchAligner() {
    return _branchAligner;
  }

  function getLeftMargins() {
    return _leftMargins;
  }

  function getRightMargins() {
    return _rightMargins;
  }

  function getMaximumId() {
    return _treeItemCounter;
  }

  return {
    process: process,
    getVisualTree: getVisualTree,
    getLogicalFamily: getLogicalFamily,
    getLeftMargins: getLeftMargins,
    getRightMargins: getRightMargins,
    getMaximumId: getMaximumId,
    getBranchAligner: getBranchAligner
  };
}

function TreeLevelConnectorStackSize() {
  this.parentsStackSize = 0; /* number of overlapping horiontal connection lines between partners in level */
}

function PaletteItem(options) {
  this.lineColor = Colors.Silver;
  this.lineWidth = 1;
  this.lineType = LineType.Solid;
  this.fillColor = null;
  this.opacity = null;

  this._key = "";

  var property, properties,
    index, len;

  properties = ['lineColor', 'lineWidth', 'lineType', 'fillColor', 'opacity'];

  for (index = 0, len = properties.length; index < len; index += 1) {
    property = properties[index];

    if (options != null && options.hasOwnProperty(property)) {
      this[property] = options[property];
    }
    this._key += (!isNullOrEmpty(this._key) ? ", " : "") + property + ":" + this[property];
  }
}
PaletteItem.prototype.toAttr = function () {
  var attr = {
    "lineWidth": this.lineWidth,
    "lineType": this.lineType
  };
  if (this.fillColor !== null) {
    attr.fillColor = this.fillColor;
  }
  if (this.opacity !== null) {
    attr.opacity = this.opacity;
  }
  if (this.lineColor !== null) {
    attr.borderColor = this.lineColor;
  }
  return attr;
};

PaletteItem.prototype.toString = function () {
  return this._key;
};

function MoveSegment() {
  this.parent = Point.prototype;
  this.parent.constructor.apply(this, arguments);
  this.segmentType = SegmentType.Move;
}
MoveSegment.prototype = new Point();

MoveSegment.prototype.clone = function () {
  return new MoveSegment(this);
};

MoveSegment.prototype.loop = function (thisArg, onItem) {
  if (onItem != null) {
    onItem.call(thisArg, this.x, this.y, 0);
  }
};

MoveSegment.prototype.setPoint = function (point, index) {
  this.x = point.x;
  this.y = point.y;
};

MoveSegment.prototype.getEndPoint = function () {
  return this;
};

MoveSegment.prototype.invert = function (endPoint) {
  this.x = endPoint.x;
  this.y = endPoint.y;
};

MoveSegment.prototype.transform = function (transform, forward) {
  var self = this;
  transform.transformPoint(self.x, self.y, forward, self, function (x, y) {
    self.x = x;
    self.y = y;
  });//ignore jslint
};

function LineSegment() {
  this.parent = MoveSegment.prototype;
  this.parent.constructor.apply(this, arguments);

  this.segmentType = SegmentType.Line;
}
LineSegment.prototype = new MoveSegment();

LineSegment.prototype.clone = function () {
  return new LineSegment(this);
};

LineSegment.prototype.trim = function (prevEndPoint, offset) {
  var endPoint = this.offsetPoint(this, prevEndPoint, offset);
  this.x = endPoint.x;
  this.y = endPoint.y;

  return this;
};

LineSegment.prototype.offsetPoint = function (first, second, offset) {
  var result = null,
    distance = first.distanceTo(second);

  if (distance === 0 || offset === 0) {
    result = new Point(first);
  } else {
    result = new Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
  }
  return result;
};

function QuadraticArcSegment(arg0, arg1, arg2, arg3) {
  this.x = null;
  this.y = null;

  this.cpX = null;
  this.cpY = null;

  switch (arguments.length) {
    case 2:
      this.x = arg1.x;
      this.y = arg1.y;
      this.cpX = arg0.x;
      this.cpY = arg0.y;
      break;
    case 4:
      this.cpX = arg0;
      this.cpY = arg1;
      this.x = arg2;
      this.y = arg3;
      break;
  }

  this.segmentType = SegmentType.QuadraticArc;
}
QuadraticArcSegment.prototype.clone = function () {
  return new QuadraticArcSegment(this.cpX, this.cpY, this.x, this.y);
};

QuadraticArcSegment.prototype.loop = function (thisArg, onItem) {
  if (onItem != null) {
    onItem.call(thisArg, this.cpX, this.cpY, 0);
    onItem.call(thisArg, this.x, this.y, 1);
  }
};

QuadraticArcSegment.prototype.setPoint = function (point, index) {
  switch (index) {
    case 0:
      this.cpX = point.x;
      this.cpY = point.y;
      break;
    case 1:
      this.x = point.x;
      this.y = point.y;
      break;
  }
};

QuadraticArcSegment.prototype.getEndPoint = function () {
  return this;
};

QuadraticArcSegment.prototype.invert = function (endPoint) {
  this.x = endPoint.x;
  this.y = endPoint.y;
};

QuadraticArcSegment.prototype.transform = function (transform, forward) {
  var self = this;
  transform.transformPoints(self.x, self.y, self.cpX, self.cpY, forward, self, function (x, y, cpX, cpY) {
    self.x = x;
    self.y = y;
    self.cpX = cpX;
    self.cpY = cpY;
  });//ignore jslint
};

QuadraticArcSegment.prototype.trim = function (prevEndPoint, offset) {
  var time = 0.5,
    endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time),
    time2 = 0.1,
    endPoint2 = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time2);

  time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
  endPoint = this.offsetPoint(this.x, this.y, this.cpX, this.cpY, prevEndPoint.x, prevEndPoint.y, time);

  this.x = endPoint.x;
  this.y = endPoint.y;

  return this;
};

QuadraticArcSegment.prototype.offsetPoint = function (firstX, firstY, controlX, controlY, secondX, secondY, time) {
  return new Point((1 - time) * (1 - time) * firstX + 2 * (1 - time) * time * controlX + time * time * secondX,
    (1 - time) * (1 - time) * firstY + 2 * (1 - time) * time * controlY + time * time * secondY);
};

function Polyline(newPaletteItem) {
  var paletteItem = new PaletteItem(),
    segments = [],
    self,
    arrowPaletteItem;

  switch (arguments.length) {
    case 1:
      paletteItem = newPaletteItem;
      break;
  }

  arrowPaletteItem = new PaletteItem({
    lineColor: paletteItem.lineColor,
    lineWidth: 0,
    fillColor: paletteItem.lineColor,
    opacity: paletteItem.opacity || 1
  });

  function getStartPoint() {
    var result = null;
    if (segments.length > 0) {
      result = segments[0].getEndPoint();
    }
    return result;
  }

  function getEndPoint() {
    var result = null;
    if (segments.length > 0) {
      result = segments[segments.length - 1].getEndPoint();
    }
    return result;
  }

  function addSegment(segment) {
    segments.push(segment);
  }

  function addSegments(newSegments) {
    var index, len;
    for (index = 0, len = newSegments.length; index < len; index += 1) {
      segments.push(newSegments[index]);
    }
  }

  function mergeTo(polyline) {
    polyline.addSegments(segments);
  }

  function clone() {
    var index, len,
      result = new Polyline(paletteItem),
      cloneSegments = [],
      segment;
    for (index = 0, len = segments.length; index < len; index += 1) {
      segment = segments[index];
      cloneSegments.push(segment.clone());
    }
    result.addSegments(cloneSegments);
    return result;
  }

  function length() {
    return segments.length;
  }

  function loop(thisArg, onItem) {
    var index, len,
      segment;
    if (onItem != null) {
      for (index = 0, len = segments.length; index < len; index += 1) {
        segment = segments[index];
        if (segment) {
          if (onItem.call(thisArg, segment, index)) {
            break;
          }
        }
      }
    }
  }

  function loopReversed(thisArg, onItem) {
    var index,
      segment;
    if (onItem != null) {
      for (index = segments.length - 1; index >= 0; index -= 1) {
        segment = segments[index];
        if (segment) {
          if (onItem.call(thisArg, segment, index)) {
            break;
          }
        }
      }
    }
  }

  function transform(transformArg, forward) {
    loop(this, function (segment) {
      if (segment.transform != null) {
        segment.transform(transformArg, forward);
      }
    });
  }

  function isInvertable() {
    return isNullOrEmpty(paletteItem.fillColor);
  }

  function addInverted(polyline) {
    var hasMoved = false,
      stack = [];

    if (isInvertable()) {
      polyline.loopReversed(this, function (segment, index) {
        if (segment.segmentType != SegmentType.Dot) {
          if (!hasMoved) {
            segments.push(new MoveSegment(segment.getEndPoint()));
            hasMoved = true;
          }
          stack.unshift(segment);

          if (stack.length > 1) {
            stack[1].invert(stack[0].getEndPoint());
            segments.push(stack[1]);
            stack.length = 1;
          }

        }
      });
    } else {
      polyline.mergeTo(self);
    }
  }

  function _getArrow(fromX, fromY, toX, toY, length, width) {
    var result = new Polyline(arrowPaletteItem),
      index, len,
      point, x, y,
      perimeter = [new Point(length, -width / 2),
      new Point(0, 0),
      new Point(length, width / 2),
      new Point(length / 4 * 3, 0)
      ],
      angle = Math.atan2((fromY - toY), (fromX - toX));

    /* rotate and translate points */
    for (index = 0, len = perimeter.length; index < len; index += 1) {
      point = perimeter[index];
      x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
      y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
      point.x = x + toX;
      point.y = y + toY;
    }

    /* create arrow shape*/
    result.addSegment(new MoveSegment(perimeter[0].x, perimeter[0].y));
    result.addSegment(new LineSegment(perimeter[1].x, perimeter[1].y));
    result.addSegment(new LineSegment(perimeter[2].x, perimeter[2].y));
    result.addSegment(new QuadraticArcSegment(perimeter[3].x, perimeter[3].y, perimeter[0].x, perimeter[0].y));

    return result;
  }

  function addOffsetArrow(forward, lineWidth, offsetPercent, minimumDistance, onAddArrowSegments) {
    var prevEndPoint,
      currentEndPoint,
      currentSegment,
      newEndPoint, newPrevEndPoint,
      polyline,
      len = segments.length,
      arrowTipLength = lineWidth * 3,
      arrowTipWidth = lineWidth * 2,
      offset,
      distance;

    switch (lineWidth) {
      case 1:
        arrowTipLength = 8;
        arrowTipWidth = 6;
        break;
      case 2:
        arrowTipLength = 12;
        arrowTipWidth = 8;
        break;
      case 3:
        arrowTipLength = 16;
        arrowTipWidth = 10;
        break;
    }

    if (onAddArrowSegments != null && len > 1) {
      prevEndPoint = segments[len - 2].getEndPoint();
      currentSegment = segments[len - 1];
      if (currentSegment.offsetPoint != null) {
        currentEndPoint = new Point(currentSegment.getEndPoint());

        distance = prevEndPoint.distanceTo(currentEndPoint);
        if (distance > minimumDistance) {
          offset = distance * offsetPercent;

          if (forward) {
            newEndPoint = currentSegment.offsetPoint(prevEndPoint, currentEndPoint, offset);
            polyline = _getArrow(prevEndPoint.x, prevEndPoint.y, newEndPoint.x, newEndPoint.y, arrowTipLength, arrowTipWidth);
          } else {
            newPrevEndPoint = currentSegment.offsetPoint(currentEndPoint, prevEndPoint, offset);
            polyline = _getArrow(currentEndPoint.x, currentEndPoint.y, newPrevEndPoint.x, newPrevEndPoint.y, arrowTipLength, arrowTipWidth);
          }
          onAddArrowSegments(polyline);
        }
      }
    }
  }

  function addArrow(lineWidth, onAddArrowSegments) {
    var prevEndPoint,
      currentEndPoint,
      currentSegment,
      newEndPoint,
      polyline,
      len = segments.length,
      arrowTipLength = lineWidth * 3,
      arrowTipWidth = lineWidth * 2;

    switch (lineWidth) {
      case 1:
        arrowTipLength = 8;
        arrowTipWidth = 6;
        break;
      case 2:
        arrowTipLength = 12;
        arrowTipWidth = 8;
        break;
      case 3:
        arrowTipLength = 16;
        arrowTipWidth = 10;
        break;
    }

    if (onAddArrowSegments != null && len > 1) {
      prevEndPoint = segments[len - 2].getEndPoint();
      currentSegment = segments[len - 1];
      if (currentSegment.trim != null) {
        currentEndPoint = new Point(currentSegment.getEndPoint());
        if (currentEndPoint.distanceTo(prevEndPoint) >= arrowTipLength) {
          newEndPoint = currentSegment.trim(prevEndPoint, arrowTipLength);

          polyline = _getArrow(newEndPoint.x, newEndPoint.y, currentEndPoint.x, currentEndPoint.y, arrowTipLength, arrowTipWidth);
          onAddArrowSegments(polyline, newEndPoint);
        }
      }
    }
  }

  function optimizeMoveSegments() {
    var index, len,
      cursorIndex,
      key,
      optimizedSegments,
      segment, nextSegment,
      links = {},
      jumps = [],
      processed = [];

    for (index = 0, len = segments.length; index < len - 1; index += 1) {
      segment = segments[index];
      nextSegment = segments[index + 1];
      switch (segment.segmentType) {
        case SegmentType.Line:
        case SegmentType.QuadraticArc:
        case SegmentType.CubicArc:
          switch (nextSegment.segmentType) {
            case SegmentType.Move:
            case SegmentType.Dot:
              key = segment.x + "&" + segment.y;
              if (!links.hasOwnProperty(key)) {
                links[key] = index;
              }
              break;
          }
          break;
        case SegmentType.Move:
          key = segment.x + "&" + segment.y;
          if (links.hasOwnProperty(key) && !jumps[links[key]]) {
            jumps[links[key]] = index + 1;
            processed[index] = true;
          }
          break;
      }
    }
    optimizedSegments = [];
    for (index = 0; index < len; index += 1) {
      if (!processed[index]) {
        segment = segments[index];
        optimizedSegments.push(segment);
        processed[index] = true;

        if (jumps[index] > 0) {
          cursorIndex = jumps[index];
          while (cursorIndex < len && !processed[cursorIndex]) {
            segment = segments[cursorIndex];
            optimizedSegments.push(segment);
            processed[cursorIndex] = true;

            if (jumps[cursorIndex] > 0) {
              cursorIndex = jumps[cursorIndex];
            } else {
              cursorIndex += 1;
            }
          }
        }
      }
    }
    segments = optimizedSegments;
  }

  function toString() {
    return paletteItem.toString();
  }

  /* private classes */
  function Vertex(segment, pointIndex) {
    this.segment = segment;
    this.pointIndex = pointIndex;
  }

  Vertex.prototype.pushToSegment = function (point) {
    this.segment.setPoint(point, this.pointIndex);
  };

  function _joinVectors(prev, current, offset, polyline, isLoop) {
    var relationType = prev.relateTo(current),
      offset2 = isLoop ? 0 : offset,
      joinSegment,
      joinVector,
      newToPoint;
    if (relationType == VectorRelationType.Collinear) {
      /* Vectors are collinear vectors so we don't search for intersection */
      current.offset(offset2);
    } else {
      if (relationType == VectorRelationType.Opposite && current.from.context.pointIndex === 0) {
        /* Vectors are opposite vectors which belong to 2 different segments
          so we add an extra line segment in between of them
        */
        joinSegment = new LineSegment(current.from);
        polyline.addSegment(joinSegment);

        current.offset(offset2);

        newToPoint = current.from.clone();
        newToPoint.context = new Vertex(joinSegment, 0);

        joinVector = new Vector(prev.to.clone(), newToPoint);
        if (!isLoop) {
          current.from = newToPoint.clone();
        }

        joinVector.offset(offset);
        joinVector.intersect(prev);
        joinVector.from.context.pushToSegment(joinVector.from);
        current.intersect(joinVector);

        if (isLoop) {
          joinVector.to.context.pushToSegment(joinVector.to);
        }
      } else {
        current.offset(offset2);
        current.intersect(prev);
      }
    }
    current.from.context.pushToSegment(current.from);
  }

  function _closeVector(vectorStack, startVectors, offset, polyline) {
    var startVector,
      prevVector = vectorStack[0],
      closurePoint = prevVector.to.context.segment.getEndPoint().toString();
    if (startVectors.hasOwnProperty(closurePoint)) {
      startVector = startVectors[closurePoint];

      _joinVectors(prevVector, startVector, offset, polyline, true);

      delete startVectors[closurePoint];
    }
    prevVector.to.context.pushToSegment(prevVector.to);
    vectorStack.length = 0;
  }

  function getOffsetPolyine(offset) {
    var result = new Polyline(paletteItem),
      startVectors = {},
      pointStack = [],
      vectorStack = [];

    loop(this, function (segment) {
      var newSegment = segment.clone(),
        newPoint;

      switch (newSegment.segmentType) {
        case SegmentType.Dot:
        case SegmentType.Move:
          if (vectorStack.length > 0) {
            _closeVector(vectorStack, startVectors, offset, result);
          }
          pointStack.length = 0;
          if (newSegment.segmentType == SegmentType.Move) {
            newPoint = new Point(newSegment);
            newPoint.context = new Vertex(newSegment, 0);
            pointStack.push(newPoint);
          }
          break;
        default:
          newSegment.loop(this, function (x, y, index) {
            var newPoint = new Point(x, y),
              current,
              prev,
              closurePoint;

            newPoint.context = new Vertex(newSegment, index);
            pointStack.unshift(newPoint);
            if (pointStack.length > 1) {
              vectorStack.unshift(new Vector(pointStack[1].clone(), pointStack[0].clone()));
              pointStack.length = 1;
            }

            switch (vectorStack.length) {
              case 1:
                /* first Vector in stack we add to start Vectors collection for possible join into perimeter*/
                current = vectorStack[0];
                closurePoint = current.from.toString();
                startVectors[closurePoint] = current;
                current.offset(offset);
                current.from.context.pushToSegment(current.from);
                break;
              case 2:
                prev = vectorStack[1];
                current = vectorStack[0];

                _joinVectors(prev, current, offset, result, false);

                vectorStack.length = 1;
                break;
            }
          });
          break;
      }
      result.addSegment(newSegment);
    });
    if (vectorStack.length > 0) {
      _closeVector(vectorStack, startVectors, offset, result);
    }
    return result;
  }

  self = {
    paletteItem: paletteItem,
    arrowPaletteItem: arrowPaletteItem,
    addSegment: addSegment,
    addSegments: addSegments,
    mergeTo: mergeTo,
    length: length,
    loop: loop,
    loopReversed: loopReversed,
    transform: transform,
    isInvertable: isInvertable,
    addInverted: addInverted,
    addArrow: addArrow,
    addOffsetArrow: addOffsetArrow,
    optimizeMoveSegments: optimizeMoveSegments,
    getOffsetPolyine: getOffsetPolyine,
    toString: toString,
    getStartPoint: getStartPoint,
    getEndPoint: getEndPoint,
    clone: clone
  };

  return self;
}

function CubicArcSegment(arg0, arg1, arg2, arg3, arg4, arg5) {
  this.parent = Point.prototype;

  this.x = null;
  this.y = null;

  this.cpX1 = null;
  this.cpY1 = null;

  this.cpX2 = null;
  this.cpY2 = null;

  switch (arguments.length) {
    case 3:
      this.parent.constructor.apply(this, [arg2.x, arg2.y]);
      this.cpX1 = arg0.x;
      this.cpY1 = arg0.y;
      this.cpX2 = arg1.x;
      this.cpY2 = arg1.y;
      break;
    case 6:
      this.parent.constructor.apply(this, [arg4, arg5]);
      this.cpX1 = arg0;
      this.cpY1 = arg1;
      this.cpX2 = arg2;
      this.cpY2 = arg3;
      break;
  }

  this.segmentType = SegmentType.CubicArc;
}
CubicArcSegment.prototype = new Point();

CubicArcSegment.prototype.clone = function () {
  return new CubicArcSegment(this.cpX1, this.cpY1, this.cpX2, this.cpY2, this.x, this.y);
};

CubicArcSegment.prototype.loop = function (thisArg, onItem) {
  if (onItem != null) {
    onItem.call(thisArg, this.cpX1, this.cpY1, 0);
    onItem.call(thisArg, this.cpX2, this.cpY2, 1);
    onItem.call(thisArg, this.x, this.y, 2);
  }
};

CubicArcSegment.prototype.setPoint = function (point, index) {
  switch (index) {
    case 0:
      this.cpX1 = point.x;
      this.cpY1 = point.y;
      break;
    case 1:
      this.cpX2 = point.x;
      this.cpY2 = point.y;
      break;
    case 2:
      this.x = point.x;
      this.y = point.y;
      break;
  }
};

CubicArcSegment.prototype.getEndPoint = function () {
  return this;
};

CubicArcSegment.prototype.invert = function (endPoint) {
  var tempX = this.cpX1,
    tempY = this.cpY1;
  this.x = endPoint.x;
  this.y = endPoint.y;
  this.cpX1 = this.cpX2;
  this.cpY1 = this.cpY2;
  this.cpX2 = tempX;
  this.cpY2 = tempY;
};

CubicArcSegment.prototype.transform = function (transform, forward) {
  var self = this;
  transform.transform3Points(self.x, self.y, self.cpX1, self.cpY1, self.cpX2, self.cpY2, forward, self, function (x, y, cpX1, cpY1, cpX2, cpY2) {
    self.x = x;
    self.y = y;
    self.cpX1 = cpX1;
    self.cpY1 = cpY1;
    self.cpX2 = cpX2;
    self.cpY2 = cpY2;
  });//ignore jslint
};

CubicArcSegment.prototype.trim = function (prevEndPoint, offset) {
  var time = 0.5,
    endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time),
    time2 = 0.1,
    endPoint2 = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time2);

  time = offset * (time / endPoint.distanceTo(this.x, this.y) + time2 / endPoint2.distanceTo(this.x, this.y)) / 2.0;
  endPoint = this.offsetPoint(this.x, this.y, this.cpX2, this.cpY2, this.cpX1, this.cpY1, prevEndPoint.x, prevEndPoint.y, time);

  this.x = endPoint.x;
  this.y = endPoint.y;

  return this;
};

CubicArcSegment.prototype.offsetPoint = function (x, y, cpX1, cpY1, cpX2, cpY2, x2, y2, time) {
  return new Point(
    (1 - time) * (1 - time) * (1 - time) * x + 3 * (1 - time) * (1 - time) * time * cpX1 + 3 * (1 - time) * time * time * cpX2 + time * time * time * x2,
    (1 - time) * (1 - time) * (1 - time) * y + 3 * (1 - time) * (1 - time) * time * cpY1 + 3 * (1 - time) * time * time * cpY2 + time * time * time * y2
  );
};

function BaseConnectorBundle() {
  this.NORMAL_ITEM_WEIGHT = 10010;
  this.LINE_ITEM_WEIGHT = 10000;
}

BaseConnectorBundle.prototype.trace = function (data, params, options) {
  //var data = {
  //  graph: null, //Graph
  //  nodeid: 0
  //};

  //var params = {
  //  treeItemsPositions: [],
  //  transform: null
  //};

  //var options = {
  //  connectorType: ConnectorType.Squared,
  //  showExtraArrows: true,
  //  bevelSize: 4,
  //  elbowType: ElbowType.None
  //};
};

BaseConnectorBundle.prototype.getId = function (data) {
  var result = "_" + data.nodeid;
  data.nodeid += 1;
  return result;
};

BaseConnectorBundle.prototype.ConnectorEdge = function (from, to, polyline, parentsArrowId, childrenArrowId, dotId, weight, fromOffset, hasMiddle, middleParent, hasArrow) {
  this.polyline = polyline;
  this.from = from;
  this.to = to;

  this.weight = weight || 0;
  this.fromOffset = fromOffset || 0;

  this.hasArrow = hasArrow || false;
  this.parentsArrowId = parentsArrowId;
  this.childrenArrowId = childrenArrowId;
  this.dotId = dotId;

  /* draw extra arrows along long segments, the hasMiddle should be true and middleParent is parent point id */
  this.hasMiddle = hasMiddle;
  this.middleParent = middleParent;
  this.isOppositeFlow = false;
};

BaseConnectorBundle.prototype.ConnectorDestination = function (options) {
  this.id = null;
  this.x = null;
  this.y = null;
  this.bundleid = null;
  this.hasElbow = false;
  this.elbowPoint1 = null;
  this.elbowPoint2 = null;
  this.visibility = null;
  this.isSquared = true;

  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      this[key] = options[key];
    }
  }
};

BaseConnectorBundle.prototype.traceFork = function (data, params, options, parentPoint, points, hasSquared, isParents, fromOffset, showHorizontalArrows) {
  var startIndex, endIndex, len,
    connectorPoint, curvedPoints = [], bundlePoint, connectorDestination,
    index,
    polyline,
    bevelSize,
    fromPoint, fromPointId, toPoint, toPointId;

  if (hasSquared) {
    /* draw curved or angular lines on left side of pack */
    curvedPoints = [];
    for (startIndex = 0, len = points.length; startIndex < len; startIndex += 1) {
      connectorPoint = points[startIndex];
      if (connectorPoint.x < parentPoint.x && !connectorPoint.isSquared) {
        curvedPoints.push(connectorPoint);
      } else {
        break;
      }
    }
    len = curvedPoints.length;
    if (len > 0) {
      connectorDestination = curvedPoints[len - 1];
      bundlePoint = (connectorDestination.x == parentPoint.x) ? parentPoint : new this.ConnectorDestination({
        id: connectorDestination.bundleid,
        x: connectorDestination.x,
        y: parentPoint.y
      });
      this.traceAngularSegments(data, params, options, bundlePoint, curvedPoints, false);
    }

    /* draw curved or angular lines on right side of pack */
    curvedPoints = [];
    for (endIndex = points.length - 1; endIndex >= startIndex; endIndex -= 1) {
      connectorPoint = points[endIndex];

      if (connectorPoint.x > parentPoint.x && !connectorPoint.isSquared) {
        curvedPoints.push(connectorPoint);
      } else {
        break;
      }
    }

    len = curvedPoints.length;
    if (len > 0) {
      connectorDestination = curvedPoints[len - 1];
      bundlePoint = (connectorDestination.x == parentPoint.x) ? parentPoint : new this.ConnectorDestination({
        id: connectorDestination.bundleid,
        x: connectorDestination.x,
        y: parentPoint.y
      });
      this.traceAngularSegments(data, params, options, bundlePoint, curvedPoints, false);
    }

    /* calculate elbows of vertical connectors */
    for (index = startIndex; index <= endIndex; index += 1) {
      connectorPoint = points[index];

      bevelSize = options.bevelSize;
      if (bevelSize < 2) {
        bevelSize = 0;
      }

      switch (options.elbowType) {
        case ElbowType.Bevel:
        case ElbowType.Round:
          if (bevelSize > 0 && Math.abs(parentPoint.x - connectorPoint.x) > bevelSize && Math.abs(parentPoint.y - connectorPoint.y) > bevelSize) {
            connectorPoint.hasElbow = true;
            connectorPoint.elbowPoint1 = new Point(connectorPoint.x, parentPoint.y + (parentPoint.y > connectorPoint.y ? -bevelSize : bevelSize));
            connectorPoint.elbowPoint2 = new Point(connectorPoint.x + (parentPoint.x > connectorPoint.x ? bevelSize : -bevelSize), parentPoint.y);
          }
          break;
      }

      /* draw vertical segment */
      polyline = new Polyline();
      if (connectorPoint.hasElbow) {
        params.transform.transform3Points(connectorPoint.elbowPoint2.x, connectorPoint.elbowPoint2.y,
          connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint2.y,
          connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, true, this,
          function (fromX, fromY, toX, toY, toX2, toY2) {
            switch (options.elbowType) {
              case ElbowType.Bevel:
                polyline.addSegment(new MoveSegment(fromX, fromY));
                polyline.addSegment(new LineSegment(toX2, toY2));
                break;
              case ElbowType.Round:
                polyline.addSegment(new MoveSegment(fromX, fromY));
                polyline.addSegment(new CubicArcSegment(fromX, fromY, toX, toY, toX2, toY2));
                break;
            }
          });//ignore jslint

        params.transform.transformPoints(connectorPoint.elbowPoint1.x, connectorPoint.elbowPoint1.y, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
          polyline.addSegment(new LineSegment(toX, toY));
        }); //ignore jslint
      } else {
        params.transform.transformPoints(connectorPoint.x, parentPoint.y, connectorPoint.x, connectorPoint.y, true, this, function (fromX, fromY, toX, toY) {
          polyline.addSegment(new MoveSegment(fromX, fromY));
          polyline.addSegment(new LineSegment(toX, toY));
        }); //ignore jslint
      }

      var bundleid = (connectorPoint.x == parentPoint.x) ? parentPoint.id : connectorPoint.bundleid;
      var isVisible = (connectorPoint.visibility !== Visibility.Invisible);
      data.graph.addEdge(bundleid, connectorPoint.id, new this.ConnectorEdge(bundleid, connectorPoint.id, polyline,
        isParents ? connectorPoint.id : null,
        !isParents ? connectorPoint.id : null,
        null,
        isVisible ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT /* weight*/, fromOffset, null, null,
        isVisible));
    }

    /* draw segments on the right of parent point */
    startIndex = Math.max(startIndex - 1, 0);
    endIndex = Math.min(endIndex + 1, points.length - 1);

    fromPoint = parentPoint;
    fromPointId = parentPoint.id;
    for (index = startIndex; index <= endIndex; index += 1) {
      toPoint = points[index];
      toPointId = toPoint.bundleid;
      if (toPoint.x > fromPoint.x) {
        polyline = new Polyline();
        params.transform.transformPoints(fromPoint.x, parentPoint.y, toPoint.elbowPoint2 != null ? toPoint.elbowPoint2.x : toPoint.x, parentPoint.y, true, this, function (startX, startY, endX, endY) {
          polyline.addSegment(new MoveSegment(startX, startY));
          polyline.addSegment(new LineSegment(endX, endY));
        }); //ignore jslint
        data.graph.addEdge(fromPointId, toPointId, new this.ConnectorEdge(fromPointId, toPointId, polyline,
          null,
          null,
          fromPointId, Math.abs(toPoint.x - fromPoint.x) / 10000.0 /* weight */,
          fromOffset,
          /* draw middle arrows */
          showHorizontalArrows, isParents ? toPointId : fromPointId)
        );

        fromPoint = toPoint.elbowPoint2 || toPoint;
        fromPointId = toPointId;
      }
    }

    /* draw segments on the left of parent point */
    fromPoint = parentPoint;
    fromPointId = parentPoint.id;
    for (index = endIndex; index >= startIndex; index -= 1) {
      toPoint = points[index];
      toPointId = toPoint.bundleid;
      if (toPoint.x < fromPoint.x) {
        polyline = new Polyline();
        params.transform.transformPoints(fromPoint.x, parentPoint.y, toPoint.elbowPoint2 != null ? toPoint.elbowPoint2.x : toPoint.x, parentPoint.y, true, this, function (startX, startY, endX, endY) {
          polyline.addSegment(new MoveSegment(startX, startY));
          polyline.addSegment(new LineSegment(endX, endY));
        }); //ignore jslint
        data.graph.addEdge(fromPointId, toPointId, new this.ConnectorEdge(fromPointId, toPointId, polyline, null, null, fromPointId,
          Math.abs(toPoint.x - fromPoint.x) / 10000.0 /* weight */, fromOffset,
          /* draw middle arrows */
          showHorizontalArrows, isParents ? toPointId : fromPointId)
        );

        fromPoint = toPoint.elbowPoint2 || toPoint;
        fromPointId = toPointId;
      }
    }
  } else {
    /* all lines are angular or curved */
    this.traceAngularSegments(data, params, options, parentPoint, points, true);
  }
};

BaseConnectorBundle.prototype.traceAngularSegments = function (data, params, options, bundlePoint, points, drawToBundle) {
  var index, len,
    rect,
    point,
    polyline;

  for (index = 0, len = points.length; index < len; index += 1) {
    point = points[index];

    polyline = new Polyline();

    params.transform.transformPoint(bundlePoint.x, bundlePoint.y, true, this, function (x, y) {
      polyline.addSegment(new MoveSegment(x, y));
    });//ignore jslint

    switch (options.connectorType) {
      case ConnectorType.Angular:
        params.transform.transformPoint(point.x, point.y, true, this, function (x, y) {
          polyline.addSegment(new LineSegment(x, y));
        });//ignore jslint
        break;
      case ConnectorType.Curved:
        rect = new Rect(bundlePoint, point);

        if (drawToBundle) {
          if (bundlePoint.x > rect.x) {
            params.transform.transform3Points(rect.right(), rect.verticalCenter(), rect.x, rect.verticalCenter(), rect.x, rect.bottom(), true,
              this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
                polyline.addSegment(new CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
              });//ignore jslint
          }
          else {
            params.transform.transform3Points(rect.x, rect.verticalCenter(), rect.right(), rect.verticalCenter(), rect.right(), rect.bottom(), true,
              this, function (cpX1, cpY1, cpX2, cpY2, x, y) {
                polyline.addSegment(new CubicArcSegment(cpX1, cpY1, cpX2, cpY2, x, y));
              });//ignore jslint
          }
        } else {
          if (bundlePoint.x > rect.x) {
            params.transform.transformPoints(rect.x, rect.y, rect.x, rect.bottom(), true,
              this, function (cpX, cpY, x, y) {
                polyline.addSegment(new QuadraticArcSegment(cpX, cpY, x, y));
              });//ignore jslint
          } else {
            params.transform.transformPoints(rect.right(), rect.y, rect.right(), rect.bottom(), true,
              this, function (cpX, cpY, x, y) {
                polyline.addSegment(new QuadraticArcSegment(cpX, cpY, x, y));
              });//ignore jslint
          }
        }
        break;
    }
    var isVisible = (point.visibility !== Visibility.Invisible);
    data.graph.addEdge(bundlePoint.id, point.id, new this.ConnectorEdge(bundlePoint.id, point.id, polyline,
      null,
      isVisible ? point.id : null,
      isVisible ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT, null, null, null,
      true));
  }
};

function VerticalConnectorBundle(fromItems, toItems, dotId) {
  this.fromItems = fromItems;
  this.toItems = toItems;

  this.dotId = dotId || null;

  this.fromOffset = 0;
  this.fromStackSize = 0;
}
VerticalConnectorBundle.prototype = new BaseConnectorBundle();

VerticalConnectorBundle.prototype.trace = function (data, params, options) {
  var parents, children, items,
    treeItemId, treeItemPosition,
    index, len,
    isSquared, hasSquared,
    parentHorizontalCenter,
    parentsConnectorOffset,
    childrenConnectorOffset,
    connectorPoint,
    connectorStep,
    chartHasSquaredConnectors = (options.connectorType === ConnectorType.Squared);

  /* Draw fork for parents */
  parents = [];
  if (this.fromItems.length > 0) {
    items = this.fromItems;
    for (index = 0, len = items.length; index < len; index += 1) {
      treeItemId = items[index];
      treeItemPosition = params.treeItemsPositions[treeItemId];

      connectorPoint = new this.ConnectorDestination({
        id: params.nestedLayoutBottomConnectorIds.hasOwnProperty(treeItemId) ? params.nestedLayoutBottomConnectorIds[treeItemId] : treeItemId,
        bundleid: this.getId(data),
        x: treeItemPosition.actualPosition.horizontalCenter(),
        y: treeItemPosition.actualPosition.bottom(),
        isSquared: true,
        visibility: treeItemPosition.actualVisibility
      });
      parents.push(connectorPoint);
    }
    parents.sort(function (a, b) { return a.x - b.x; });

    /* Find offset of horizontal connector line between parents */
    parentsConnectorOffset = treeItemPosition.bottomConnectorShift - treeItemPosition.bottomConnectorInterval * (this.fromStackSize - this.fromOffset + 1);
  }

  children = [];
  if (this.toItems.length > 0) {
    hasSquared = false;

    items = this.toItems;
    for (index = 0; index < items.length; index += 1) {
      treeItemId = items[index];
      treeItemPosition = params.treeItemsPositions[treeItemId];

      isSquared = true;
      switch (treeItemPosition.actualVisibility) {
        case Visibility.Dot:
        case Visibility.Line:
          isSquared = chartHasSquaredConnectors;
          break;
      }
      connectorStep = 0;
      connectorPoint = new this.ConnectorDestination({
        id: treeItemId,
        bundleid: this.getId(data),
        x: (treeItemPosition.actualPosition.horizontalCenter() + connectorStep),
        y: treeItemPosition.actualPosition.top(),
        isSquared: isSquared,
        visibility: treeItemPosition.actualVisibility
      });
      children.push(connectorPoint);

      /* is true if any child point has squared connector */
      hasSquared = hasSquared || connectorPoint.isSquared;
    }
    children.sort(function (a, b) { return a.x - b.x; });

    /* Find offset of horizontal connector line between children */
    childrenConnectorOffset = treeItemPosition.topConnectorShift;
  }

  if (children.length == 1) {
    parentHorizontalCenter = children[0].x;
  } else if (parents.length == 1) {
    parentHorizontalCenter = parents[0].x;
  } else if (children.length > 0 && parents.length > 0) {
    parentHorizontalCenter = (parents[0].x + parents[parents.length - 1].x + children[0].x + children[children.length - 1].x) / 4.0;
  } else if (children.length > 0) {
    parentHorizontalCenter = (children[0].x + children[children.length - 1].x) / 2.0;
  } else {
    parentHorizontalCenter = (parents[0].x + parents[parents.length - 1].x) / 2.0;
  }

  var topCenterPoint = null;
  if (parents.length > 0) {
    topCenterPoint = new this.ConnectorDestination({
      id: (children.length == 0 && this.dotId ? this.dotId : this.getId(data)),
      x: parentHorizontalCenter,
      y: parentsConnectorOffset
    });
    this.traceFork(data, params, options, topCenterPoint, parents, true, true, this.fromOffset, options.showExtraArrows);
  }

  var bottomCenterPoint = null;
  if (children.length > 0) {
    bottomCenterPoint = new this.ConnectorDestination({
      id: (parents.length == 0 && this.dotId ?  this.dotId : this.getId(data)),
      x: parentHorizontalCenter,
      y: childrenConnectorOffset
    });
    if (topCenterPoint != null && bottomCenterPoint.y == topCenterPoint.y) {
      bottomCenterPoint = topCenterPoint;
    }
    this.traceFork(data, params, options, bottomCenterPoint, children, hasSquared, false, 0, options.showExtraArrows);
  }

  /* draw connector line between children and parents */
  if (topCenterPoint != null && bottomCenterPoint != null && topCenterPoint.id != bottomCenterPoint.id) {
    params.transform.transformPoints(topCenterPoint.x, topCenterPoint.y, bottomCenterPoint.x, bottomCenterPoint.y,
      true, this, function (fromX, fromY, toX, toY) {
        var polyline = new Polyline();
        polyline.addSegment(new MoveSegment(fromX, fromY));
        polyline.addSegment(new LineSegment(toX, toY));

        data.graph.addEdge(topCenterPoint.id, bottomCenterPoint.id, new this.ConnectorEdge(topCenterPoint.id, bottomCenterPoint.id, polyline,
          null,
          null,
          null, 0/* weight */));
      });
  }
};

function HorizontalConnectorBundle(fromItem, toItem) {
  this.fromItem = fromItem;
  this.toItem = toItem;
}
HorizontalConnectorBundle.prototype = new BaseConnectorBundle();

HorizontalConnectorBundle.prototype.trace = function (data, params, options) {
  var fromItemId = this.fromItem,
    toItemId = this.toItem,
    fromItemPosition = params.treeItemsPositions[fromItemId],
    toItemPosition = params.treeItemsPositions[toItemId],
    polyline = new Polyline();

  if (fromItemPosition.actualPosition.x < toItemPosition.actualPosition.x) {
    params.transform.transformPoints(fromItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift,
      toItemPosition.actualPosition.x, toItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
        polyline.addSegment(new MoveSegment(fromX, fromY));
        polyline.addSegment(new LineSegment(toX, toY));
      });//ignore jslint
  } else {
    params.transform.transformPoints(fromItemPosition.actualPosition.x, fromItemPosition.horizontalConnectorsShift,
      toItemPosition.actualPosition.right(), fromItemPosition.horizontalConnectorsShift, true, this, function (fromX, fromY, toX, toY) {
        polyline.addSegment(new MoveSegment(fromX, fromY));
        polyline.addSegment(new LineSegment(toX, toY));
      });//ignore jslint
  }
  var toItemIsVisible = toItemPosition.actualVisibility !== Visibility.Invisible;
  var fromItemIsVisible = fromItemPosition.actualVisibility !== Visibility.Invisible;

  data.graph.addEdge(fromItemId, toItemId, new this.ConnectorEdge(fromItemId, toItemId, polyline,
    toItemIsVisible ? toItemId : null,
    fromItemIsVisible ? fromItemId : null,
    null,
    (toItemIsVisible || fromItemIsVisible) ? this.NORMAL_ITEM_WEIGHT : this.LINE_ITEM_WEIGHT, 
    null, null, null,
    true)
  );
};

/* Read visual tree
    populate treeLevels array of type TreeLevel
      TreeLevel object contains ordered list of all its items 
      plus when items added to that collection we store level in item
*/
function VisualTreeLevelsTask(visualTreeTask, itemTemplateParamsTask) {
  var _data = {
    treeLevels: null, /* TreeLevels */
    bundles: null, /* array of BaseConnectorBundle objects */
    connectorStacks: null /* array of TreeLevelConnectorStackSize objects, 
      it keeps total number of horizontal connectors lines between parents and children stack on top of each other */
  },
    _nullTreeLevelConnectorStackSize = new TreeLevelConnectorStackSize();

  function process() {
    var visualTree = visualTreeTask.getVisualTree();

    _data.treeLevels = TreeLevels();

    visualTree.loopLevels(this, function (treeItemId, treeItem, levelIndex) {
      _data.treeLevels.addItem(levelIndex, treeItemId, treeItem);
    });

    _data.bundles = [];
    _data.connectorStacks = [];

    recalcLevelsDepth(_data.bundles, _data.connectorStacks, _data.treeLevels, visualTree);

    return true;
  }

  function recalcLevelsDepth(bundles, connectorStacks, treeLevels, orgTree, orgPartners) {
    var index2, len2,
      index3, len3,
      itemPosition,
      bundle, bundlesToStack, bundlesByItemId = {},
      startIndex, endIndex, stackSegments;


    treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var stacksSizes = new TreeLevelConnectorStackSize();
      connectorStacks[levelIndex] = stacksSizes;

      bundlesToStack = [];

      treeLevels.loopLevelItems(this, levelIndex, function (itemid, treeItem, position) {
        var parents = [];
        if (!bundlesByItemId.hasOwnProperty(itemid)) {
          if (treeItem.connectorPlacement & SideFlag.Bottom) {
            parents.push(itemid);
          }
          parents = parents.concat(treeItem.partners);

          if (parents.length > 0) {
            bundle = new VerticalConnectorBundle(parents, []);

            for (var index = 0, len = parents.length; index < len; index += 1) {
              bundlesByItemId[parents[index]] = bundle;
            }

            orgTree.loopChildren(this, itemid, function (childid, child, index) {
              if (child.connectorPlacement & SideFlag.Top) {
                bundle.toItems.push(childid);
              }
            }); //ignore jslint

            if (parents.length > 1) {
              bundlesToStack.push(bundle);
            }

            if (bundle.fromItems.length > 1 || bundle.toItems.length > 0) {
              bundles.push(bundle);
            }
          }
        }

        if (treeItem.connectorPlacement & SideFlag.Left) {
          bundle = new HorizontalConnectorBundle(itemid, treeLevels.getPrevItem(itemid));
          bundles.push(bundle);
        }

        if (treeItem.connectorPlacement & SideFlag.Right) {
          bundle = new HorizontalConnectorBundle(itemid, treeLevels.getNextItem(itemid));
          bundles.push(bundle);
        }
      });

      if (bundlesToStack.length > 0) {
        /* find minimum and maximum partner index at level */
        stackSegments = Pile();
        for (index2 = 0, len2 = bundlesToStack.length; index2 < len2; index2 += 1) {
          bundle = bundlesToStack[index2];

          startIndex = null;
          endIndex = null;
          for (index3 = 0, len3 = bundle.fromItems.length; index3 < len3; index3 += 1) {
            itemPosition = treeLevels.getItemPosition(bundle.fromItems[index3]);

            startIndex = (startIndex != null) ? Math.min(startIndex, itemPosition) : itemPosition;
            endIndex = (endIndex != null) ? Math.max(endIndex, itemPosition) : itemPosition;
          }
          stackSegments.add(startIndex, endIndex, bundle);
        }

        stacksSizes.parentsStackSize = stackSegments.resolve(this, function (from, to, bundle, offset, stackSize) {
          bundle.fromOffset = offset + 1;
          bundle.fromStackSize = stackSize;
        });//ignore jslint
      }
    });
  }

  function getTreeLevels() {
    return _data.treeLevels;
  }

  function getBundles() {
    return _data.bundles;
  }

  function getNestedLayoutParentConnectorIds() {
    return {}; /* org chart does not support nested layouts */
  }

  function getNestedLayoutBottomConnectorIds() {
    return {}; /* org chart does not support nested layouts */
  }

  function getConnectorsStacksSizes(levelid) {
    return _data.connectorStacks[levelid] || _nullTreeLevelConnectorStackSize;
  }

  return {
    process: process,
    getTreeLevels: getTreeLevels,
    getBundles: getBundles,
    getConnectorsStacksSizes: getConnectorsStacksSizes,
    getNestedLayoutParentConnectorIds: getNestedLayoutParentConnectorIds,
    getNestedLayoutBottomConnectorIds: getNestedLayoutBottomConnectorIds
  };
}

function OrgExtractNestedLayoutsTask(extractNestedLayoutsOptionTask, bindFamilyConnectorsTask) {
  function process(debug) {
    return false;
  }

  function getNestedLayoutParentConnectorIds() {
    return {};
  }

  function getNestedLayoutBottomConnectorIds() {
    return {};
  }

  function getBundles() {
    return [];
  }

  function getLayouts() {
    return {};
  }

  return {
    process: process,
    getNestedLayoutParentConnectorIds: getNestedLayoutParentConnectorIds,
    getNestedLayoutBottomConnectorIds: getNestedLayoutBottomConnectorIds,
    getBundles: getBundles,
    getLayouts: getLayouts
  };
}

function TreeLevelPosition(source) {
  this.currentvisibility = Visibility.Normal;
  this.actualVisibility = Visibility.Normal;

  this.shift = 0.0; /* top abolute position of items in level */
  this.depth = 0.0; /* maximum  height of items in level */
  this.nextLevelShift = 0.0; /* next level relative position */
  this.horizontalConnectorsDepth = 0; /* relative position of horizontal connectors between items */
  this.topConnectorShift = 0.0; /* relative position of top connector horizontal line */
  this.connectorShift = 0.0; /* relative position of bottom horizontal line */
  this.levelSpace = 0.0; /* user interval between prev level and this one based on options set by user, if number of horizontal connections is bigger that one it is proportionally increased */

  this.currentOffset = 0.0; /* this is x axis coordinate offset, it used to calculate horizontal items position in level */

  this.labels = [];
  this.labelsRect = null;
  this.showLabels = true;
  this.hasFixedLabels = false;

  if (source != null) {
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        this[property] = source[property];
      }
    }
  }
}
TreeLevelPosition.prototype.setShift = function (shift, levelSpace, topConnectorSpace, connectorSpace, partnerConnectorOffset) {
  this.shift = shift;
  this.levelSpace = levelSpace;

  this.topConnectorShift = -levelSpace / 2.0 - topConnectorSpace;
  this.connectorShift = this.depth + connectorSpace + (partnerConnectorOffset + 1) * (levelSpace / 2.0);
  this.nextLevelShift = topConnectorSpace + this.depth + connectorSpace + levelSpace + partnerConnectorOffset * levelSpace / 2.0;

  return this.nextLevelShift;
};

TreeLevelPosition.prototype.getNodesBottom = function() {
  return this.shift + this.depth;
};

TreeLevelPosition.prototype.toString = function () {
  return this.currentvisibility;
};

function TreeItemPosition(source) {
  this.level = null;
  
  this.actualVisibility = Visibility.Normal;
  this.actualSize = null;
  this.actualPosition = null;
  this.contentPosition = null;

  this.horizontalConnectorsShift = null;
  this.topConnectorShift = null;
  this.topConnectorInterval = 0;
  this.bottomConnectorShift = null;
  this.bottomConnectorInterval = 0;

  /* following properties are being used in matrix layout to draw connector lines */
  this.leftMedianOffset = null; /* this property is position of vertical connector lines going between columns of nodes in matrix layout on left side of the node */
  this.rightMedianOffset = null; /* the same but on the right side */

  if (source != null) {
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        switch (property) {
          case 'actualPosition':
            this.actualPosition = new Rect(source.actualPosition);
            break;
          default:
            this[property] = source[property];
            break;
        }

      }
    }
  }
}

function ChildLayoutPosition( offset, leftPadding, rightPadding ) {
  this.offset = offset;
  this.leftPadding = leftPadding;
  this.rightPadding = rightPadding;
}

function OrgLayout(visualTree, treeLevels, leftMargins, rightMargins, getConnectorsStacksSizes) {
  this.visualTree = visualTree;
  this.treeLevels = treeLevels; // TreeLevels of OrgItem used properties: isVisible
  this.leftMargins = leftMargins;
  this.rightMargins = rightMargins;
  this.getConnectorsStacksSizes = getConnectorsStacksSizes;

  this.treeLevelsPositions = [];
  this.childLayoutsPositions = {};
}
OrgLayout.prototype.loop = function (thisArg, onItem) {
  if(onItem != null) {
    var zeroBasedLevelIndex = 0;
    this.treeLevels.loopLevels(this, function (levelIndex) {
      this.treeLevels.loopLevelItems(this, levelIndex, function (treeItemId, treeItem) {
        onItem.call(thisArg, treeItem, zeroBasedLevelIndex);
      });
      zeroBasedLevelIndex+=1;
    });
  }
};


OrgLayout.prototype.measure = function (levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options) {
  this.treeLevelsPositions = [];

  this.treeLevels.loopLevels(this, function (index, levelContext) {
    var treeLevelPosition = new TreeLevelPosition();
    this.treeLevelsPositions.push(treeLevelPosition);
  });

  this.setOffsets(this.treeLevels, treeItemsPositions, this.childLayoutsPositions, this.treeLevelsPositions, this.visualTree, this.rightMargins, this.leftMargins, options.intervals, options.arrowsDirection, options.linesWidth, options.cousinsIntervalMultiplier, options.horizontalAlignment, options.padding);
  this.setLevelsDepth(this.treeLevels, treeItemsPositions, this.treeLevelsPositions, options.verticalAlignment);
  this.shiftLevels(this.treeLevelsPositions, options.padding.top, options.shifts, options.arrowsDirection, options.linesWidth, this.getConnectorsStacksSizes);

  var treeItemPosition = new TreeItemPosition();
  treeItemPosition.actualVisibility = Visibility.Normal;
  treeItemPosition.actualSize = this.getLayoutSize(this.treeLevels, treeItemsPositions, this.childLayoutsPositions, this.treeLevelsPositions, options.padding);
  return treeItemPosition;
};

OrgLayout.prototype.getLayoutSize = function (treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions, padding) {
  return new Rect(0, 0, Math.round(this.getLayoutWidth(treeLevels, treeItemsPositions, childLayoutsPositions, padding)), Math.round(this.getLayoutHeight(treeLevelsPositions, padding)));
};

OrgLayout.prototype.getLayoutWidth = function (treeLevels, treeItemsPositions, childLayoutsPositions, padding) {
  var result = 0;
  treeLevels.loopLevels(this, function (levelIndex, level) {
    var levelLength = treeLevels.getLevelLength(levelIndex);

    if (levelLength > 0) {
      var itemId = treeLevels.getItemAtPosition(levelIndex, levelLength - 1),
        treeItemPosition = treeItemsPositions[itemId],
        childLayoutPosition = childLayoutsPositions[itemId];
      result = Math.max(result, childLayoutPosition.offset + treeItemPosition.actualSize.width + padding.right);
    }
  });
  return result;
};

OrgLayout.prototype.getLayoutHeight = function (treeLevelsPositions, padding) {
  var len = treeLevelsPositions.length,
    treeLevel = treeLevelsPositions[len - 1];
  return treeLevel.getNodesBottom() + padding.bottom;
};

OrgLayout.prototype.setLevelsDepth = function (treeLevels, treeItemsPositions, treeLevelsPositions, verticalAlignment) {
  var minimalDepth,
    dotsDepth;

  treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
    var treeLevelPosition = treeLevelsPositions[levelIndex];
    treeLevelPosition.shift = 0.0;
    treeLevelPosition.depth = 0.0;
    treeLevelPosition.actualVisibility = Visibility.Invisible;

    minimalDepth = null; /* minimum  height of non-dot items in level */
    dotsDepth = null; /* maximum dots height */

    treeLevels.loopLevelItems(this, levelIndex, function (itemId, treeItem, position) {
      var treeItemPosition = treeItemsPositions[itemId];
      treeLevelPosition.depth = Math.max(treeLevelPosition.depth, treeItemPosition.actualSize.height);
      switch (treeItemPosition.actualVisibility) {
        case Visibility.Dot:
        case Visibility.Line:
        case Visibility.Invisible:
          dotsDepth = !dotsDepth ? treeItemPosition.actualSize.height : Math.min(dotsDepth, treeItemPosition.actualSize.height);
          break;
        default:
          minimalDepth = !minimalDepth ? treeItemPosition.actualSize.height : Math.min(minimalDepth, treeItemPosition.actualSize.height);
          break;
      }

      treeLevelPosition.actualVisibility = Math.min(treeLevelPosition.actualVisibility, treeItemPosition.actualVisibility);
    });

    if (minimalDepth == null) {
      minimalDepth = treeLevelPosition.depth;
    }
    if (dotsDepth != null && dotsDepth > minimalDepth) {
      minimalDepth = dotsDepth;
    }

    switch (verticalAlignment) {
      case VerticalAlignmentType.Top:
        treeLevelPosition.horizontalConnectorsDepth = minimalDepth / 2.0;
        break;
      case VerticalAlignmentType.Middle:
        treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth / 2.0;
        break;
      case VerticalAlignmentType.Bottom:
        treeLevelPosition.horizontalConnectorsDepth = treeLevelPosition.depth - minimalDepth / 2.0;
        break;
    }
  });
};

OrgLayout.prototype.shiftLevels = function (treeLevelsPositions, shift, shifts, arrowsDirection, linesWidth, getConnectorsStacksSizes) {
  var index,
    len,
    treeLevelPosition,
    childrenSpace = 0,
    parentsSpace = 0,
    arrowTipLength = linesWidth * 8;

  switch (arrowsDirection) {
    case GroupByType.Parents:
      childrenSpace = arrowTipLength;
      parentsSpace = 0;
      break;
    case GroupByType.Children:
      childrenSpace = 0;
      parentsSpace = arrowTipLength;
      break;
  }

  var isTopLevel = true;
  for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
    treeLevelPosition = treeLevelsPositions[index];
    
    if(isTopLevel && treeLevelPosition.actualVisibility == Visibility.Invisible) {
      treeLevelPosition.setShift(0, 0, 0, 0, 0);
    } else {
      var parentsStackSize = getConnectorsStacksSizes(index).parentsStackSize;
      shift += treeLevelPosition.setShift(shift, shifts[treeLevelPosition.actualVisibility], parentsSpace, childrenSpace, parentsStackSize);
      isTopLevel = false;
    }
  }
};

OrgLayout.prototype.setOffsets = function (treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions, visualTree, rightMargins, leftMargins, intervals, arrowsDirection, linesWidth, cousinsIntervalMultiplier, horizontalAlignment, padding) {
  var index, len;

  for (index = 0, len = treeLevelsPositions.length; index < len; index += 1) {
    treeLevelsPositions[index].currentOffset = 0.0;
  }

  visualTree.loopPostOrder(this, function (treeItemId, treeItem, parentId, parent) {
    var treeItemPosition = treeItemsPositions[treeItemId],
      treeItemVisibility = treeItemPosition.actualVisibility,
      treeItemLevelIndex = treeLevels.getLevelIndex(treeItemId),
      treeLevelPosition = treeLevelsPositions[treeItemLevelIndex],
      treeItemPadding = intervals[treeItemVisibility === Visibility.Auto ? treeLevelPosition.currentvisibility : treeItemVisibility] / 2.0,
      index,
      len,
      offset,
      siblings,
      gaps,
      gap,
      leftMargin,
      parentItem,
      groups,
      items,
      item1,
      item2,
      groupIndex,
      groupOffset,
      group,
      sibling,
      leftPadding = treeLevelPosition.currentOffset > 0 ? treeItemPadding + treeItemPadding * (treeItem.relationDegree) * cousinsIntervalMultiplier : padding.left,
      arrowTipLength = linesWidth * 8;

    childLayoutsPositions[treeItemId] = new ChildLayoutPosition(0,  leftPadding, treeItemPadding);
    var childLayoutPosition = childLayoutsPositions[treeItemId];

    if (arrowsDirection != GroupByType.None) {
      if (treeItem.connectorPlacement & SideFlag.Left) {
        childLayoutPosition.leftPadding += arrowTipLength;
      }
      if (treeItem.connectorPlacement & SideFlag.Right) {
        childLayoutPosition.rightPadding += arrowTipLength;
      }
    }
    childLayoutPosition.offset = treeLevelPosition.currentOffset + childLayoutPosition.leftPadding;
    treeLevelPosition.currentOffset = childLayoutPosition.offset + treeItemPosition.actualSize.width + childLayoutPosition.rightPadding;

    if (visualTree.hasChildren(treeItemId)) {
      offset = this.getChildrenOffset(treeItem, treeItemsPositions, childLayoutsPositions, visualTree, horizontalAlignment);
      if (offset > 0) {
        this.offsetItemChildren(treeItem, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
      }
      else if (offset < 0) {
        offset = -offset;
        this.offsetItem(treeItem, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);

        siblings = null;
        gaps = {};
        leftMargin = null;
        parentItem = visualTree.parent(treeItem.id);
        if (parentItem !== null) {
          visualTree.loopChildrenReversed(this, parentItem.id, function (childItemId, childItem, index) {
            if (childItem === treeItem) {
              siblings = [];
            }
            else if (siblings !== null) {
              gap = this.getGapBetweenSiblings(childItem, treeItem, rightMargins, leftMargins, treeItemsPositions, childLayoutsPositions);
              gaps[childItem.id] = gap;
              if (gap > 0) {
                siblings.splice(0, 0, childItem);
              }
              else {
                leftMargin = childItem;
                return true;
              }
            }
          });

          if (siblings.length > 0) {
            groups = null;
            if (leftMargin !== null) {
              items = [leftMargin];
              items = items.concat(siblings);
              items.push(treeItem);

              groups = [[leftMargin]];
              for (index = 1, len = items.length; index < len; index += 1) {
                item1 = items[index - 1];
                item2 = items[index];
                if (item1.gravity == HorizontalAlignmentType.Right || item2.gravity == HorizontalAlignmentType.Left) {
                  groups[groups.length - 1].push(item2);
                }
                else {
                  groups.push([item2]);
                }
              }
            }
            else {
              groups = [siblings.slice(0)];
              groups[groups.length - 1].push(treeItem);
            }

            // align items to the right
            if (groups.length > 0) {
              siblings = groups[groups.length - 1];
              for (index = siblings.length - 2; index >= 0; index -= 1) {
                sibling = siblings[index];
                gap = gaps[sibling.id];
                offset = Math.min(gap, offset);

                this.offsetItem(sibling, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
                this.offsetItemChildren(sibling, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
              }
            }

            // spread items proportionally
            groupOffset = offset / (groups.length - 1);
            for (groupIndex = groups.length - 2; groupIndex > 0; groupIndex -= 1) {
              group = groups[groupIndex];
              for (index = group.length - 1; index >= 0; index -= 1) {
                sibling = group[index];
                gap = gaps[sibling.id];
                offset = Math.min(groupIndex * groupOffset, Math.min(gap, offset));

                this.offsetItem(sibling, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
                this.offsetItemChildren(sibling, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions);
              }
            }
          }
        }
      }
    }
  });
};

OrgLayout.prototype.getGapBetweenSiblings = function(leftItem, rightItem, rightMargins, leftMargins, treeItemsPositions, childLayoutsPositions) {
  var result = null,
    itemRightMargins = this.getRightMargins(leftItem, rightMargins, treeItemsPositions, childLayoutsPositions),
    itemLeftMargins = this.getLeftMargins(rightItem, leftMargins, childLayoutsPositions),
    depth = Math.min(itemRightMargins.length, itemLeftMargins.length);

  for (var index = 0; index < depth; index += 1) {
    var gap = itemLeftMargins[index] - itemRightMargins[index];
    result = (result !== null) ? Math.min(result, gap) : gap;

    if (gap <= 0) {
      break;
    }
  }

  return Math.floor(result);
};

OrgLayout.prototype.getRightMargins = function(treeItem, rightMargins, treeItemsPositions, childLayoutsPositions) {
  var result = [],
    itemRightMargins = rightMargins[treeItem.id];
  if (itemRightMargins === undefined) {
    itemRightMargins = [];
  }
  itemRightMargins = itemRightMargins.slice();
  itemRightMargins.splice(0, 0, treeItem.id);
  for (var index = 0, len = itemRightMargins.length; index < len; index += 1) {
    var treeItemId = itemRightMargins[index];
    var treeItemPosition = treeItemsPositions[treeItemId];
    var childLayoutPosition = childLayoutsPositions[treeItemId];
    result[index] = childLayoutPosition.offset + treeItemPosition.actualSize.width + childLayoutPosition.rightPadding;
  }

  return result;
};

OrgLayout.prototype.getLeftMargins = function(treeItem, leftMargins, childLayoutsPositions) {
  var result = [],
    itemLeftMargins = leftMargins[treeItem.id];
  if (itemLeftMargins === undefined) {
    itemLeftMargins = [];
  }
  itemLeftMargins = itemLeftMargins.slice();
  itemLeftMargins.splice(0, 0, treeItem.id);
  for (var index = 0, len = itemLeftMargins.length; index < len; index += 1) {
    var childLayoutPosition = childLayoutsPositions[itemLeftMargins[index]];
    result[index] = childLayoutPosition.offset - childLayoutPosition.leftPadding;
  }

  return result;
};

OrgLayout.prototype.getChildrenOffset = function(treeItem, treeItemsPositions, childLayoutsPositions, visualTree, horizontalAlignment) {
  var treeItemPosition = treeItemsPositions[treeItem.id],
    childLayoutPosition = childLayoutsPositions[treeItem.id],
    treeItemCenterOffset = childLayoutPosition.offset + treeItemPosition.actualSize.width / 2.0,
    childrenCenterOffset = null;
  if (treeItem.visualAggregatorId === null) {
    var firstItem = null;
    visualTree.loopChildren(this, treeItem.id, function (childItemId, childItem, index) {
      firstItem = childItem;
      if (firstItem.connectorPlacement & SideFlag.Top) {
        return true;
      }
    });
    var firstItemPosition = treeItemsPositions[firstItem.id];
    var firstLayoutPosition = childLayoutsPositions[firstItem.id];

    var lastItem = null;
    visualTree.loopChildrenReversed(this, treeItem.id, function (childItemId, childItem, index) {
      lastItem = childItem;
      if (lastItem.connectorPlacement & SideFlag.Top) {
        return true;
      }
    });
    var lastItemPosition = treeItemsPositions[lastItem.id];
    var lastLayoutPosition = childLayoutsPositions[lastItem.id];

    switch (horizontalAlignment) {
      case HorizontalAlignmentType.Left:
        childrenCenterOffset = firstLayoutPosition.offset + firstItemPosition.actualSize.width / 2.0;
        break;
      case HorizontalAlignmentType.Right:
        childrenCenterOffset = lastLayoutPosition.offset + lastItemPosition.actualSize.width / 2.0;
        break;
      case HorizontalAlignmentType.Center:
        childrenCenterOffset = (firstLayoutPosition.offset + lastLayoutPosition.offset + lastItemPosition.actualSize.width) / 2.0;
        break;
    }
  }
  else {
    var visualAggregatorPosition = treeItemsPositions[treeItem.visualAggregatorId];
    var visualAggregatorLayoutPosition = childLayoutsPositions[treeItem.visualAggregatorId];
    childrenCenterOffset = visualAggregatorLayoutPosition.offset + visualAggregatorPosition.actualSize.width / 2.0;
  }

  return treeItemCenterOffset - childrenCenterOffset;
};

OrgLayout.prototype.offsetItem = function(treeItem, offset, treeLevels, treeItemsPositions, childLayoutsPositions, treeLevelsPositions ) {
  var treeItemPosition = treeItemsPositions[treeItem.id];
  var childLayoutPosition = childLayoutsPositions[treeItem.id];
  childLayoutPosition.offset += offset;

  var treeLevelPosition = treeLevelsPositions[treeLevels.getLevelIndex(treeItem.id)];
  treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, childLayoutPosition.offset + treeItemPosition.actualSize.width + childLayoutPosition.rightPadding);
};

OrgLayout.prototype.offsetItemChildren = function(treeItem, offset, treeLevels, visualTree, treeItemsPositions, childLayoutsPositions, treeLevelsPositions) {
  visualTree.loopLevels(this, treeItem.id, function (childItemId, childItem, levelid) {
    var treeItemPosition = treeItemsPositions[childItemId];
    var childLayoutPosition = childLayoutsPositions[childItemId];
    childLayoutPosition.offset += offset;

    var treeLevelPosition = treeLevelsPositions[treeLevels.getLevelIndex(childItemId)];
    treeLevelPosition.currentOffset = Math.max(treeLevelPosition.currentOffset, childLayoutPosition.offset + treeItemPosition.actualSize.width);

    return true;
  });
};

OrgLayout.prototype.arrange = function (thisArg, position, layoutDirection, treeItemsPositions, options, onItemPositioned) {
  var prevLevelPosition = null;
  if (onItemPositioned != null) {
    this.treeLevels.loopLevels(this, function (levelIndex, treeLevel) {
      var treeLevelPosition = this.treeLevelsPositions[levelIndex];

      this.treeLevels.loopLevelItems(this, levelIndex, function (itemId, treeItem, position) {
        var treeItemPosition = treeItemsPositions[itemId];
        var childLayoutPosition = this.childLayoutsPositions[itemId];
        var result = this.getItemPosition(treeItemPosition.actualVisibility, childLayoutPosition.offset, treeItemPosition.actualSize, prevLevelPosition, treeLevelPosition, options.verticalAlignment);

        onItemPositioned.call(thisArg, itemId, { ...treeItemPosition, ...result});
      });

      prevLevelPosition = treeLevelPosition;
    });
  }
};

OrgLayout.prototype.getItemPosition = function (visibility, offset, size, prevLevel, level, verticalAlignment) {
  var itemShift = 0;

  switch (visibility) {
    case Visibility.Normal:
      switch (verticalAlignment) {
        case VerticalAlignmentType.Top:
          itemShift = 0;
          break;
        case VerticalAlignmentType.Middle:
          itemShift = (level.depth - size.height) / 2.0;
          break;
        case VerticalAlignmentType.Bottom:
          itemShift = level.depth - size.height;
          break;
      }
      break;
    case Visibility.Dot:
    case Visibility.Line:
    case Visibility.Invisible:
      itemShift = level.horizontalConnectorsDepth - size.height / 2.0;
      break;
  }

  return {
    actualPosition: new Rect(offset, level.shift + itemShift, size.width, size.height),
    horizontalConnectorsShift: level.shift + level.horizontalConnectorsDepth,
    topConnectorShift: prevLevel != null ? prevLevel.shift + prevLevel.connectorShift : null,
    topConnectorInterval: prevLevel != null ? prevLevel.levelSpace / 2 : null,
    bottomConnectorShift: level.shift + level.connectorShift,
    bottomConnectorInterval: level.levelSpace / 2
  };
};

function ItemLayout(visibility) {
    this.visibility = visibility;
}

ItemLayout.prototype.measure = function (levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options) {
    var templateConfig,
        size,
        contentPosition;
    var { orientationType, checkBoxPanelSize, buttonsPanelSize, groupTitlePanelSize, groupTitlePlacementType } = options;

    var treeItemVisibility = (isSelected || isCursor) ? Visibility.Normal : this.visibility;
    var actualVisibility = (treeItemVisibility === Visibility.Auto) ? levelVisibility : treeItemVisibility;        
    switch (actualVisibility) {
        case Visibility.Normal:
            templateConfig = treeItemTemplate.template.templateConfig;
            size = new Size(templateConfig.itemSize);
            contentPosition = new Rect(0, 0, size.width, size.height);
            if (isCursor) {
                size.height += templateConfig.cursorPadding.top + templateConfig.cursorPadding.bottom;
                size.width += templateConfig.cursorPadding.left + templateConfig.cursorPadding.right;
                contentPosition.x = templateConfig.cursorPadding.left;
                contentPosition.y = templateConfig.cursorPadding.top;
            }
            if (treeItemTemplate.hasSelectorCheckbox) {
                size.height += checkBoxPanelSize;
            }
            if (treeItemTemplate.hasButtons) {
                size.width += buttonsPanelSize;
                switch (groupTitlePlacementType) {
                    case AdviserPlacementType.Right:
                        contentPosition.x += buttonsPanelSize;
                        break;
                }
            }
            if (treeItemTemplate.hasGroupTitle) {
                size.width += groupTitlePanelSize;
                switch (groupTitlePlacementType) {
                    case AdviserPlacementType.Right:
                        break;
                    default:
                        contentPosition.x += groupTitlePanelSize;
                        break;
                }
            }
        break;
        case Visibility.Dot:
            templateConfig = treeItemTemplate.template.templateConfig;
            size = new Size(templateConfig.minimizedItemSize);
        break;
        case Visibility.Line:
        case Visibility.Invisible:
            size = new Size();
        break;
    }

    switch (orientationType) {
        case OrientationType.Left:
        case OrientationType.Right:
            size.invert();
        break;
    }

    var treeItemPosition = new TreeItemPosition();
    treeItemPosition.actualVisibility = actualVisibility;
    treeItemPosition.actualSize = size;
    treeItemPosition.contentPosition = contentPosition;
    return treeItemPosition;
};

ItemLayout.prototype.arrange = function (thisArg, position, layoutDirection, treeItemsPositions, options, onItemPositioned) {
    /* no child layouts */
};

function OrgCreateLayoutsTreeTask(visualTreeTask, visualTreeLevelsTask, extractNestedLayoutsTask ) {

  var _data = {
    layoutsTree: {},
    maximumId: null
  };

  function process() {
    var visualTree = visualTreeTask.getVisualTree();
    var leftMargins = visualTreeTask.getLeftMargins();
    var rightMargins = visualTreeTask.getRightMargins();
    var maximumId = visualTreeTask.getMaximumId();
    var treeLevels = visualTreeLevelsTask.getTreeLevels();
    var getConnectorsStacksSizes = visualTreeLevelsTask.getConnectorsStacksSizes;
    var layouts = extractNestedLayoutsTask.getLayouts();
    
    var rootLayout = new OrgLayout(visualTree, treeLevels, leftMargins, rightMargins, getConnectorsStacksSizes);
    var layoutsTree = Tree();
    maximumId++;
    layoutsTree.add(null, maximumId, rootLayout);

    var levelLayouts = [{ id: maximumId, levelLayout: rootLayout }];
    while(levelLayouts.length > 0) {
      var nextLevelLayouts = [];
      for(var index = 0; index < levelLayouts.length; index+=1) {
        var { id, levelLayout } = levelLayouts[index];
        levelLayout.loop(this, function(treeItem) {
          var treeItemId = treeItem.id;
          var itemLayout = layouts[treeItemId];
          if(!itemLayout) {
            itemLayout = new ItemLayout(treeItem.visibility);
          } else {
            nextLevelLayouts.push({id: treeItemId, levelLayout: itemLayout});
          }
          layoutsTree.add(id, treeItemId, itemLayout);
        });
      }
      levelLayouts = nextLevelLayouts;
    }

    _data.layoutsTree = layoutsTree;
    _data.maximumId = maximumId;

    return true;
  }


  function getLayoutsTree() {
    return _data.layoutsTree;
  }

  function getMaximumId() {
    return _data.maximumId;
  }

  return {
    process: process,
    getLayoutsTree: getLayoutsTree,
    getMaximumId: getMaximumId
  };
}

function ConnectionsGraphTask(getGraphics, createTransformTask, connectorsOptionTask, visualTreeLevelsTask, extractNestedLayoutsTask, alignDiagramTask, removeLoopsTask) {
  var _data = {
    graph: null,
    nodeid: 0
  };

  function process() {
    var bundles = visualTreeLevelsTask.getBundles(),
      bundles2 = extractNestedLayoutsTask.getBundles(),
      nestedLayoutParentConnectorIds = extractNestedLayoutsTask.getNestedLayoutParentConnectorIds(),
      nestedLayoutBottomConnectorIds = extractNestedLayoutsTask.getNestedLayoutBottomConnectorIds(),
      connectorsOptions = connectorsOptionTask.getOptions(),
      loops = removeLoopsTask != null ? removeLoopsTask.getLoops() : [];

    bundles = bundles.concat(bundles2);

    var data = {
      graph: Graph(),
      nodeid: 0
    };

    var params = {
      treeItemsPositions: alignDiagramTask.getItemsPositions(),
      nestedLayoutParentConnectorIds: nestedLayoutParentConnectorIds,
      nestedLayoutBottomConnectorIds: nestedLayoutBottomConnectorIds,
      transform: createTransformTask.getTransform()
    };

    var options = {
      connectorType: connectorsOptions.connectorType,
      showExtraArrows: connectorsOptions.showExtraArrows,
      bevelSize: connectorsOptions.bevelSize,
      elbowType: connectorsOptions.elbowType
    };

    for (var index = 0, len = bundles.length; index < len; index += 1) {
      var bundle = bundles[index];

      bundle.trace(data, params, options);
    }

    TraceLoops(data.graph, loops, connectorsOptions.extraArrowsMinimumSpace);

    _data = data;

    return true;
  }

  function TraceLoops(graph, loops) {
    var edges = [];
    for(var isOppositeFlow = 1; isOppositeFlow >= 0; isOppositeFlow -=1) {
      for (var index = 0, len = loops.length; index < len; index += 1) {
        var loop = loops[index];
        if(loop.isOppositeFlow == (isOppositeFlow == 1)) {
          graph.getShortestPath(this, loop.from, [loop.to], function (connectorEdge, fromItem, toItem) {
            return connectorEdge.weight;
          }, function (path, to) {
            for (var index2 = 0, len2 = path.length - 1; index2 < len2; index2 += 1) {
              var fromItem = path[index2], toItem = path[index2 + 1];
              var edge = graph.edge(fromItem, toItem);
              if(edge.polyline.length() > 0) {
                edge.isOppositeFlow = (isOppositeFlow == 1);
                edges.push(edge);
              }
            }
          }); //ignore jslint
        }
      }
    }
    for (var index = 0, len = edges.length; index < len; index += 1) {
      var edge = edges[index];
      if(edge.isOppositeFlow) {
        edge.hasArrow = true;
      }
    }
  }

  function getGraph() {
    return _data.graph;
  }

  return {
    process: process,
    getGraph: getGraph
  };
}

function HighlightItemTask(highlightItemOptionTask, activeItemsTask) {
  var _data = {
    highlightTreeItemId: null
  };

  function process() {
    var treeItemId = highlightItemOptionTask.getHighlightItem(),
      activeItems = (activeItemsTask != null) ? activeItemsTask.getActiveItems() : {};

    _data.highlightTreeItemId = (treeItemId != null && activeItems.hasOwnProperty(treeItemId)) ? treeItemId : null;

    return true;
  }

  function getHighlightTreeItem() {
    return _data.highlightTreeItemId;
  }

  return {
    process: process,
    getHighlightTreeItem: getHighlightTreeItem
  };
}

function CursorItemTask(cursorItemOptionTask, activeItemsTask) {
  var _data = {
    cursorTreeItemId: null
  };

  function process() {
    var treeItemId = cursorItemOptionTask.getCursorItem(),
      activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};

    _data.cursorTreeItemId = (treeItemId != null && activeItems.hasOwnProperty(treeItemId)) ? treeItemId : null;

    return true;
  }

  function getCursorTreeItem() {
    return _data.cursorTreeItemId;
  }

  function getItems() {
    return (_data.cursorTreeItemId != null) ? [_data.cursorTreeItemId] : [];
  }

  return {
    process: process,
    getCursorTreeItem: getCursorTreeItem,
    getItems: getItems
  };
}

function OrgCursorNeighboursTask(cursorItemTask, navigationFamilyTask) {
  var _data = {
    items: []
  };

  function process() {
    var navigationFamily = navigationFamilyTask.getLogicalFamily(),
      cursorTreeItemId = cursorItemTask.getCursorTreeItem();

    _data.items = getCursorNeighbours(cursorTreeItemId, navigationFamily);

    return true;
  }

  function getCursorNeighbours(cursorTreeItemId, navigationFamily) {
    var result = [];
    if (cursorTreeItemId !== null) {
      navigationFamily.loopNeighbours(this, cursorTreeItemId, function (treeItemId, treeItem, distance) {
        if (treeItem.isVisible) {
          result.push(treeItemId);
        }
        return true;
      });
    }
    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
}

function SelectedItemsTask(selectedItemsOptionTask, itemsOptionTask) {
  var _data = {
    items: []
  },
    _hash = {},
    _dataTemplate = new ArrayReader(
      new ValueReader(["string", "number"], true),
      true
    );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      selectedItems = selectedItemsOptionTask.getSelectedItems();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(selectedItems), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(selectedItems) {
    var result = [],
      processed = {},
      index, len,
      treeItemId;

    for (index = 0, len = selectedItems.length; index < len; index += 1) {
      treeItemId = selectedItems[index];
      if (treeItemId != null && !processed.hasOwnProperty(treeItemId)) {
        processed[treeItemId] = true;
        if(itemsOptionTask.getConfig(treeItemId) != null) {
          result.push(treeItemId);
        }
      }
    }

    return result;
  }

  function isSelected(itemid) {
    return _hash.items.hasOwnProperty(itemid);
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems,
    isSelected: isSelected
  };
}

function OrgSelectionPathItemsTask(navigationFamilyTask, cursorItemTask, selectedItemsTask, cursorSelectionPathModeOptionTask) {
  var _data = {
    items: []
  };

  function process() {
    var selectionPathMode = cursorSelectionPathModeOptionTask.getSelectionPathMode(),
      navigationFamily = navigationFamilyTask.getLogicalFamily(),
      cursorTreeItemId = cursorItemTask.getCursorTreeItem(),
      selectedItems = selectedItemsTask.getItems().slice(0);

    selectedItems.push(cursorTreeItemId);

    _data.items = getSelectionPathItems(selectedItems, navigationFamily, selectionPathMode);

    return true;
  }

  function getSelectionPathItems(selectedItems, navigationFamily, selectionPathMode) {
    var result = [],
      processed = {},
      selectedItem,
      index, len;

    for (index = 0, len = selectedItems.length; index < len; index += 1) {
      selectedItem = selectedItems[index];
      /* show cursor full stack */
      switch (selectionPathMode) {
        case SelectionPathMode.None:
          break;
        case SelectionPathMode.FullStack:
          /* select all parents up to the root */
          navigationFamily.loopParents(this, selectedItem, function (parentItemId, parentItem) {
            if (processed[parentItemId] != null) {
              return navigationFamily.SKIP;
            }
            if (parentItem.visibility != Visibility.Invisible) {
              result.push(parentItemId);
            }
            processed[parentItemId] = true;
          });
          break;
      }
    }
    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
}

function NormalVisibilityItemsByAnnotationTask(annotationOptionTask) {
  var _data = {
    items: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ValueReader(["string", "number"], true),
    true
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      annotations = annotationOptionTask.getAnnotations();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(annotations), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(annotations) {
    var result = [],
      processed = {},
      index, len, index2, len2,
      items, annotation,
      treeItemId;

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotation = annotations[index];
      if (annotation.selectItems) {
        items = annotation.items;
        for (index2 = 0, len2 = items.length; index2 < len2; index2 += 1) {
          treeItemId = items[index2];
          if (treeItemId != null && !processed.hasOwnProperty(treeItemId)) {
            result.push(treeItemId);
            processed[treeItemId] = true;
          }
        }
      }
    }

    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
}

function NormalVisibilityItemsByConnectorAnnotationTask(connectorAnnotationOptionTask) {
  var _data = {
    items: []
  },
    _hash = {},
    _dataTemplate = new ArrayReader(
      new ValueReader(["string", "number"], true),
      true
    );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      annotations = connectorAnnotationOptionTask.getAnnotations();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(annotations), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(annotations) {
    var result = [],
      processed = {},
      index, len,
      annotation;

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotation = annotations[index];
      if (annotation.selectItems) {
        if (annotation.fromItem != null && !processed.hasOwnProperty(annotation.fromItem)) {
          result.push(annotation.fromItem);
          processed[annotation.fromItem] = true;
        }
        if (annotation.toItem != null && !processed.hasOwnProperty(annotation.toItem)) {
          result.push(annotation.toItem);
          processed[annotation.toItem] = true;
        }
      }
    }

    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
}

function OrgNormalVisibilityItemsByMinimumVisibleLevelsTask(minimumVisibleLevelsOptionTask, orgTreeTask) {
  var _data = {
    items: []
  },
    _hash = {};

  var _dataTemplate = new ArrayReader(
    new ValueReader(["string", "number"], true),
    true
  );

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
    orgTree = orgTreeTask.getOrgTree(),
    { pageFitMode, minimalVisibility, minimumVisibleLevels } = minimumVisibleLevelsOptionTask.getOptions();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(orgTree, pageFitMode, minimalVisibility, minimumVisibleLevels), "items", context);

    return context.isChanged;
  }

  function getSelectedItems(orgTree, pageFitMode, minimalVisibility, minimumVisibleLevels ) {
    var result = [],
      buckets = [];

    if(minimumVisibleLevels > 0) {
      if(PageFitMode.PageWidth == pageFitMode || PageFitMode.PageHeight || PageFitMode.FitToPage) {
        if(minimalVisibility != Visibility.Normal) {
          orgTree.loopLevels(this, function(nodeId, node, levelIndex) {
            if(node.isVisible) {
              var nodeLevel = levelIndex + node.levelOffset;
              if(!buckets[nodeLevel]) {
                buckets[nodeLevel] = [nodeId];
              } else {
                buckets[nodeLevel].push(nodeId);
              }
            }
          });

          var actualLevel = 0;
          for(var index = 0; index < buckets.length; index+=1) {
            if(buckets[index] != null) {
              result = result.concat(buckets[index]);
              actualLevel+=1;

              if(actualLevel >= minimumVisibleLevels) {
                break;
              }
            }
          }
        }
      }
    }

    return result;
  }

  function getItems() {
    return _data.items;
  }

  return {
    process: process,
    getItems: getItems
  };
}

function CombinedNormalVisibilityItemsTask(itemsSizesOptionTask, cursorItemTask, cursorNeighboursTask, selectedItemsTask, selectionPathItemsTask,
  normalVisibilityItemsByForegroundShapeAnnotationTask, normalVisibilityItemsByBackgroundShapeAnnotationTask,
  normalVisibilityItemsByBackgroundAnnotationTask,
  normalVisibilityItemsByForegroundHighlightPathAnnotationTask, normalVisibilityItemsByBackgroundHighlightPathAnnotationTask,
  normalVisibilityItemsByForegroundConnectorAnnotationTask, normalVisibilityItemsByBackgroundConnectorAnnotationTask,
  NormalVisibilityItemsByMinimumVisibleLevelsTask
) {
  var _data = {
    items: []
  },
    _hash = {},
    _sourceTasks = [
      cursorItemTask,
      cursorNeighboursTask,
      selectedItemsTask,
      selectionPathItemsTask,
      normalVisibilityItemsByForegroundShapeAnnotationTask, normalVisibilityItemsByBackgroundShapeAnnotationTask,
      normalVisibilityItemsByBackgroundAnnotationTask,
      normalVisibilityItemsByForegroundHighlightPathAnnotationTask, normalVisibilityItemsByBackgroundHighlightPathAnnotationTask,
      normalVisibilityItemsByForegroundConnectorAnnotationTask, normalVisibilityItemsByBackgroundConnectorAnnotationTask,
      NormalVisibilityItemsByMinimumVisibleLevelsTask
    ],
    _dataTemplate = new ArrayReader(
      new ValueReader(["string", "number"], true),
      true
    );


  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      itemsSizesOption = itemsSizesOptionTask.getOptions();

    _data.items = _dataTemplate.read(_data.items, getSelectedItems(_sourceTasks), "items", context);

    if (itemsSizesOption.pageFitMode == PageFitMode.None || itemsSizesOption.minimalVisibility == Visibility.Normal) {
      context.isChanged = false;
    }

    return context.isChanged;
  }

  function getSelectedItems(sourceTasks, getItemOptions) {
    var result = [],
      sourceIndex, sourceLen,
      sourceTask,
      index, len,
      items, item,
      processed = {};

    for (sourceIndex = 0, sourceLen = sourceTasks.length; sourceIndex < sourceLen; sourceIndex += 1) {
      sourceTask = sourceTasks[sourceIndex];
      items = sourceTask.getItems();

      for (index = 0, len = items.length; index < len; index += 1) {
        item = items[index];

        if (!processed.hasOwnProperty(item)) {
          result.push(item);
          processed[item] = true;
        }
      }
    }
    return result;
  }

  function isItemSelected(treeItem) {
    return _hash.items.hasOwnProperty(treeItem);
  }

  return {
    process: process,
    isItemSelected: isItemSelected
  };
}

function FrameSizeTask(frameOptionTask, readTemplatesTask, scaleOptionTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    median: new ObjectReader({
      left: new ValueReader(["number"], false, 0),
      top: new ValueReader(["number"], false, 0),
      right: new ValueReader(["number"], false, 0),
      bottom: new ValueReader(["number"], false, 0)
    }, false, new Thickness(0, 0, 0, 0)),
    thickness: new ObjectReader({
      left: new ValueReader(["number"], false, 0),
      top: new ValueReader(["number"], false, 0),
      right: new ValueReader(["number"], false, 0),
      bottom: new ValueReader(["number"], false, 0)
    }, false, new Thickness(0, 0, 0, 0))
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, getFrameSize(), "options", context);

    return context.isChanged;
  }

  function getFrameSize() {
    var frameOptions = frameOptionTask.getOptions(),
      showFrame = frameOptions.showFrame,
      frameInnerPadding = frameOptions.frameInnerPadding,
      frameOuterPadding = frameOptions.frameOuterPadding,
      scale = scaleOptionTask.getOptions().scale,
      median = new Thickness(0, 0, 0, 0),
      thickness = new Thickness(0, 0, 0, 0);

    if(showFrame) {
      var maximumMarkerSize = new Size(0, 0),
          maximumMarkerPadding = new Thickness(0, 0, 0, 0),
          index, len,
          templates = readTemplatesTask.getItemTemplates();

      for (index = 0, len = templates.length; index < len; index += 1) {
        var template = templates[index];
        var templateConfig = template.templateConfig,
            cursorPadding = new Thickness(templateConfig.cursorPadding),
            highlightPadding = new Thickness(templateConfig.highlightPadding);
        
        cursorPadding.addThickness(templateConfig.cursorBorderWidth);
        highlightPadding.addThickness(templateConfig.highlightBorderWidth);

        maximumMarkerSize.maxSize(templateConfig.minimizedItemSize);
        maximumMarkerPadding.maxThickness(templateConfig.cursorPadding);
        maximumMarkerPadding.maxThickness(templateConfig.highlightPadding);
      }

      median = new Thickness(Math.ceil(maximumMarkerSize.width / 2.0) + maximumMarkerPadding.right, 
        Math.ceil(maximumMarkerSize.height / 2.0) + maximumMarkerPadding.bottom, 
        Math.ceil(maximumMarkerSize.width / 2.0) + maximumMarkerPadding.left, 
        Math.ceil(maximumMarkerSize.height / 2.0) + maximumMarkerPadding.top
      );
      median.addThickness(frameInnerPadding);
      median.scale(scale);
      thickness = new Thickness(maximumMarkerSize.width + maximumMarkerPadding.left + maximumMarkerPadding.right, 
        maximumMarkerSize.height + maximumMarkerPadding.top + maximumMarkerPadding.bottom, 
        maximumMarkerSize.width + maximumMarkerPadding.left + maximumMarkerPadding.right, 
        maximumMarkerSize.height + maximumMarkerPadding.top + maximumMarkerPadding.bottom
      );
      thickness.addThickness(frameInnerPadding);
      thickness.addThickness(frameOuterPadding);
      thickness.scale(scale);
    }
    return { median: median, thickness: thickness };
  }

  function getMedian() {
    return _data.median;
  }

  function getThickness() {
    return _data.thickness;
  }

  return {
    process: process,
    getMedian: getMedian,
    getThickness: getThickness
  };
}

function LevelTitleSizeTask(levelTitlePlacementOptionTask, levelAnnotationOptionTask, orientationOptionTask, scaleOptionTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    thickness: new ObjectReader({
      left: new ValueReader(["number"], false, 0),
      top: new ValueReader(["number"], false, 0),
      right: new ValueReader(["number"], false, 0),
      bottom: new ValueReader(["number"], false, 0)
    }, false, new Thickness(0, 0, 0, 0))
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, getThickness(), "options", context);

    return context.isChanged;
  }

  function getThickness() {
    var { levelTitlePlaceInside, levelTitlePanelSize, levelTitlePlacementType } = levelTitlePlacementOptionTask.getOptions(),
      { scale } = scaleOptionTask.getOptions(),
      { orientationType } = orientationOptionTask.getOptions(),
      annotations = levelAnnotationOptionTask.getAnnotations(),
      thickness = new Thickness(0, 0, 0, 0);

    if(annotations.length > 0) {
      if(levelTitlePlaceInside) {
        levelTitlePanelSize = -levelTitlePanelSize;
      }
      switch(levelTitlePlacementType) {
        case AdviserPlacementType.Right:
          switch(orientationType) {
            case OrientationType.Left:
              thickness = new Thickness(0, levelTitlePanelSize, 0, 0);
              break;
            case OrientationType.Right:
              thickness = new Thickness(0, 0, 0, levelTitlePanelSize);
              break;
            case OrientationType.Top:
            case OrientationType.Bottom:
              thickness = new Thickness(0, 0, levelTitlePanelSize, 0);
          }            
          break;
        case AdviserPlacementType.Left:
        default:
          switch(orientationType) {
            case OrientationType.Left:
              thickness = new Thickness(0, 0, 0, levelTitlePanelSize);
              break;
            case OrientationType.Right:
              thickness = new Thickness(0, levelTitlePanelSize, 0, 0);
              break;
            case OrientationType.Top:
            case OrientationType.Bottom:
              thickness = new Thickness(levelTitlePanelSize, 0, 0, 0);
          }
          break;
      }
      thickness.scale(scale);
    }

    return { thickness: thickness };
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions
  };
}

function LayoutOptionsTask(getLayout, optionsTask) {
  var _data = {};

  function process() {
    _data = getLayout();

    return true;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions,
    description: "Raw layout options."
  };
}

function CurrentControlSizeTask(layoutOptionsTask, itemsSizesOptionTask, frameSizeTask, levelTitleSizeTask) {
  var _data = {},
    _hash = {},
    _dataTemplate = new ObjectReader({
      scrollPanelSize: new ObjectReader({
        width: new ValueReader(["number"], true),
        height: new ValueReader(["number"], true)
      }, true),
      optimalPanelSize: new ObjectReader({
        width: new ValueReader(["number"], true),
        height: new ValueReader(["number"], true)
      }, true),
      hasFrame: new ValueReader(["boolean"], true),
      hasLevelTitles: new ValueReader(["boolean"], true)
    });

  function process() {
    var result = false,
      context = { isChanged: false, hash: _hash },
      layoutOptions = layoutOptionsTask.getOptions(),
      { pageFitMode } = itemsSizesOptionTask.getOptions(),
      frameThickness = new Thickness(frameSizeTask.getThickness()),
      levelTitlesThickness = new Thickness(levelTitleSizeTask.getOptions().thickness);

    // disable outer level titles if its square space is bigger than viewport
    layoutOptions.hasLevelTitles = false;
    if(levelTitlesThickness.isPositive()) {
      let viewportSize = new Size(layoutOptions.scrollPanelSize);
      viewportSize.removeThickness(levelTitlesThickness);
      if(layoutOptions.scrollPanelSize.space() < viewportSize.space() * 2) {
        layoutOptions.scrollPanelSize = viewportSize;
        layoutOptions.hasLevelTitles = true;
      }
    }      

    // disable frame if its square space is bigger than viewport
    layoutOptions.hasFrame = false;
    if(frameThickness.isPositive()) {
      let viewportSize = new Size(layoutOptions.scrollPanelSize);
      viewportSize.removeThickness(frameThickness);
      if(layoutOptions.scrollPanelSize.space() < viewportSize.space() * 2) {
        layoutOptions.scrollPanelSize = viewportSize;
        layoutOptions.hasFrame = true;
      }
    }

    layoutOptions.optimalPanelSize = new Size(layoutOptions.scrollPanelSize.width - 25, layoutOptions.scrollPanelSize.height - 25);

    _data = _dataTemplate.read(_data, layoutOptions, "layout", context);

    switch (pageFitMode) {
      case PageFitMode.PageWidth:
      case PageFitMode.PageHeight:
      case PageFitMode.FitToPage:
      case PageFitMode.None:
      case PageFitMode.SelectionOnly:
        result = context.isChanged;
        break;

    }

    return result;
  }

  function getOptions() {
    return _data;
  }

  return {
    process: process,
    getOptions: getOptions
  };
}

function CurrentScrollPositionTask(layoutOptionsTask) {
  var _data = {
    placeholderOffset: null
  },
    _hash = {},
    _dataTemplate = new ObjectReader({
      placeholderOffset: new ObjectReader({
        x: new ValueReader(["number"], true),
        y: new ValueReader(["number"], true)
      }, true)
    });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    },
      layoutOptions = layoutOptionsTask.getOptions();
    _data = _dataTemplate.read(_data, layoutOptions, "layout", context);

    return context.isChanged;
  }

  function getPlaceholderOffset() {
    return _data.placeholderOffset;
  }

  return {
    process: process,
    getPlaceholderOffset: getPlaceholderOffset
  };
}

function LevelVisibility(level, visibility) {
  this.level = level;
  this.visibility = visibility;
}
function ItemsPositionsTask(currentControlSizeTask, scaleOptionTask, orientationOptionTask, itemsSizesOptionTask, connectorsOptionTask, normalizeOptionTask,
  createLayoutsTreeTask,
  itemTemplateParamsTask,
  cursorItemTask, combinedNormalVisibilityItemsTask) {

  var _data = {
    treeItemsPositions: {}, // TreeItemPosition();
    size: null // Rect();
  };

  function process() {
    var { verticalAlignment, pageFitMode, minimalVisibility, padding,
      normalLevelShift, dotLevelShift, lineLevelShift, normalItemsInterval, dotItemsInterval, lineItemsInterval,
      checkBoxPanelSize, buttonsPanelSize, groupTitlePanelSize, groupTitlePlacementType, cousinsIntervalMultiplier } = itemsSizesOptionTask.getOptions();
    var { arrowsDirection, linesWidth } = connectorsOptionTask.getOptions();
    var { maximumColumnsInMatrix, horizontalAlignment } = normalizeOptionTask.getOptions();
    var { orientationType } = orientationOptionTask.getOptions();

    var isItemSelected = combinedNormalVisibilityItemsTask.isItemSelected;
    var cursorItemId = cursorItemTask.getCursorTreeItem();
    var getTemplateParams = itemTemplateParamsTask.getTemplateParams;

    /* calculate panel size */
    var { optimalPanelSize } = currentControlSizeTask.getOptions();
    var panelSize = new Size(optimalPanelSize);
    var { scale } = scaleOptionTask.getOptions();
    panelSize.scale(1.0 / scale);

    var layoutsTree = createLayoutsTreeTask.getLayoutsTree();
    
    /* find root layout id */
    var rootLayoutId = null;
    layoutsTree.loopLevels(this, function(nodeId, node, levelIndex) {
      rootLayoutId = nodeId;
      return layoutsTree.BREAK;
    });

    /* enumerate items level indexes */
    var levelIndexes = {};
    var maximumLevelIndex = 0;
    var hasNodes = false;
    layoutsTree.loopLevels(this, function(layoutId, layout, levelIndex) {
      if(layout.loop != null) {
        var parentId = layoutsTree.parentid(layoutId);
        var parentLevelIndex = levelIndexes[parentId] || 0;

        layout.loop(this, function(treeItem, levelIndex) {
          var itemLevelIndex = parentLevelIndex + levelIndex;
          levelIndexes[treeItem.id] = itemLevelIndex;
          maximumLevelIndex = Math.max(maximumLevelIndex, itemLevelIndex);
          hasNodes = true;
        });
      }
    });

    var options = {
      verticalAlignment,
      pageFitMode,
      padding,
      minimalVisibility,
      orientationType,
      arrowsDirection,
      linesWidth,
      checkBoxPanelSize,
      buttonsPanelSize,
      groupTitlePanelSize,
      groupTitlePlacementType,
      maximumColumnsInMatrix,
      horizontalAlignment,
      shifts: getShifts(normalLevelShift, dotLevelShift, lineLevelShift, lineLevelShift),
      intervals: getIntervals(normalItemsInterval, dotItemsInterval, lineItemsInterval, lineItemsInterval),
      cousinsIntervalMultiplier
    };

    /* find optimal panel size */
    _data.treeItemsPositions = {};
    _data.size = panelSize;

    if(hasNodes) {
      var {treeItemsPositions, size} = autoFitDiagramToPageSize(panelSize, maximumLevelIndex, rootLayoutId, layoutsTree, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);
      _data.treeItemsPositions = treeItemsPositions;
      _data.size = size;

      /* arrange items positions */
      var treeItemPosition = _data.treeItemsPositions[rootLayoutId];
      treeItemPosition.actualPosition = new Rect(0, 0, _data.size.width, _data.size.height);

      var layoutsDirections = {};
      layoutsTree.loopPreOrder(this, function(childLayoutId, childLayout, parentLayoutId, parentLayout) {
        var treeItemPosition = _data.treeItemsPositions[childLayoutId];
        var layoutDirection = layoutsDirections[childLayoutId];
        childLayout.arrange(this, treeItemPosition.actualPosition, layoutDirection, _data.treeItemsPositions, options, function (treeItemId, treeItemPosition, layoutDirection) {
          _data.treeItemsPositions[treeItemId] = treeItemPosition;
          layoutsDirections[treeItemId] = layoutDirection;
        });
      });
    }
    return true;
  }

  function autoFitDiagramToPageSize(panelSize, maximumLevelIndex, rootLayoutId, layoutsTree, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options) {
    var result,
      possibleLevelVisibilities,
      enabledLevelVisibilities;

    var { orientationType, pageFitMode, minimalVisibility } = options;

    switch (orientationType) {
      case OrientationType.Left:
      case OrientationType.Right:
        panelSize.invert();
        break;
    }

    switch (pageFitMode) {
      case PageFitMode.None:
      case PageFitMode.AutoSize:
        possibleLevelVisibilities = [new LevelVisibility(0, Visibility.Normal)];
        enabledLevelVisibilities = getLevelVisibilities(maximumLevelIndex, possibleLevelVisibilities, 0);
        result = measureLayout(rootLayoutId, layoutsTree, enabledLevelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);
        break;
      default:
        possibleLevelVisibilities = getPossibleLevelVisibilities(maximumLevelIndex, minimalVisibility);
        enabledLevelVisibilities = getLevelVisibilities(maximumLevelIndex, possibleLevelVisibilities, possibleLevelVisibilities.length - 1);

        // Find minimal placeholder size to hold completely folded diagram
        result = measureLayout(rootLayoutId, layoutsTree, enabledLevelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);
        if (checkDiagramSize(result.size, panelSize, pageFitMode)) {
          /* maximum compression fits to page */
          var minimalPlaceholderSize = new Rect(0, 0, result.size.width, result.size.height);
          minimalPlaceholderSize.addRect(0, 0, panelSize.width, panelSize.height);
          minimalPlaceholderSize.offset(0, 0, 5, 5);
          /* Find optimal diagram size */
          findOptimalSize(this, possibleLevelVisibilities.length - 1, function (index) {
            enabledLevelVisibilities = getLevelVisibilities(maximumLevelIndex, possibleLevelVisibilities, index);
            result = measureLayout(rootLayoutId, layoutsTree, enabledLevelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options);

            /* compare root layout to the available panel space */
            return checkDiagramSize(result.size, minimalPlaceholderSize, options.pageFitMode);
          });
        }
        break;
    }

    return result;
  }

  function findOptimalSize(thisArg, maximum, funcCheckSize) {
    var minimum = 0,
      cursorIndex;
    if (!funcCheckSize.call(thisArg, minimum)) {
      /* minimum compression does not fit to page */
      cursorIndex = maximum;
      while (maximum - minimum > 1) {
        cursorIndex = Math.floor((maximum + minimum) / 2.0);
        if (funcCheckSize.call(thisArg, cursorIndex)) {
          /* middle point size fit to page */
          maximum = cursorIndex;
        }
        else {
          minimum = cursorIndex;
        }
      }
      if (maximum !== cursorIndex) {
        funcCheckSize.call(thisArg, maximum);
      }
    }
  }
  function measureLayout(rootLayoutId, layoutsTree, levelVisibilities, levelIndexes, cursorItemId, isItemSelected, getTemplateParams, options ) {
    var treeItemsPositions = {};

    /* measure individual nodes from bottom to up */
    layoutsTree.loopPostOrder(this, function(childLayoutId, childLayout, parentLayoutId, parentLayout) {
      var levelIndex = levelIndexes[childLayoutId];
      var levelVisibility = levelVisibilities[levelIndex];
      var isCursor = (cursorItemId == childLayoutId);
      var isSelected = isItemSelected(childLayoutId);
      var treeItemTemplate = getTemplateParams(childLayoutId);
      treeItemsPositions[childLayoutId] = childLayout.measure(levelVisibility, isCursor, isSelected, treeItemTemplate, treeItemsPositions, options);
    });

    return {
      treeItemsPositions,
      size: treeItemsPositions[rootLayoutId].actualSize
    }
  }

  function getLevelVisibilities(maximumLevelIndex, possibleLevelVisibilities, cursorIndex) {
    var index,
      levelVisibility;

    var result = [];
    for(var levelIndex = 0; levelIndex <= maximumLevelIndex; levelIndex+=1 ) {
      result.push(Visibility.Normal);
    }
    /* set levels visibility */ 
    for (index = 0; index <= cursorIndex; index += 1) {
      levelVisibility = possibleLevelVisibilities[index];
      result[levelVisibility.level] = levelVisibility.visibility;
    }
    return result;
  }

  function getPossibleLevelVisibilities(maximumLevelIndex, minimalVisibility) {
    var result = [new LevelVisibility(0, Visibility.Normal)];
    var visibilities = [];
    switch (minimalVisibility) {
      case Visibility.Normal:
        break;
      case Visibility.Dot:
        visibilities.push(Visibility.Dot);
        break;
      case Visibility.Auto:
      case Visibility.Line:
      case Visibility.Invisible:
        visibilities.push(Visibility.Dot);
        visibilities.push(Visibility.Line);
        break;
    }
  
    for(var levelIndex = maximumLevelIndex; levelIndex >= 0; levelIndex-=1) {
      for (var index = 0; index < visibilities.length; index += 1) {
        result.push(new LevelVisibility(levelIndex, visibilities[index]));
      }
    }  
    return result;
  }
  function checkDiagramSize(diagramSize, panelSize, pageFitMode) {
    var result = false;
    switch (pageFitMode) {
      case PageFitMode.PageWidth:
        if (panelSize.width >= diagramSize.width) {
          result = true;
        }
        break;
      case PageFitMode.PageHeight:
        if (panelSize.height >= diagramSize.height) {
          result = true;
        }
        break;
      case PageFitMode.FitToPage:
        if (panelSize.height >= diagramSize.height && panelSize.width >= diagramSize.width) {
          result = true;
        }
        break;
    }
    return result;
  }
  function getShifts(normalLevelShift, dotLevelShift, lineLevelShift, invisibleLineLevelShift) {
    var result = [];
    result[Visibility.Normal] = normalLevelShift;
    result[Visibility.Dot] = dotLevelShift;
    result[Visibility.Line] = lineLevelShift;
    result[Visibility.Invisible] = invisibleLineLevelShift;
    return result;
  }  
  function getIntervals(normalItemsInterval, dotItemsInterval, lineItemsInterval, invisibleLineItemsInterval) {
    var result = [];
    result[Visibility.Normal] = normalItemsInterval;
    result[Visibility.Dot] = dotItemsInterval;
    result[Visibility.Line] = lineItemsInterval;
    result[Visibility.Invisible] = invisibleLineItemsInterval;
    return result;
  }
  function getItemPosition(itemid) {
    return _data.treeItemsPositions[itemid];
  }

  function getItemsPositions() {
    return _data.treeItemsPositions;
  }

  function getContentSize() {
    return _data.size;
  }

  return {
    process: process,
    getItemsPositions: getItemsPositions,
    getItemPosition: getItemPosition,
    getContentSize: getContentSize
  };
}

function KeyboardNavigationManager() {
  var /*
      Rectangles of the layout. Every rectangle has context property set to itemid.
    */
    _placements = [],
    /*
      This is sorted list of horizontal lines user may navigate along them and across with arrow keys between rectangles of the layout
      Every rectangle may belong to multiple rows, so rows selection is optimized to minimize their number
    */
    _rows,
    /*
      Tree levels structure is collection of colelctions. Its level contains sorted list of rectangles cross by individual row
    */
    _treeLevels,
    /*
      Current itemid and row. Every rectangle may belong to multiple rows, so this structure helps to stay within row during navigation. 
    */
    _cursor = null;

  function Cursor(itemid, row) {
    this.itemid = itemid;
    this.row = row;
  }

  function addRect(rect, itemid) {
    var newRect = new Rect(rect);
    newRect.context = itemid;

    _placements.push(newRect);
  }

  function prepair() {
    if (_treeLevels == null) {
      var levelIndex = 0;
      _rows = SortedList();
      getMinimumCrossingRows(this, _placements, function (row) {
        _rows.add(row, levelIndex);
        levelIndex += 1;
      });

      _treeLevels = TreeLevels();
      _placements.sort(function (a, b) {
        return a.horizontalCenter() - b.horizontalCenter();
      });
      for (var index = 0, len = _placements.length; index < len; index += 1) {
        var placement = _placements[index];
        _rows.loopForward(this, placement.y, function (row, levelIndex) {
          if (row > placement.bottom()) {
            return true;
          }
          _treeLevels.addItem(levelIndex, placement.context, placement);
        });
      }
    }
  }

  function getCursor(itemid) {
    prepair();

    if (_cursor == null || _cursor.itemid != itemid) {
      _cursor = new Cursor(itemid, _treeLevels.getLevelIndex(itemid));
    }

    return _cursor;
  }

  function getItemAbove(itemid) {
    _cursor = getCursor(itemid);

    moveCursorNextRow(false);

    return _cursor.itemid;
  }

  function getItemBelow(itemid) {
    _cursor = getCursor(itemid);

    moveCursorNextRow(true);

    return _cursor.itemid;
  }

  function moveCursorNextRow(isBelow) {
    var cursorItemRect = _treeLevels.getItemContext(_cursor.itemid);
    var cursorCenter = cursorItemRect.horizontalCenter();
    var previousCursorItem = _cursor.itemid;
    _treeLevels.loopLevelsFromItem(this, _cursor.itemid, isBelow, function (levelIndex) {
      _cursor.row = levelIndex;
      _cursor.itemid = _treeLevels.binarySearch(this, levelIndex, function (itemid, placement) {
        return cursorCenter - placement.horizontalCenter();
      });
      return true;
    });
    if (previousCursorItem == _cursor.itemid) {
      if (isBelow) {
        _cursor.row = _treeLevels.getEndLevelIndex(_cursor.itemid);
      } else {
        _cursor.row = _treeLevels.getLevelIndex(_cursor.itemid);
      }
    }
  }

  function getItemOnLeft(itemid) {
    _cursor = getCursor(itemid);

    var nextItem = _treeLevels.getPrevItem(_cursor.itemid, _cursor.row);
    if (nextItem != null) {
      _cursor.itemid = nextItem;
    }
    return _cursor.itemid;
  }

  function getItemOnRight(itemid) {
    _cursor = getCursor(itemid);

    var nextItem = _treeLevels.getNextItem(_cursor.itemid, _cursor.row);
    if (nextItem != null) {
      _cursor.itemid = nextItem;
    }
    return _cursor.itemid;
  }

  function getNavigationLevels() {
    prepair();

    var result = [];
    _treeLevels.loopLevels(this, function (levelIndex, level) {
      var levelItems = [];
      _treeLevels.loopLevelItems(this, levelIndex, function (itemid, item, position) {
        levelItems.push(itemid);
      });
      result.push(levelItems);
    });
    return result;
  }

  return {
    addRect: addRect,
    prepair: prepair,
    getItemAbove: getItemAbove,
    getItemBelow: getItemBelow,
    getItemOnLeft: getItemOnLeft,
    getItemOnRight: getItemOnRight,
    getNavigationLevels: getNavigationLevels
  };
}

function AlignDiagramTask(orientationOptionTask, itemsSizesOptionTask, visualTreeOptionTask, scaleOptionTask,
  currentControlSizeTask, activeItemsTask, itemsPositionsTask) {
  var _data = {
    treeItemsPositions: {}, // TreeItemPosition();
    panelSize: null // Rect();
  },
    _activeItems,
    _treeItemsPositions,
    _spatialIndex,
    _keyboardNavigationManager;

  function process() {
    var placeholderSize = new Size(itemsPositionsTask.getContentSize()),
      { optimalPanelSize } = currentControlSizeTask.getOptions(),
      { pageFitMode } = itemsSizesOptionTask.getOptions(),
      { orientationType } = orientationOptionTask.getOptions(),
      { horizontalAlignment } = visualTreeOptionTask.getOptions(),
      { scale } = scaleOptionTask.getOptions();
    
    _spatialIndex = null;
    _keyboardNavigationManager = null;
    _activeItems = activeItemsTask != null ? activeItemsTask.getActiveItems() : {};
    _treeItemsPositions = itemsPositionsTask.getItemsPositions();

    var panelSize = new Size(optimalPanelSize);

    switch (orientationType) {
      case OrientationType.Left:
      case OrientationType.Right:
        panelSize.invert();
        break;
    }

    panelSize.scale(1.0 / scale);

    // By default we translate everything forward
    _data.panelSize = panelSize;
    _data.treeItemsPositions = _treeItemsPositions;

    switch (pageFitMode) {
      case PageFitMode.AutoSize:
        _data.panelSize = new Size(placeholderSize);
        break;
      default:
        _data.panelSize = new Size(placeholderSize);
        if (placeholderSize.width < panelSize.width) {
          _data.treeItemsPositions = {};
          stretchToWidth(_data.treeItemsPositions, placeholderSize.width, panelSize.width, horizontalAlignment);
          _data.panelSize.width = panelSize.width;
        }
        if (placeholderSize.height < panelSize.height) {
          _data.panelSize.height = panelSize.height;
        }
        break;
    }

    switch (orientationType) {
      case OrientationType.Left:
      case OrientationType.Right:
        _data.panelSize.invert();
        break;
    }

    return true;
  }

  function stretchToWidth(treeItemsPositions, treeWidth, panelWidth, horizontalAlignment) {
    var offset;
    switch (horizontalAlignment) {
      case HorizontalAlignmentType.Left:
        offset = 0;
        break;
      case HorizontalAlignmentType.Right:
        offset = panelWidth - treeWidth;
        break;
      case HorizontalAlignmentType.Center:
        offset = (panelWidth - treeWidth) / 2.0;
        break;
    }
    translateItemPositions(treeItemsPositions, offset, 0);
  }

  function translateItemPositions(treeItemsPositions, offsetX, offsetY) {
    var treeItemId, treeItemPosition;
    for (treeItemId in _treeItemsPositions) {
      if (_treeItemsPositions.hasOwnProperty(treeItemId)) {
        treeItemPosition = new TreeItemPosition(_treeItemsPositions[treeItemId]);
        treeItemPosition.actualPosition.translate(offsetX, offsetY);
        treeItemsPositions[treeItemId] = treeItemPosition;
      }
    }
  }

  function getSizes() {
    var result = [];
    var hash = {};
    for (var itemid in _data.treeItemsPositions) {
      if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
        var treeItemPosition = _data.treeItemsPositions[itemid];
        switch (treeItemPosition.actualVisibility) {
          case Visibility.Normal:
          case Visibility.Dot://ignore jslint
          case Visibility.Line:
            var item = treeItemPosition.actualPosition;
            var size = Math.max(item.width, item.height);
            if (!hash.hasOwnProperty(size)) {
              hash[size] = true;
              result.push(size);
            }
        }
      }
    }
    return result;
  }

  function getSpatialIndex() {
    if (_spatialIndex == null) {
      _spatialIndex = SpatialIndex(getSizes());
      for (var itemid in _data.treeItemsPositions) {
        if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
          var treeItemPosition = _data.treeItemsPositions[itemid];
          if (_activeItems.hasOwnProperty(itemid)) {
            switch (treeItemPosition.actualVisibility) {
              case Visibility.Normal:
              case Visibility.Dot://ignore jslint
              case Visibility.Line:
                var rect = new Rect(treeItemPosition.actualPosition);
                rect.context = itemid;
                _spatialIndex.addRect(rect);
            }
          }
        }
      }
    }
    return _spatialIndex;
  }

  function getTreeItemForMousePosition(x, y, gravityRadius) {
    var result = null,
      bestDistance = null,
      spatialIndex = getSpatialIndex(),
      selection,
      center;

    selection = new Rect(x, y, 0, 0);
    center = new Point(x, y);
    selection.offset(gravityRadius, gravityRadius, gravityRadius, gravityRadius);

    spatialIndex.loopArea(this, selection, function (rect) {
      var itemid = rect.context;
      if (rect.contains(x, y)) {
        result = itemid;
        return true;
      }
      var treeItemPosition = _data.treeItemsPositions[itemid];
      switch (treeItemPosition.actualVisibility) {
        case Visibility.Dot://ignore jslint
        case Visibility.Line:
          var distance = center.distanceTo(rect.horizontalCenter(), rect.verticalCenter());
          if (bestDistance == null || distance < bestDistance) {
            bestDistance = distance;
            result = itemid;
          }
      }
    });

    return result;
  }

  function getKeyboardNavigationManager() {
    if (_keyboardNavigationManager == null) {
      _keyboardNavigationManager = KeyboardNavigationManager();
      for (var itemid in _data.treeItemsPositions) {
        if (_data.treeItemsPositions.hasOwnProperty(itemid)) {
          var treeItemPosition = _data.treeItemsPositions[itemid];
          if (_activeItems.hasOwnProperty(itemid)) {
            switch (treeItemPosition.actualVisibility) {
              case Visibility.Normal:
                var rect = new Rect(treeItemPosition.actualPosition);
                _keyboardNavigationManager.addRect(rect, itemid);
            }
          }
        }
      }
    }
    return _keyboardNavigationManager;
  }

  function getNextItem(cursorItem, direction) {
    var manager = getKeyboardNavigationManager(),
      result;

    switch (direction) {
      case OrientationType.Top:
        result = manager.getItemAbove(cursorItem);
        break;
      case OrientationType.Bottom:
        result = manager.getItemBelow(cursorItem);
        break;
      case OrientationType.Left:
        result = manager.getItemOnLeft(cursorItem);
        break;
      case OrientationType.Right:
        result = manager.getItemOnRight(cursorItem);
        break;
    }

    return result;
  }

  function getItemPosition(itemid) {
    return _data.treeItemsPositions[itemid];
  }

  function getItemsPositions() {
    return _data.treeItemsPositions;
  }

  function getContentSize() {
    return _data.panelSize;
  }

  return {
    process: process,
    getItemPosition: getItemPosition,
    getItemsPositions: getItemsPositions,
    getContentSize: getContentSize,

    getTreeItemForMousePosition: getTreeItemForMousePosition,
    getNextItem: getNextItem
  };
}

function Transform() {
  this.invertArea = false;
  this.invertHorizontally = false;
  this.invertVertically = false;

  this.size = null;
}
Transform.prototype.setOrientation = function (orientationType) {
  switch (orientationType) {
    case OrientationType.Top:
      this.invertArea = false;
      this.invertHorizontally = false;
      this.invertVertically = false;
      break;
    case OrientationType.Bottom:
      this.invertArea = false;
      this.invertHorizontally = false;
      this.invertVertically = true;
      break;
    case OrientationType.Left:
      this.invertArea = true;
      this.invertHorizontally = false;
      this.invertVertically = false;
      break;
    case OrientationType.Right:
      this.invertArea = true;
      this.invertHorizontally = true;
      this.invertVertically = false;
      break;
  }
};

Transform.prototype.getOrientation = function (orientationType) {
  var result = orientationType;
  if (this.invertHorizontally) {
    switch (orientationType) {
      case OrientationType.Left:
        result = OrientationType.Right;
        break;
      case OrientationType.Right:
        result = OrientationType.Left;
        break;
    }
  }

  if (this.invertVertically) {
    switch (orientationType) {
      case OrientationType.Top:
        result = OrientationType.Bottom;
        break;
      case OrientationType.Bottom:
        result = OrientationType.Top;
        break;
    }
  }


  if (this.invertArea) {
    switch (result) {
      case OrientationType.Top:
        result = OrientationType.Left;
        break;
      case OrientationType.Bottom:
        result = OrientationType.Right;
        break;
      case OrientationType.Left:
        result = OrientationType.Top;
        break;
      case OrientationType.Right:
        result = OrientationType.Bottom;
        break;
    }
  }

  return result;
};

Transform.prototype.transformPoint = function (x, y, forward, self, func) {
  var value;

  if (forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
    }
  }

  if (this.invertHorizontally) {
    x = this.size.width - x;
  }
  if (this.invertVertically) {
    y = this.size.height - y;
  }

  if (!forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
    }
  }

  func.call(self, x, y);
};

Transform.prototype.transformPoints = function (x, y, x2, y2, forward, self, func) {
  var value;

  if (forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
      value = x2;
      x2 = y2;
      y2 = value;
    }
  }

  if (this.invertHorizontally) {
    x = this.size.width - x;
    x2 = this.size.width - x2;
  }

  if (this.invertVertically) {
    y = this.size.height - y;
    y2 = this.size.height - y2;
  }

  if (!forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
      value = x2;
      x2 = y2;
      y2 = value;
    }
  }

  func.call(self, x, y, x2, y2);
};

Transform.prototype.transform3Points = function (x, y, x2, y2, x3, y3, forward, self, func) {
  var value;

  if (forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
      value = x2;
      x2 = y2;
      y2 = value;
      value = x3;
      x3 = y3;
      y3 = value;
    }
  }

  if (this.invertHorizontally) {
    x = this.size.width - x;
    x2 = this.size.width - x2;
    x3 = this.size.width - x3;
  }
  if (this.invertVertically) {
    y = this.size.height - y;
    y2 = this.size.height - y2;
    y3 = this.size.height - y3;
  }

  if (!forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
      value = x2;
      x2 = y2;
      y2 = value;
      value = x3;
      x3 = y3;
      y3 = value;
    }
  }

  func.call(self, x, y, x2, y2, x3, y3);
};

Transform.prototype.transformRect = function (x, y, width, height, forward, self, func) {
  var value;

  if (forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
      value = width;
      width = height;
      height = value;
    }
  }

  if (this.invertHorizontally) {
    x = this.size.width - x - width;
  }
  if (this.invertVertically) {
    y = this.size.height - y - height;
  }

  if (!forward) {
    if (this.invertArea) {
      value = x;
      x = y;
      y = value;
      value = width;
      width = height;
      height = value;
    }
  }

  func.call(self, x, y, width, height);
};

Transform.prototype.transformThickness = function (thickness, forward) {
  var value,
    {left, right, top, bottom } = thickness;

  if (forward) {
    if (this.invertArea) {
      value = left;
      left = top;
      top = value;
      value = right;
      right = bottom;
      bottom = value;
    }
  }

  if (this.invertHorizontally) {
    value = left;
    left = right;
    right = value;
  }
  if (this.invertVertically) {
    value = top;
    top = bottom;
    bottom = value;
  }

  if (!forward) {
    if (this.invertArea) {
      value = left;
      left = top;
      top = value;
      value = right;
      right = bottom;
      bottom = value;
    }
  }

  return new Thickness(left, top, right, bottom);
};

function CreateTransformTask(orientationOptionTask, scaleOptionTask, alignDiagramTask) {
  var _data = {
    transform: null
  };

  function process() {
    var orientationOptions = orientationOptionTask.getOptions();

    var panelSize = new Size(alignDiagramTask.getContentSize());

    _data.transform = new Transform();
    _data.transform.setOrientation(orientationOptions.orientationType);
    _data.transform.size = new Size(panelSize);

    return true;
  }

  function getTreeItemForMousePosition(x, y, gravityRadius) {
    var result = null,
    { scale } = scaleOptionTask.getOptions();
    
    x = x / scale;
    y = y / scale;

    _data.transform.transformPoint(x, y, false, this, function (x, y) {
      result = alignDiagramTask.getTreeItemForMousePosition(x, y, gravityRadius);
    });
    return result;
  }

  function getTransform() {
    return _data.transform;
  }

  return {
    process: process,
    getTransform: getTransform,
    getTreeItemForMousePosition: getTreeItemForMousePosition,
    description: "Create coordinate system transformation object."
  };
}

function PaletteManager(options, linesPalette) {
  this.palette = [];
  this.cursor = 0;

  var index, len;

  /* pallete based connectors */
  if (linesPalette.length === 0) {
    /* draw all extra as regular */
    this.palette = [new PaletteItem({
      lineColor: options.linesColor,
      lineWidth: options.linesWidth,
      lineType: options.linesType
    })];
    this.paletteLength = this.palette.length;

    this.regularIndex = 0;
  } else {
    for (index = 0, len = linesPalette.length; index < len; index += 1) {
      this.palette.push(new PaletteItem(linesPalette[index]));
    }
    this.paletteLength = this.palette.length;

    /* regular */
    this.palette.push(new PaletteItem({
      lineColor: options.linesColor,
      lineWidth: options.linesWidth,
      lineType: options.linesType
    }));
    this.regularIndex = this.palette.length - 1;
  }

  /* highlight */
  this.palette.push(new PaletteItem({
    lineColor: options.highlightLinesColor,
    lineWidth: options.highlightLinesWidth,
    lineType: options.highlightLinesType
  }));
  this.highlightIndex = this.palette.length - 1;
}
PaletteManager.prototype.selectPalette = function (index) {
  this.cursor = index % this.paletteLength;
};

PaletteManager.prototype.getPalette = function (connectorStyleType) {
  var index = null;
  switch (connectorStyleType) {
    case ConnectorStyleType.Regular:
      index = this.regularIndex;
      break;
    case ConnectorStyleType.Highlight:
      index = this.highlightIndex;
      break;
    case ConnectorStyleType.Extra:
      index = this.cursor;
      break;
  }
  return this.palette[index];
};

function PaletteManagerTask(connectorsOptionTask, linePaletteOptionTask) {
  var _paletteManager;

  function process() {
    var linesPalette = [];
    if (linePaletteOptionTask != null) {
      linesPalette = linePaletteOptionTask.getOptions().linesPalette;
    }
    _paletteManager = new PaletteManager(connectorsOptionTask.getOptions(), linesPalette);

    return true;
  }

  function getPaletteManager() {
    return _paletteManager;
  }

  return {
    process: process,
    getPaletteManager: getPaletteManager
  };
}

function ApplyLayoutChangesTask(getGraphics, setLayout, itemsSizesOptionTask,
  currentControlSizeTask, scaleOptionTask, alignDiagramTask, frameSizeTask, levelTitleSizeTask) {
  var _data = {
    viewportSize: null,
    frameThickness: null,
    framePlaceholderSize: null
  };

  function process() {
    var graphics = getGraphics(),
      { scale } = scaleOptionTask.getOptions(),
      { pageFitMode, autoSizeMinimum, autoSizeMaximum } = itemsSizesOptionTask.getOptions(),
      placeholderSize = alignDiagramTask.getContentSize(),
      { scrollPanelSize, hasFrame, hasLevelTitles } = currentControlSizeTask.getOptions(),
      viewportSize = new Size(scrollPanelSize),
      frameThickness = frameSizeTask.getThickness(),
      titlesThickness = new Thickness(levelTitleSizeTask.getOptions().thickness),
      autoSize = (pageFitMode == PageFitMode.AutoSize);

    /* scaled content size */
    var mousePanelSize = new Size(placeholderSize);
    mousePanelSize.scale(scale);

    if (autoSize) {
      /* resize element to fit placeholder if control is in auto size mode
        25 it is reservation for scrollbars 
        minimum & maximum auto size regulate maximum and minimum diagram size
        it is handy when it is needed to limit oversized diagram expansion
        or diagram is empty or so tiny that it is not clear that it exists at all
      */
      viewportSize = new Size(mousePanelSize.width + 25, mousePanelSize.height + 25);
      viewportSize.addThickness(frameThickness);
      if(titlesThickness.isPositive()) {
        viewportSize.addThickness(titlesThickness);
      }
      viewportSize.cropBySize(autoSizeMaximum);
      viewportSize.maxSize(autoSizeMinimum);//ignore jslint

      // disable frame if its square space is bigger than viewport
      var framedViewportSize = new Size(viewportSize);
      framedViewportSize.removeThickness(frameThickness);
      if(titlesThickness.isPositive()) {
        framedViewportSize.removeThickness(titlesThickness);
      }
      if(viewportSize.space() < framedViewportSize.space() * 2) {
        viewportSize = framedViewportSize;
      } else {
        frameThickness = new Thickness( 0, 0, 0, 0 );
        titlesThickness = new Thickness( 0, 0, 0, 0 );
      }
    } else {
      if(!hasFrame) {
        frameThickness = new Thickness( 0, 0, 0, 0 );
      }
      if(!hasLevelTitles && titlesThickness.isPositive()) {
        titlesThickness = new Thickness( 0, 0, 0, 0 );
      }
    }

    // Control Size
    var decorThickness = new Thickness(frameThickness);
    if(titlesThickness.isPositive()) {
      decorThickness.addThickness(titlesThickness);
    }
    var controlSize = new Size(viewportSize);
    controlSize.addThickness(decorThickness);

    // Scroll panel placement
    var scrollPanelRect = new Rect(decorThickness.left, decorThickness.top, viewportSize.width, viewportSize.height);

    /* frame */
    var framePlaceholderSize = new Size(controlSize);
    var frameMousePanelRect = new Rect(0, 0, framePlaceholderSize.width, framePlaceholderSize.height);
    framePlaceholderSize.scale(1 / scale);

    /* level titles */
    var firstPoint = new Point(0, 0), 
      secondPoint = new Point(0, 0);
    if(titlesThickness.left != 0) {
      firstPoint = new Point(scrollPanelRect.x, scrollPanelRect.y);
      secondPoint = new Point(scrollPanelRect.x - titlesThickness.left, scrollPanelRect.bottom());
    } else if(titlesThickness.right != 0) {
      firstPoint = new Point(scrollPanelRect.right(), scrollPanelRect.y);
      secondPoint = new Point(scrollPanelRect.right() + titlesThickness.right, scrollPanelRect.bottom());
    } else if(titlesThickness.top != 0) {
      firstPoint = new Point(scrollPanelRect.x, scrollPanelRect.y);
      secondPoint = new Point(scrollPanelRect.right(), scrollPanelRect.y - titlesThickness.top);
    } else if(titlesThickness.bottom != 0) {
      firstPoint = new Point(scrollPanelRect.x, scrollPanelRect.bottom());
      secondPoint = new Point(scrollPanelRect.right(), scrollPanelRect.bottom() + titlesThickness.bottom);
    }
    var titlesMousePanelRect = new Rect(firstPoint, secondPoint);
    var titlesPlaceholderSize = new Size(titlesMousePanelRect);
    titlesPlaceholderSize.scale(1 / scale);
    
    graphics.resize("frameplaceholder", framePlaceholderSize.width, framePlaceholderSize.height );
    graphics.resize("titlesplaceholder", titlesPlaceholderSize.width, titlesPlaceholderSize.height );
    graphics.resize("bp-placeholder", placeholderSize.width, placeholderSize.height);

    setLayout({
      autoSize: autoSize, // resize control if true
      controlSize: controlSize, // Sets control Size in auto scale mode
      scale: scale, // scale is needed for scale transform CSS creation

      frameMousePanelRect: frameMousePanelRect,
      framePlaceholderSize: framePlaceholderSize, // the frame content size before CSS Scale Transform applied

      titlesMousePanelRect: titlesMousePanelRect,
      titlesPlaceholderSize: titlesPlaceholderSize, // Titles size before CSS Scale Transform applied

      scrollPanelRect: scrollPanelRect,
      mousePanelSize: mousePanelSize, // Content mouse panel size
      placeholderSize: placeholderSize // Content size before CSS Scale Transform applied

    });

    
    _data.viewportSize = viewportSize;
    _data.frameThickness = frameThickness;
    _data.frameOffset = titlesThickness.isPositive() ? titlesThickness : new Thickness( 0, 0, 0, 0 );
    _data.titlesThickness = titlesThickness;
    _data.framePlaceholderSize = framePlaceholderSize;
    return true;
  }

  function getOptimalPanelSize() {
    return new Size(_data.viewportSize.width - 25, _data.viewportSize.height - 25);
  }

  function getScrollPanelSize() {
    return new Size(_data.viewportSize.width, _data.viewportSize.height);
  }

  function getFrameThickness() {
    return new Thickness(_data.frameThickness);
  }

  function getFrameOffset() {
    return new Thickness(_data.frameOffset);
  }

  function getTitlesThickness() {
    return new Thickness(_data.titlesThickness);
  }

  return {
    process: process,
    getOptimalPanelSize: getOptimalPanelSize,
    getScrollPanelSize: getScrollPanelSize,
    getFrameThickness: getFrameThickness,
    getFrameOffset: getFrameOffset,
    getTitlesThickness: getTitlesThickness
  };
}

/*
  This method should try to keep cursor item as close as possible to its previous position
*/
function CenterOnCursorTask(layoutOptionsTask, applyLayoutChangesTask, currentScrollPositionTask, cursorItemTask, alignDiagramTask, createTransformTask, scaleOptionTask) {
  var _data = {
    placeholderOffset: null
  },
    _transform;

  function process() {
    var snapRect,
      layoutOptions = layoutOptionsTask.getOptions(),
      cursorTreeItemId = cursorItemTask.getCursorTreeItem(),
      treeItemPosition = alignDiagramTask.getItemPosition(cursorTreeItemId),
      contentSize = new Size(alignDiagramTask.getContentSize()),
      scrollPanelSize,
      scaleOptions = scaleOptionTask.getOptions(),
      scale = scaleOptions.scale;

    _data.placeholderOffset = currentScrollPositionTask.getPlaceholderOffset();

    if (layoutOptions.forceCenterOnCursor) {
      _transform = createTransformTask.getTransform();
      if (treeItemPosition != null) {
        snapRect = getTransformedItemPosition(treeItemPosition.actualPosition);
        snapRect.scale(scale);
        contentSize.scale(scale);
        scrollPanelSize = applyLayoutChangesTask.getScrollPanelSize();
        _data.placeholderOffset = new Point(
          Math.max(Math.min(snapRect.horizontalCenter() - scrollPanelSize.width / 2, contentSize.width - scrollPanelSize.width), 0),
          Math.max(Math.min(snapRect.verticalCenter() - scrollPanelSize.height / 2, contentSize.height - scrollPanelSize.height), 0)
        );
      }
    }


    return true;
  }

  function getTransformedItemPosition(position) {
    var result = false;

    _transform.transformRect(position.x, position.y, position.width, position.height, true,
      this, function (x, y, width, height) {
        result = new Rect(x, y, width, height);
      }
    );
    return result;
  }

  function getPlaceholderOffset() {
    return _data.placeholderOffset;
  }

  return {
    process: process,
    getPlaceholderOffset: getPlaceholderOffset
  };
}

function ProjectItemsToFrameTask(createTransformTask, frameSizeTask,
  applyLayoutChangesTask, scaleOptionTask,
  alignDiagramTask, centerOnCursorTask,
  itemTemplateParamsTask,
  selectedItemsTask) {

  var _data = {
    positions: {}
  },
  _scaleOptions,
  _spatialIndex;

  function process() {
    var positions = alignDiagramTask.getItemsPositions(),
      transform = createTransformTask.getTransform();

    _scaleOptions = scaleOptionTask.getOptions(),
    _spatialIndex = null;
    _data.positions = [];

    var medianPosition = getFrameMedianPosition(),
      selectedItems = selectedItemsTask.getItems();

    if(medianPosition != null) {
      for(var index = 0, len = selectedItems.length; index < len; index+=1) {
        var treeItemId = selectedItems[index],
          treeItemPosition = positions[treeItemId],
          actualPosition = treeItemPosition.actualPosition;

        transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
          this, function (x, y, width, height) {
            var nodePosition = new Rect(x, y, width, height);
            if (!medianPosition.rect.overlaps(nodePosition)) {
              var projectionPoint = medianPosition.rect.getProjectionPoint(nodePosition.centerPoint());
              if (projectionPoint != null) {
                // node position is not scaled, scaling is done with CSS
                var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
                    templateConfig = templateParams.template.templateConfig,
                    markerSize = new Size(templateConfig.minimizedItemSize),
                    markerProjectionRect = new Rect(
                      projectionPoint.x - markerSize.width / 2, 
                      projectionPoint.y - markerSize.height / 2, 
                      markerSize.width, 
                      markerSize.height);
  
                markerProjectionRect.translate(- medianPosition.offset.x, - medianPosition.offset.y);
                _data.positions[treeItemId] = markerProjectionRect;
              }
            }
          });
      }
    }
    return true;
  }

  function getFrameMedianPosition() {
    var result = null;
    if (centerOnCursorTask != null) {
      var scale = _scaleOptions.scale,
        placeholderOffset = new Point(centerOnCursorTask.getPlaceholderOffset()),
        scrollPanelSize = new Size(applyLayoutChangesTask.getScrollPanelSize()),
        frameThickness = new Thickness(applyLayoutChangesTask.getFrameThickness()),
        frameBaseOffset = new Thickness(applyLayoutChangesTask.getFrameOffset()),
        medianThickness = new Thickness(frameSizeTask.getMedian());

      if(!frameThickness.isEmpty()) {
        placeholderOffset.scale(1.0 / scale);
        frameThickness.scale(1.0 / scale);
        frameBaseOffset.scale(1.0 / scale);
        scrollPanelSize.scale(1.0 / scale);
        medianThickness.scale(1.0 / scale);

        var frameOffset = new Point(placeholderOffset.x - frameBaseOffset.left - frameThickness.left, placeholderOffset.y - frameBaseOffset.top - frameThickness.top);

        var medianRect = new Rect(placeholderOffset.x, placeholderOffset.y, scrollPanelSize.width, scrollPanelSize.height);
        medianRect.offset(frameBaseOffset);
        medianRect.offset(medianThickness);

        result = {
          offset: frameOffset,
          rect: medianRect         
        };
      }
    }
    return result;
  }

  function getSizes() {
    var result = [];
    var hash = {};
    for (var treeItemId in _data.positions) {
      if(_data.positions.hasOwnProperty(treeItemId)) {
        var rect = _data.positions[treeItemId];
        var size = Math.max(rect.width, rect.height);
        if (!hash.hasOwnProperty(size)) {
          hash[size] = true;
          result.push(size);
        }
      }
    }
    return result;
  }

  function getSpatialIndex() {
    if (_spatialIndex == null) {
      _spatialIndex = SpatialIndex(getSizes());
      for (var treeItemId in _data.positions) {
        if(_data.positions.hasOwnProperty(treeItemId)) {
          var rect = _data.positions[treeItemId];
          rect.context = treeItemId;
          _spatialIndex.addRect(rect);
        }
      }
    }
    return _spatialIndex;
  }

  function getTreeItemForMousePosition(x, y, gravityRadius) {
    var result = null,
      bestDistance = null,
      scale = _scaleOptions.scale,
      spatialIndex = getSpatialIndex(),
      selection,
      center;

    x = x / scale;
    y = y / scale;
    selection = new Rect(x, y, 0, 0);
    center = new Point(x, y);
    selection.offset(gravityRadius, gravityRadius, gravityRadius, gravityRadius);

    spatialIndex.loopArea(this, selection, function (rect) {
      var itemid = rect.context;
      var distance = center.distanceTo(rect.horizontalCenter(), rect.verticalCenter());
      if (bestDistance == null || distance < bestDistance) {
        bestDistance = distance;
        result = itemid;
      }
    });

    return result;
  }

  function getPositions() {
    return _data.positions;
  }

  return {
    getPositions:getPositions,
    getTreeItemForMousePosition: getTreeItemForMousePosition,
    process: process
  };
}

function ViewPortPlacementTask(scaleOptionTask, centerOnCursorTask, createTransformTask, applyLayoutChangesTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    viewPortPosition: new ObjectReader({
      x: new ValueReader(["number"], false, 0),
      y: new ValueReader(["number"], false, 0),
      width: new ValueReader(["number"], false, 0),
      height: new ValueReader(["number"], false, 0)
    }, false, new Rect(0, 0, 0, 0))
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, getTransformedPosition(), "options", context);

    return context.isChanged;
  }

  function getTransformedPosition() {
    var viewPortPosition,
      transform = createTransformTask.getTransform(),
      position = getPosition();
    if(position != null ) {
      transform.transformRect(position.x, position.y, position.width, position.height, false,
        this, function (x, y, width, height) { 
          viewPortPosition = new Rect(x, y, width, height);
        });
    }
    return { viewPortPosition: viewPortPosition };
  }

  function getPosition() {
    var scaleOptions = scaleOptionTask.getOptions(),
      scale = scaleOptions.scale,
      placeholderOffset = centerOnCursorTask ? new Point(centerOnCursorTask.getPlaceholderOffset()) : new Point(0, 0),
      optimalPanelSize = new Size(applyLayoutChangesTask.getOptimalPanelSize());

    placeholderOffset.scale(1.0 / scale);
    optimalPanelSize.scale(1.0 / scale);

    var result = new Rect(
      placeholderOffset.x,
      placeholderOffset.y,
      optimalPanelSize.width,
      optimalPanelSize.height
    );
    return result;
  }

  function getViewPortPosition() {
    return _data.viewPortPosition;
  }

  return {
    process: process,
    getViewPortPosition: getViewPortPosition
  };
}

function VerticalOffsetTask(viewPortPlacementTask) {
  var _data = {},
    _hash = {};

  var _dataTemplate = new ObjectReader({
    verticalOffset: new ObjectReader({
      from: new ValueReader(["number"], false, 0),
      to: new ValueReader(["number"], false, 0)
    }, false, new Interval(0, 0))
  });

  function process() {
    var context = {
      isChanged: false,
      hash: _hash
    };

    _data = _dataTemplate.read(_data, getOffset(), "options", context);

    return context.isChanged;
  }

  function getOffset() {
    var viewPortPosition = new Rect(viewPortPlacementTask.getViewPortPosition());
    return { verticalOffset: viewPortPosition.verticalInterval() };
  }

  function getVerticalOffset() {
    return _data.verticalOffset;
  }

  return {
    process: process,
    getVerticalOffset: getVerticalOffset
  };
}

function OrgLogicalLevelsPlacementTask(orgTreeTask, visualTreeTask, alignDiagramTask) {
  var _data = {
    positions: []
  };

  function process() {
    _data.positions = null;
    return true;
  }

  function createPositions() {
    var intervals = [],
      orgTree = orgTreeTask.getOrgTree(),
      itemsPositions = alignDiagramTask.getItemsPositions(),
      branchAligner = visualTreeTask.getBranchAligner(),
      visited = {};

    orgTree.loopLevels(this, function(nodeId, node, levelIndex) {
      if(node.itemType == ItemType.Regular) {
        if(node.isVisible) {
          var itemPosition = itemsPositions[nodeId];
          if(itemPosition) {
            var levelOffset = node.levelOffset;
            if(levelOffset === null) {
              levelOffset = branchAligner.getGroupSize(node.parent, GroupType.RowChildren);
            }
            var interval = new Interval(itemPosition.topConnectorShift, itemPosition.bottomConnectorShift - 1, levelIndex + levelOffset);
            var key = interval.toString();
            if(!visited[key]) {
              visited[key] = true;
              intervals.push(interval);
            }
          }
        }
        return;
      }
      return orgTree.SKIP;
    });

    var mergedIntervals = [];
    getMergedIntervals(this, intervals, function(interval) {
      mergedIntervals.push(interval);
    });
    intervals = mergedIntervals;

    /* merge intervals having equal logical levels */
    mergedIntervals = [];
    var currentInterval = null;
    for(var index = 0, len = intervals.length; index < len; index+=1) {
      var interval = intervals[index];
      if(!currentInterval) {
        currentInterval = interval;
        mergedIntervals.push(interval);
      } else {
        if(currentInterval.context === interval.context) {
          currentInterval.to = interval.to;
        } else {
          currentInterval = interval;
          mergedIntervals.push(interval);
        }
      }
    }
    intervals = mergedIntervals;

    /* extend first level to the top */
    if(intervals.length > 0) {
      intervals[0].from = 0;
    }

    /* fill gaps between levels */
    for(var index = 0, len = intervals.length - 1; index < len; index+=1) {
      var prev = intervals[index];
      var next = intervals[index + 1];

      prev.to = next.from;
    }

    /* find minimal level */
    var minLevelIndex = null;
    for(var index = 0, len = intervals.length; index < len; index+=1) {
      var interval = intervals[index];
      minLevelIndex = (minLevelIndex === null) ? interval.context : Math.min(minLevelIndex, interval.context);
    }

    /* group intervals by logical levels */ 
    var result = {};
    for(var index = 0, len = intervals.length; index < len; index+=1) {
      var interval = intervals[index];
      var levelIndex = interval.context - minLevelIndex;
      var logicalLevelPosition = result[levelIndex];
      if(!logicalLevelPosition) {
        result[levelIndex] = [interval];
      } else {
        logicalLevelPosition.push(interval);
      }
    }
    return result;
  }


  function getPositions() {
    if(!_data.positions) {
      _data.positions = createPositions();
    }
    return _data.positions;
  }

  return {
    getPositions:getPositions,
    process: process
  };
}

function MergeLevelIntervalsTask(levelAnnotationOptionTask, logicalLevelsPlacementTask) {
  var _data = {
    positions: []
  };

  function process() {
    var annotations = levelAnnotationOptionTask.getAnnotations();

    _data.positions = [];
    
    if(annotations.length > 0) {
      var positions = logicalLevelsPlacementTask.getPositions();
      _data.positions = createPositions(annotations, positions);
    }

    return true;
  }

  function createPositions(annotations, positions) {
    var index, len,
      index2, len2,
      used = {},
      result = {};

    for (index = 0, len = annotations.length; index < len; index += 1) {
      var annotationConfig = annotations[index];
      var levels = annotationConfig.levels;
      var intervals = [];
      if (levels != null && levels.length > 0) {
        for (index2 = 0, len2 = levels.length; index2 < len2; index2 += 1) {
          var level = levels[index2];
          if(!used[level]) {
            used[level] = true;

            var intervals = [];
            if (positions[level] != null) {
              intervals = intervals.concat(positions[level]);
            }
          }
        }
      }
      result[index] = [];
      getMergedIntervals(this, intervals, function(interval) {
        result[index].push(interval);
      });
    }

    return result;
  }


  function getPositions() {
    return _data.positions;
  }

  return {
    getPositions:getPositions,
    process: process
  };
}

function BaseShape() {

}

BaseShape.prototype._getLabelPosition = function (x, y, width, height, labelWidth, labelHeight, labelOffset, labelPlacement) {
  var result = null;
  switch (labelPlacement) {
    case PlacementType.Top:
      result = new Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.TopRight:
      result = new Rect(x + width - labelWidth, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.TopLeft:
      result = new Rect(x, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.Right:
      result = new Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case PlacementType.RightTop:
      result = new Rect(x + width + labelOffset, y, labelWidth, labelHeight);
      break;
    case PlacementType.RightBottom:
      result = new Rect(x + width + labelOffset, y + height - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.BottomRight:
      result = new Rect(x + width - labelWidth, y + height + labelOffset, labelWidth, labelHeight);
      break;
    case PlacementType.BottomLeft:
      result = new Rect(x, y + height + labelOffset, labelWidth, labelHeight);
      break;
    case PlacementType.Left:
      result = new Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case PlacementType.LeftTop:
      result = new Rect(x - labelWidth - labelOffset, y, labelWidth, labelHeight);
      break;
    case PlacementType.LeftBottom:
      result = new Rect(x - labelWidth - labelOffset, y + height - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.Auto: //ignore jslint
    case PlacementType.Bottom: //ignore jslint
    default: //ignore jslint
      result = new Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
      break;
  }
  return result;
};

BaseShape.prototype._betweenPoint = function (first, second) {
  return new Point((first.x + second.x) / 2, (first.y + second.y) / 2);
};

BaseShape.prototype._offsetPoint = function (first, second, offset) {
  var result = null,
    distance = first.distanceTo(second);

  if (distance === 0 || offset === 0) {
    result = new Point(first);
  } else {
    result = new Point(first.x + (second.x - first.x) / distance * offset, first.y + (second.y - first.y) / distance * offset);
  }
  return result;
};

function MergedRectangles(graphics) {
  this.graphics = graphics;
  this.transform = null;

  this.lineWidth = 1;
  this.opacity = 1;
  this.fillColor = null;
  this.lineType = LineType.Solid;
  this.borderColor = null;
}
MergedRectangles.prototype = new BaseShape();

MergedRectangles.prototype.draw = function (rects) {
  var paletteItem = new PaletteItem({
    lineColor: this.borderColor,
    lineWidth: this.lineWidth,
    fillColor: this.fillColor,
    lineType: this.lineType,
    opacity: this.opacity
  }),
    polyline = new Polyline(paletteItem);

  getMergedRectangles(this, rects, function (points) {
    for (var index = 0, len = points.length; index < len; index += 1) {
      var point = points[index];
      if (index == 0) {
        polyline.addSegment(new MoveSegment(point.x, point.y));
      } else {
        polyline.addSegment(new LineSegment(point.x, point.y));
      }
    }
  });

  polyline.transform(this.transform, true);

  this.graphics.polyline(polyline);
};

function DrawBackgroundAnnotationTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  backgroundAnnotationOptionTask, navigationFamilyTask, alignDiagramTask) {
  var _graphics,
    _positions,
    _transform;

  function process() {
    var annotations = backgroundAnnotationOptionTask.getAnnotations(),
      navigationFamily;

    _graphics = getGraphics();
    _graphics.reset("bp-placeholder", Layers.BackgroundAnnotation);

    if (annotations.length > 0) {
      _positions = alignDiagramTask.getItemsPositions();
      _transform = createTransformTask.getTransform();

      navigationFamily = navigationFamilyTask.getLogicalFamily();

      drawAnnotations(annotations, _positions, navigationFamily);
    }

    return false;
  }

  function drawAnnotations(annotations, positions, navigationFamily) {
    var index, len,
      index2, len2,
      index3, len3,
      shape,
      defaultConfig,
      rects, rect,
      itemsHash, item,
      properties, property,
      annotationConfig, treeItemPosition;

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotationConfig = annotations[index];

      if (annotationConfig.items != null && annotationConfig.items.length > 0) {
        shape = new MergedRectangles(_graphics);
        shape.transform = _transform;
        defaultConfig = new BackgroundAnnotationConfig();
        properties = ["opacity", "lineWidth", "borderColor", "fillColor", "lineType"];
        for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
          property = properties[index3];
          shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
        }
        _graphics.activate("bp-placeholder", Layers.BackgroundAnnotation);

        rects = [];
        itemsHash = {};
        for (index2 = 0, len2 = annotationConfig.items.length; index2 < len2; index2 += 1) {
          item = annotationConfig.items[index2];
          treeItemPosition = alignDiagramTask.getItemPosition(item);
          if (treeItemPosition != null) {
            itemsHash[item] = true;
            rect = new Rect(treeItemPosition.actualPosition);
            rect.offset(annotationConfig.offset);
            rects.push(rect);

            if (annotationConfig.includeChildren) {
              navigationFamily.loopChildren(this, item, function (childItemId, childItem) {
                if (!itemsHash[childItemId]) {
                  itemsHash[childItemId] = true;
                  treeItemPosition = alignDiagramTask.getItemPosition(childItemId);
                  if (treeItemPosition != null) {
                    rect = new Rect(treeItemPosition.actualPosition);
                    rect.offset(annotationConfig.offset);
                    rects.push(rect);
                  }
                }
              }); //ignore jslint
            }
          }
        }
        shape.draw(rects);
      }
    }
  }

  return {
    process: process
  };
}

function PolylinesBuffer() {
  var polylines = {};

  function _getPolyline(polylines, paletteItem) {
    if (!polylines[paletteItem.toString()]) {
      polylines[paletteItem.toString()] = new Polyline(paletteItem);
    }
    return polylines[paletteItem.toString()];
  }

  function getPolyline(paletteItem) {
    return _getPolyline(polylines, paletteItem);
  }

  function loop(thisArg, onItem) {
    var key,
      polyline;
    if (onItem != null) {
      for (key in polylines) {
        if (polylines.hasOwnProperty(key)) {
          polyline = polylines[key];
          if (polyline) {
            polyline.optimizeMoveSegments();

            if (onItem.call(thisArg, polyline)) {
              break;
            }
          }
        }
      }
    }
  }

  function addInverted(callbackFun, copyOnly) {
    var backupPolylines, backupPolyline;

    /* backup polylines */
    backupPolylines = polylines;
    polylines = {};

    if (callbackFun != null) {
      callbackFun(this);
    }

    /* add inverted polylines to backup collection */
    loop(this, function (polyline) {
      backupPolyline = _getPolyline(backupPolylines, polyline.paletteItem);

      if (!copyOnly) {
        backupPolyline.addInverted(polyline);
      } else {
        polyline.mergeTo(backupPolyline);
      }
    });

    /* restore polylines */
    polylines = backupPolylines;
  }

  function transform(transformArg, forward) {
    loop(this, function (polyline) {
      polyline.transform(transformArg, forward);
    });
  }

  return {
    getPolyline: getPolyline,
    loop: loop,
    addInverted: addInverted,
    transform: transform
  };
}

function DrawHighlightPathAnnotationTask(getGraphics, connectorsOptionTask, highlightPathAnnotationOptionTask, connectionsGraphTask, zOrderType) {
  function process() {
    var graph = connectionsGraphTask.getGraph(),
      highlightOptions = connectorsOptionTask.getOptions(),
      annotations = highlightPathAnnotationOptionTask.getAnnotations(),
      graphics = getGraphics();

    switch (zOrderType) {
      case ZOrderType.Background://ignore jslint
        graphics.reset("bp-placeholder", Layers.BackgroundHighlightPathAnnotations);
        break;
      case ZOrderType.Foreground://ignore jslint
        graphics.reset("bp-placeholder", Layers.ForegroundHighlightPathAnnotations);
        break;
    }

    drawAnnotations(graphics, highlightOptions, annotations, graph);

    return false;
  }

  function drawAnnotations(graphics, highlightOptions, annotations, graph) {
    var index, len,
      index2, len2,
      index3, firstItemId, nextItemId,
      path,
      items,
      connectorEdge,
      annotationConfig,
      buffer,
      from, to;

    if (annotations.length > 0) {
      buffer = new PolylinesBuffer();

      switch (zOrderType) {
        case ZOrderType.Background://ignore jslint
          graphics.activate("bp-placeholder", Layers.BackgroundHighlightPathAnnotations);
          break;
        case ZOrderType.Foreground://ignore jslint
          graphics.activate("bp-placeholder", Layers.ForegroundHighlightPathAnnotations);
          break;
      }

      /* group path segments by from node */
      var pairs = {};
      for (index = 0, len = annotations.length; index < len; index += 1) {
        annotationConfig = annotations[index];
        if (annotationConfig.items != null && annotationConfig.items.length > 0) {
          items = annotationConfig.items.slice(0);
          firstItemId = items[0];
          if (graph.hasNode(firstItemId)) {
            for (index2 = 1, len2 = items.length; index2 < len2; index2 += 1) {
              nextItemId = items[index2];
              if (graph.hasNode(nextItemId)) {
                if (pairs.hasOwnProperty(firstItemId)) {
                  pairs[firstItemId].push(nextItemId);
                } else {
                  pairs[firstItemId] = [nextItemId];
                }
                firstItemId = nextItemId;
              }
            }
          }
        }
      }

      /* get shortest paths */
      var paths = {};
      for (from in pairs) {
        paths[from] = {};
        if (pairs.hasOwnProperty(from)) {
          graph.getShortestPath(this, from, pairs[from], function (connectorEdge, fromItem, toItem) {
            return connectorEdge.weight;
          }, function (path2, to2) {
            paths[from][to2] = path2;
          }); //ignore jslint
        }
      }

      /* trace annotations */
      for (index = 0, len = annotations.length; index < len; index += 1) {
        annotationConfig = annotations[index];

        var paletteItem = new PaletteItem({
          lineColor: (annotationConfig.color != null ? annotationConfig.color : highlightOptions.highlightLinesColor),
          lineWidth: (annotationConfig.lineWidth != null ? annotationConfig.lineWidth : highlightOptions.highlightLinesWidth),
          lineType: (annotationConfig.lineType != null ? annotationConfig.lineType : highlightOptions.highlightLinesType),
          fillColor: null,
          opacity: annotationConfig.opacity
        });
        var polyline = buffer.getPolyline(paletteItem);

        if (annotationConfig.items != null && annotationConfig.items.length > 0) {
          items = annotationConfig.items.slice(0);
          firstItemId = items[0];

          if (graph.hasNode(firstItemId)) {
            for (index2 = 1, len2 = items.length; index2 < len2; index2 += 1) {
              nextItemId = items[index2];
              if (graph.hasNode(nextItemId)) {
                path = paths[firstItemId][nextItemId] || [];
                for (index3 = path.length - 2; index3 >= 0; index3 -= 1) {
                  from = path[index3 + 1];
                  to = path[index3];
                  connectorEdge = graph.edge(from, to);
                  if (connectorEdge.from == from) {
                    connectorEdge.polyline.clone().mergeTo(polyline);
                  } else {
                    polyline.addInverted(connectorEdge.polyline.clone());
                  }
                  if (annotationConfig.showArrows) {
                    if (to == connectorEdge.parentsArrowId || to == connectorEdge.childrenArrowId) {
                      polyline.addArrow(annotationConfig.lineWidth, function (arrowPolyline) {
                        arrowPolyline.mergeTo(buffer.getPolyline(arrowPolyline.paletteItem));
                      }); //ignore jslint
                    }
                  }
                }

                firstItemId = nextItemId;
              }
            }
          }
        }
      }

      graphics.polylinesBuffer(buffer);
    }
  }

  return {
    process: process
  };
}

/**
 * @class RenderEventArgs
 * @classdesc The render event arguments contains parameters of rendering callback function 
 */
function RenderEventArgs() {
  /**
   * Node id
   * @type {string}
   */
  this.id = null;

  /**
   * Reference to DOM element.
   * @type {object}
   */
  this.element = null;

  /**
   * Context object of the node
   * @type {object}
   */
  this.context = null;

  /**
   * Node template name
   * @type {string}
   */
  this.templateName = null;

  /**
   * This option indicates current template state.
   * @type {RenderingMode}
   */
  this.renderingMode = null;

  /**
   * The rendered item is current diagram cursor item
   * @type {boolean}
   */
  this.isCursor = false;

  /**
   * The rendered item is selected
   * @type {boolean}
   */
  this.isSelected = false;
}

function CollinearVectorBundle() {
  var _boundingRect = new Rect(),
    _vectors = [],
    _continuations = [];

  function addVector(vector, continuation) {
    _vectors.push(vector);
    _continuations.push(continuation);

    _boundingRect.addRect(vector.from.x, vector.from.y);
    _boundingRect.addRect(vector.to.x, vector.to.y);
  }

  function loopProjections(callback) { // calback(from, to)
    var index, len,
      vector;
    if (_boundingRect.width > _boundingRect.height) {
      for (index = 0, len = _vectors.length; index < len; index += 1) {
        vector = _vectors[index];
        callback(vector.from.x, vector.to.x, _continuations[index]);
      }
    } else {
      for (index = 0, len = _vectors.length; index < len; index += 1) {
        vector = _vectors[index];
        callback(vector.from.y, vector.to.y, _continuations[index]);
      }
    }
  }

  function resolve() {
    if (_vectors.length == 1) {
      _continuations[0](0, 1, 1);
    } else {
      var stackSegments = Pile();
      loopProjections(function (from, to, continuation) {
        stackSegments.add(from, to, continuation);
      });

      stackSegments.resolve(this, function (from, to, context, offset, bundleSize, direction) {
        context(offset, bundleSize, direction);
      });
    }
  }

  return {
    addVector: addVector,
    resolve: resolve
  };
}

function ConnectorAnnotationOffsetResolver() {
  var _bundles = {};

  function getOffset(vector, callback) {
    var key = vector.getLineKey();

    if (!_bundles.hasOwnProperty(key)) {
      _bundles[key] = new CollinearVectorBundle();
    }

    _bundles[key].addVector(vector, callback);
  }

  function resolve() {
    for (var key in _bundles) {
      if (_bundles.hasOwnProperty(key)) {
        var bundle = _bundles[key];
        bundle.resolve();
      }
    }
  }

  return {
    getOffset: getOffset,
    resolve: resolve
  };
}

function ConnectorStraight() {

}
ConnectorStraight.prototype = new BaseShape();

ConnectorStraight.prototype.draw = function (buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize, connectorShapeType, labelOffset, labelPlacementType, hasLabel,
  connectorAnnotationOffsetResolver, onLabelPlacement, labelConfig) {
  var fromPoint, toPoint, betweenPoint,
    vector, newVector,
    offset = linesOffset / 2,
    labelPlacement = null,
    fromLabelPlacement = PlacementType.Auto,
    toLabelPlacement = PlacementType.Auto,
    self = this;

  vector = new Vector(fromRect.centerPoint(), toRect.centerPoint());

  fromRect.loopEdges(function (sideVector, placementType) {
    fromPoint = sideVector.getIntersectionPoint(vector, true, 1.0);
    fromLabelPlacement = placementType;
    return (fromPoint != null);
  });

  toRect.loopEdges(function (sideVector, placementType) {
    toPoint = sideVector.getIntersectionPoint(vector, true, 1.0);
    toLabelPlacement = placementType;
    return (toPoint != null);
  });

  if (fromPoint != null && toPoint != null) {
    var baseVector = new Vector(fromPoint, toPoint);
    connectorAnnotationOffsetResolver.getOffset(baseVector, function (offsetIndex, bundleSize, direction) {
      var tempOffset = (offsetIndex * bundleOffset - (bundleSize - 1) * bundleOffset / 2.0) * direction;
      baseVector.offset(tempOffset);
      fromPoint = baseVector.from;
      toPoint = baseVector.to;

      switch (connectorShapeType) {
        case ConnectorShapeType.TwoWay:
          newVector = new Vector(toPoint.clone(), fromPoint.clone());
          newVector.offset(offset);
          self._drawLine(buffer, linePaletteItem, newVector.from, newVector.to, false);

          newVector = new Vector(fromPoint.clone(), toPoint.clone());
          newVector.offset(offset);
          self._drawLine(buffer, linePaletteItem, newVector.from, newVector.to, false);
          break;
        case ConnectorShapeType.OneWay:
          self._drawLine(buffer, linePaletteItem, fromPoint, toPoint, false);
          break;
        case ConnectorShapeType.BothWay:
          self._drawLine(buffer, linePaletteItem, fromPoint, toPoint, true);
          break;
      }

      if (hasLabel) {
        /* end points labels placement */
        switch (labelPlacementType) {
          case ConnectorLabelPlacementType.From:
            labelPlacement = self._getLabelPositionBySnapPoint(fromPoint.x, fromPoint.y, labelSize.width, labelSize.height, labelOffset, fromLabelPlacement);
            break;
          case ConnectorLabelPlacementType.Between:
            betweenPoint = self._betweenPoint(fromPoint, toPoint);
            labelPlacement = self._getLabelPositionBySnapPoint(betweenPoint.x, betweenPoint.y, labelSize.width, labelSize.height, labelOffset, PlacementType.Right);
            break;
          case ConnectorLabelPlacementType.To:
            labelPlacement = self._getLabelPositionBySnapPoint(toPoint.x, toPoint.y, labelSize.width, labelSize.height, labelOffset, toLabelPlacement);
            break;
        }

        if (onLabelPlacement != null) {
          onLabelPlacement.call(this, labelPlacement, labelConfig);
        }
      }
    });

  }
};

ConnectorStraight.prototype._drawLine = function (buffer, linePaletteItem, fromPoint, toPoint, bothWays) {
  var polyline;

  buffer.addInverted(function (invertedBuffer) {
    polyline = invertedBuffer.getPolyline(linePaletteItem);
    polyline.addSegment(new MoveSegment(fromPoint));
    polyline.addSegment(new LineSegment(toPoint));

    polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
      polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
    }); //ignore jslint
  }, false);//ignore jslint

  if (bothWays) {
    polyline = buffer.getPolyline(linePaletteItem);
    polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
      polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
    }); //ignore jslint
  }
};

ConnectorStraight.prototype._getLabelPositionBySnapPoint = function (x, y, labelWidth, labelHeight, labelOffset, placementType) {
  var result = null;
  switch (placementType) {
    case PlacementType.Auto:
    case PlacementType.Top:
      result = new Rect(x - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
      break;
    case PlacementType.Right:
      result = new Rect(x + labelOffset, y - labelHeight / 2.0, labelWidth, labelHeight);
      break;
    case PlacementType.Bottom:
      result = new Rect(x - labelWidth / 2.0, y + labelOffset, labelWidth, labelHeight);
      break;
    case PlacementType.Left:
      result = new Rect(x - labelWidth - labelOffset, y - labelHeight / 2.0, labelWidth, labelHeight);
      break;
  }
  return result;
};

function ConnectorOffbeat() {

}
ConnectorOffbeat.prototype = new BaseShape();

ConnectorOffbeat.prototype.draw = function (buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize, connectorShapeType, labelOffset, labelPlacementType, hasLabel,
  connectorAnnotationOffsetResolver, onLabelPlacement, labelConfig) {
  var minimalGap,
    connectorRect,
    fromPoint, toPoint,
    snapPoint,
    index, len,
    offsets, tempOffset,
    invertX, invertY,
    fromLabelPlacement = PlacementType.Auto,
    toLabelPlacement = PlacementType.Auto,
    labelPlacement = null,
    polyline,
    bothWay;

  polyline = buffer.getPolyline(linePaletteItem);

  offsets = [];
  switch (connectorShapeType) {
    case ConnectorShapeType.TwoWay:
      offsets = [-linesOffset / 2, linesOffset / 2];
      bothWay = false;
      break;
    case ConnectorShapeType.OneWay:
      offsets = [0];
      bothWay = false;
      break;
    case ConnectorShapeType.BothWay:
      offsets = [0];
      bothWay = true;
      break;
  }

  minimalGap = Math.max(hasLabel ? labelSize.width : 0, linesOffset * 5);
  if (fromRect.right() + minimalGap < toRect.left() || fromRect.left() > toRect.right() + minimalGap) {
    if (fromRect.left() > toRect.right()) {
      fromPoint = new Point(fromRect.left(), fromRect.verticalCenter());
      toPoint = new Point(toRect.right(), toRect.verticalCenter());
    } else {
      fromPoint = new Point(fromRect.right(), fromRect.verticalCenter());
      toPoint = new Point(toRect.left(), toRect.verticalCenter());
    }
    if (hasLabel) {
      if (fromRect.left() > toRect.right()) {
        fromLabelPlacement = PlacementType.Left;
        toLabelPlacement = PlacementType.Right;
      } else {
        fromLabelPlacement = PlacementType.Right;
        toLabelPlacement = PlacementType.Left;
      }
    }
    connectorRect = new Rect(fromPoint, toPoint);
    invertY = (fromPoint.y <= toPoint.y);
    invertX = (fromPoint.x < toPoint.x);
    if (connectorRect.height < connectorRect.width) {
      /* horizontal single bended connector between boxes from right side to left side */
      if (connectorRect.height < linesOffset * 2) {
        connectorRect.offset(0, invertY ? linesOffset * 2 : 0, 0, invertY ? 0 : linesOffset * 2);
      }

      for (index = 0, len = offsets.length; index < len; index += 1) {
        tempOffset = offsets[index];
        buffer.addInverted(function (invertedBuffer) {
          var polyline = invertedBuffer.getPolyline(linePaletteItem);
          polyline.addSegment(new MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
          polyline.addSegment(new QuadraticArcSegment(connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
            toPoint.x, toPoint.y + tempOffset));

          if (bothWay) {
            polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
              polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
            });//ignore jslint
          }
        }, index || (connectorShapeType == ConnectorShapeType.OneWay));//ignore jslint

        polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
          polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
        }); //ignore jslint
      }

      if (hasLabel) {
        if (labelSize.width < connectorRect.width / 5 * 2) {
          snapPoint = QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), (invertY ? connectorRect.top() : connectorRect.bottom()), toPoint.x, toPoint.y, 0.5);
        } else {
          snapPoint = new Point(fromPoint.x, invertY ? connectorRect.top() : connectorRect.bottom());
        }
        labelPlacement = new Rect(snapPoint.x + (invertX ? linesOffset : -labelSize.width - linesOffset), (invertY ? snapPoint.y - labelSize.height - linesOffset : snapPoint.y + linesOffset), labelSize.width, labelSize.height);
      }
    } else {
      /* horizontal double bended connector between boxes from right side to left side */
      for (index = 0, len = offsets.length; index < len; index += 1) {
        tempOffset = offsets[index];
        buffer.addInverted(function (invertedBuffer) {
          var polyline = invertedBuffer.getPolyline(linePaletteItem);
          polyline.addSegment(new MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
          polyline.addSegment(new QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.top() : connectorRect.bottom()) + tempOffset,
            connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), connectorRect.verticalCenter() + tempOffset));
          polyline.addSegment(new QuadraticArcSegment(connectorRect.horizontalCenter() + tempOffset * (invertY != invertX ? 1 : -1), (invertY ? connectorRect.bottom() : connectorRect.top()) + tempOffset,
            toPoint.x, toPoint.y + tempOffset));

          if (bothWay) {
            polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
              polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
            });//ignore jslint
          }
        }, index || (connectorShapeType == ConnectorShapeType.OneWay));//ignore jslint

        polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
          polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
        }); //ignore jslint
      }

      if (hasLabel) {
        labelPlacement = new Rect(connectorRect.horizontalCenter() + (invertY != invertX ? linesOffset : -(linesOffset + labelSize.width)),
          connectorRect.verticalCenter() - labelSize.height / 2, labelSize.width, labelSize.height);
      }
    }
  } else {
    if (fromRect.verticalCenter() < toRect.top() || fromRect.verticalCenter() > toRect.bottom()) {
      /* vertical single bended connector between boxes from right side to right side */
      invertX = fromRect.x < panelSize.width / 2;
      fromPoint = new Point(invertX ? fromRect.right() : fromRect.left(), fromRect.verticalCenter());
      toPoint = new Point(invertX ? toRect.right() : toRect.left(), toRect.verticalCenter());
      connectorRect = new Rect(fromPoint, toPoint);
      connectorRect.offset(linesOffset * 10, 0, linesOffset * 10, 0);
      invertY = (fromPoint.y <= toPoint.y);
      for (index = 0, len = offsets.length; index < len; index += 1) {
        tempOffset = offsets[index];
        buffer.addInverted(function (invertedBuffer) {
          var polyline = invertedBuffer.getPolyline(linePaletteItem);
          polyline.addSegment(new MoveSegment(fromPoint.x, fromPoint.y + tempOffset));
          polyline.addSegment(new QuadraticArcSegment(invertX ? connectorRect.right() + tempOffset * (invertY ? -1 : 1) : connectorRect.left() - tempOffset * (invertY ? -1 : 1), connectorRect.verticalCenter(),
            invertX ? toRect.right() : toRect.left(), toRect.verticalCenter() - tempOffset));

          if (bothWay) {
            polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
              polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
            });//ignore jslint
          }
        }, index || (connectorShapeType == ConnectorShapeType.OneWay));//ignore jslint

        polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
          polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
        });//ignore jslint
      }

      if (hasLabel) {
        fromLabelPlacement = invertX ? PlacementType.Right : PlacementType.Left;
        toLabelPlacement = fromLabelPlacement;

        snapPoint = QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, (invertX ? connectorRect.right() : connectorRect.left()), connectorRect.verticalCenter(), toPoint.x, toPoint.y, 0.5);
        labelPlacement = new Rect(snapPoint.x + (invertX ? linesOffset / 2 : -linesOffset / 2 - labelSize.width), snapPoint.y - labelSize.height / 2, labelSize.width, labelSize.height);
      }
    } else {
      fromPoint = new Point(fromRect.horizontalCenter(), fromRect.top());
      toPoint = new Point(toRect.horizontalCenter(), toRect.top());
      connectorRect = new Rect(fromPoint, toPoint);
      connectorRect.offset(0, linesOffset * 7, 0, 0);
      invertX = (fromPoint.x < toPoint.x);
      for (index = 0, len = offsets.length; index < len; index += 1) {
        tempOffset = offsets[index];
        buffer.addInverted(function (invertedBuffer) {
          var polyline = invertedBuffer.getPolyline(linePaletteItem);
          polyline.addSegment(new MoveSegment(fromPoint.x + tempOffset, fromPoint.y));
          polyline.addSegment(new QuadraticArcSegment(connectorRect.horizontalCenter(), connectorRect.top() - tempOffset * (invertX ? -1 : 1),
            toRect.horizontalCenter() - tempOffset, toRect.top()));

          if (bothWay) {
            polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
              polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
            });//ignore jslint
          }
        }, index || (connectorShapeType == ConnectorShapeType.OneWay));//ignore jslint

        polyline.addArrow(linePaletteItem.lineWidth, function (polyline) {
          polyline.mergeTo(buffer.getPolyline(polyline.paletteItem));
        }); //ignore jslint
      }

      if (hasLabel) {
        fromLabelPlacement = PlacementType.Top;
        toLabelPlacement = PlacementType.Top;

        snapPoint = QuadraticArcSegment.prototype.offsetPoint(fromPoint.x, fromPoint.y, connectorRect.horizontalCenter(), connectorRect.top(), toPoint.x, toPoint.y, 0.5);
        labelPlacement = new Rect(snapPoint.x - labelSize.width / 2, snapPoint.y - (labelOffset + labelSize.height), labelSize.width, labelSize.height);
      }
    }
  }

  if (hasLabel) {
    /* end points labels placement */
    switch (labelPlacementType) {
      case ConnectorLabelPlacementType.From:
        labelPlacement = this._getLabelPosition(fromRect.x, fromRect.y, fromRect.width, fromRect.height, labelPlacement.width, labelPlacement.height, labelOffset, fromLabelPlacement);
        break;
      case ConnectorLabelPlacementType.To:
        labelPlacement = this._getLabelPosition(toRect.x, toRect.y, toRect.width, toRect.height, labelPlacement.width, labelPlacement.height, labelOffset, toLabelPlacement);
        break;
    }
  }

  if (onLabelPlacement != null) {
    onLabelPlacement(labelPlacement, labelConfig);
  }
};

function DrawConnectorAnnotationTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  orientationOptionTask, connectorAnnotationOptionTask, alignDiagramTask, annotationLabelTemplateTask, zOrderType) {
  var _graphics,
    _transform,
    _annotationLabelTemplate,
    _panelSize;

  function process() {

    _graphics = getGraphics();

    _transform = createTransformTask.getTransform();
    orientationOptionTask.getOptions();

    _annotationLabelTemplate = annotationLabelTemplateTask.getTemplate();

    _panelSize = new Size(alignDiagramTask.getContentSize());

    switch (zOrderType) {
      case ZOrderType.Background://ignore jslint
        _graphics.reset("bp-placeholder", Layers.BackgroundConnectorAnnotation);
        break;
      case ZOrderType.Foreground://ignore jslint
        _graphics.reset("bp-placeholder", Layers.ForegroundConnectorAnnotation);
        break;
    }

    drawAnnotations(connectorAnnotationOptionTask.getAnnotations(), alignDiagramTask.getItemPosition);

    return false;
  }

  function drawAnnotations(annotations, getItemPosition) {
    var index, len;
      Layers.ForegroundConnectorAnnotation;
      var fromItemPosition, fromActualPosition,
      toItemPosition, toActualPosition,
      shape,
      annotationConfig,
      uiHash,
      buffer = new PolylinesBuffer(),
      connectorAnnotationOffsetResolver = ConnectorAnnotationOffsetResolver(),
      maximumLineWidth = 0;

    switch (zOrderType) {
      case ZOrderType.Background://ignore jslint
        _graphics.activate("bp-placeholder", Layers.BackgroundConnectorAnnotation);
        break;
      case ZOrderType.Foreground://ignore jslint
        _graphics.activate("bp-placeholder", Layers.ForegroundConnectorAnnotation);
        break;
    }

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotationConfig = annotations[index];
      maximumLineWidth = Math.max(maximumLineWidth, annotationConfig.lineWidth);
    }

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotationConfig = annotations[index];

      if (annotationConfig.fromItem != null && annotationConfig.toItem != null) {
        fromItemPosition = getItemPosition(annotationConfig.fromItem);
        toItemPosition = getItemPosition(annotationConfig.toItem);
        if (fromItemPosition != null && toItemPosition != null) {
          fromActualPosition = fromItemPosition.actualPosition;
          toActualPosition = toItemPosition.actualPosition;

          switch (annotationConfig.connectorPlacementType) {
            case ConnectorPlacementType.Offbeat:
              shape = new ConnectorOffbeat();
              break;
            case ConnectorPlacementType.Straight:
              shape = new ConnectorStraight();
              break;
          }

          /* rotate label size to user orientation */
          var labelSize;
          _transform.transformRect(0, 0, annotationConfig.labelSize.width, annotationConfig.labelSize.height, false,
            this, function (x, y, width, height) {
              labelSize = new Size(width, height);
            });

          /* rotate panel size to user orientation */
          var panelSize = null;
          _transform.transformRect(0, 0, _panelSize.width, _panelSize.height, false,
            this, function (x, y, width, height) {
              panelSize = new Size(width, height);
            });

          var linePaletteItem = new PaletteItem({
            lineColor: annotationConfig.color,
            lineWidth: annotationConfig.lineWidth,
            lineType: annotationConfig.lineType
          });

          var hasLabel = !isNullOrEmpty(annotationConfig.label);

          /* offset rectangles */
          var fromRect = new Rect(fromActualPosition).offset(annotationConfig.offset);
          var toRect = new Rect(toActualPosition).offset(annotationConfig.offset);

          var linesOffset = annotationConfig.lineWidth * 3;
          var bundleOffset = maximumLineWidth * 6;

          /* create connection lines */
          shape.draw(buffer, linePaletteItem, fromRect, toRect, linesOffset, bundleOffset, labelSize, panelSize,
            annotationConfig.connectorShapeType, 4 /*labelOffset*/, annotationConfig.labelPlacementType, hasLabel,
            connectorAnnotationOffsetResolver, function (labelPlacement, labelConfig) {
              var hasLabel = !isNullOrEmpty(labelConfig.label);
              if (hasLabel && labelPlacement != null) {
                /* translate result label placement back to users orientation */
                _transform.transformRect(labelPlacement.x, labelPlacement.y, labelPlacement.width, labelPlacement.height, true,
                  this, function (x, y, width, height) {
                    labelPlacement = new Rect(x, y, width, height);
                  });

                uiHash = new RenderEventArgs();
                uiHash.context = labelConfig;

                /* draw label */
                _graphics.template(
                  labelPlacement.x
                  , labelPlacement.y
                  , 0
                  , 0
                  , 0
                  , 0
                  , labelPlacement.width
                  , labelPlacement.height
                  , _annotationLabelTemplate.template()
                  , _annotationLabelTemplate.getHashCode()
                  , _annotationLabelTemplate.render
                  , uiHash
                  , null
                );
              }
            }, annotationConfig);
        }
      }
    }

    connectorAnnotationOffsetResolver.resolve();


    /* translate result polylines back to users orientation */
    buffer.transform(_transform, true);
    /* draw background polylines */
    _graphics.polylinesBuffer(buffer);
  }

  return {
    process: process
  };
}

function Callout(graphics) {
  this.m_graphics = graphics;

  this.pointerPlacement = PlacementType.Auto;
  this.cornerRadius = "10%";
  this.offset = 0;
  this.opacity = 1;
  this.lineWidth = 1;
  this.pointerWidth = "10%";
  this.borderColor = Colors.Black;
  this.lineType = LineType.Solid;
  this.fillColor = Colors.LightGray;

  this.m_map = [[PlacementType.TopLeft, PlacementType.Left, PlacementType.BottomLeft],
  [PlacementType.Top, null, PlacementType.Bottom],
  [PlacementType.TopRight, PlacementType.Right, PlacementType.BottomRight]
  ];
}
Callout.prototype = new BaseShape();

Callout.prototype.draw = function (snapPoint, position) {
  position = new Rect(position).offset(this.offset);

  var pointA = new Point(position.x, position.y),
    pointB = new Point(position.right(), position.y),
    pointC = new Point(position.right(), position.bottom()),
    pointD = new Point(position.left(), position.bottom()),
    snapPoints = [null, null, null, null, null, null, null, null],
    points = [pointA, pointB, pointC, pointD],
    radius = this.m_graphics.getPxSize(this.cornerRadius, Math.min(pointA.distanceTo(pointB), pointB.distanceTo(pointC))),
    placementType,
    point,
    index,
    attr,
    linePaletteItem,
    buffer,
    polyline;

  attr = {};
  if (this.fillColor !== null) {
    attr.fillColor = this.fillColor;
    attr.opacity = this.opacity;
  }
  if (this.lineColor !== null) {
    attr.lineColor = this.borderColor;
  }
  attr.lineWidth = this.lineWidth;
  attr.lineType = this.lineType;

  linePaletteItem = new PaletteItem(attr);
  buffer = new PolylinesBuffer();
  polyline = buffer.getPolyline(linePaletteItem);

  if (snapPoint !== null) {
    placementType = (this.pointerPlacement === PlacementType.Auto) ? this._getPlacement(snapPoint, pointA, pointC) : this.pointerPlacement;
    if (placementType !== null) {
      snapPoints[placementType] = snapPoint;
    }
  }

  for (index = 0; index < points.length; index += 1) {
    this._drawSegment(polyline, points[0], points[1], points[2], this.pointerWidth, radius, snapPoints[1], snapPoints[2]);
    point = points.shift();
    points.push(point);
    point = snapPoints.shift();
    snapPoints.push(point);
    point = snapPoints.shift();
    snapPoints.push(point);
  }

  this.m_graphics.polylinesBuffer(buffer);
};

Callout.prototype._getPlacement = function (point, point1, point2) {
  var row = null,
    column = null;
  if (point.x < point1.x) {
    row = 0;
  }
  else if (point.x > point2.x) {
    row = 2;
  }
  else {
    row = 1;
  }
  if (point.y < point1.y) {
    column = 0;
  }
  else if (point.y > point2.y) {
    column = 2;
  }
  else {
    column = 1;
  }
  return this.m_map[row][column];
};

Callout.prototype._drawSegment = function (polyline, pointA, pointB, pointC, base, radius, sideSnapPoint, cornerSnapPoint) {
  var pointA1 = this._offsetPoint(pointA, pointB, radius),
    pointB1 = this._offsetPoint(pointB, pointA, radius),
    pointB2 = this._offsetPoint(pointB, pointC, radius),
    pointS,
    pointS1,
    pointS2;

  base = this.m_graphics.getPxSize(base, pointA.distanceTo(pointB) / 2.0);

  if (polyline.length() === 0) {
    polyline.addSegment(new MoveSegment(pointA1));
  }
  if (sideSnapPoint !== null) {
    pointS = this._betweenPoint(pointA, pointB);
    pointS1 = this._offsetPoint(pointS, pointA, base);
    pointS2 = this._offsetPoint(pointS, pointB, base);
    polyline.addSegment(new LineSegment(pointS1));
    polyline.addSegment(new LineSegment(sideSnapPoint));
    polyline.addSegment(new LineSegment(pointS2));
  }

  polyline.addSegment(new LineSegment(pointB1));
  if (cornerSnapPoint !== null) {
    polyline.addSegment(new LineSegment(cornerSnapPoint));
    polyline.addSegment(new LineSegment(pointB2));
  }
  else {
    polyline.addSegment(new QuadraticArcSegment(pointB, pointB2));
  }
};

function Marker() {

}
Marker.Markers = {};

Marker.DrawCircle = function (polyline, position) {
  var quarter = Math.min(position.width / 2.0, position.height / 2.0);
  position = new Rect(position.horizontalCenter() - quarter, position.verticalCenter() - quarter, quarter * 2.0, quarter * 2.0);
  Marker.DrawOval(polyline, position);
};

Marker.DrawRectangle = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.x, position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.x, position.y));
  polyline.addSegment(new LineSegment(position.right(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new LineSegment(position.x, position.bottom()));
  polyline.addSegment(new LineSegment(position.x, position.verticalCenter()));
};

Marker.DrawOval = function (polyline, position) {
  var cpX, cpY;
  cpX = (position.width / 2) * 0.5522848;
  cpY = (position.height / 2) * 0.5522848;
  polyline.addSegment(new MoveSegment(position.x, position.verticalCenter()));
  polyline.addSegment(new CubicArcSegment(position.x, position.verticalCenter() - cpY, position.horizontalCenter() - cpX, position.y, position.horizontalCenter(), position.y));
  polyline.addSegment(new CubicArcSegment(position.horizontalCenter() + cpX, position.y, position.right(), position.verticalCenter() - cpY, position.right(), position.verticalCenter()));
  polyline.addSegment(new CubicArcSegment(position.right(), position.verticalCenter() + cpY, position.horizontalCenter() + cpX, position.bottom(), position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new CubicArcSegment(position.horizontalCenter() - cpX, position.bottom(), position.x, position.verticalCenter() + cpY, position.x, position.verticalCenter()));
};

Marker.DrawTriangle = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.left(), position.bottom()));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new LineSegment(position.left(), position.bottom()));
};

Marker.DrawCrossOut = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.x, position.y));
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.right(), position.bottom()));
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.right(), position.y));
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.left(), position.bottom()));
};

Marker.DrawRhombus = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new LineSegment(position.left(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.verticalCenter()));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.bottom()));
};

Marker.DrawWedge = function (polyline, position) {
  polyline.addSegment(new MoveSegment(position.horizontalCenter(), position.y));
  polyline.addSegment(new LineSegment(position.right(), position.y));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.bottom()));
  polyline.addSegment(new LineSegment(position.left(), position.y));
  polyline.addSegment(new LineSegment(position.horizontalCenter(), position.y));
};

Marker.DrawFramedOval = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawOval(polyline, position);
};

Marker.DrawFramedTriangle = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawTriangle(polyline, position);
};

Marker.DrawFramedWedge = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawWedge(polyline, position);
};

Marker.DrawFramedRhombus = function (polyline, position) {
  Marker.DrawRectangle(polyline, position);
  Marker.DrawRhombus(polyline, position);
};

Marker.DrawNone = function (polyline, position) {

};

Marker.Markers[ShapeType.Circle] = Marker.DrawCircle;
Marker.Markers[ShapeType.Rectangle] = Marker.DrawRectangle;
Marker.Markers[ShapeType.Oval] = Marker.DrawOval;
Marker.Markers[ShapeType.Triangle] = Marker.DrawTriangle;
Marker.Markers[ShapeType.CrossOut] = Marker.DrawCrossOut;
Marker.Markers[ShapeType.Rhombus] = Marker.DrawRhombus;
Marker.Markers[ShapeType.Wedge] = Marker.DrawWedge;
Marker.Markers[ShapeType.FramedOval] = Marker.DrawFramedOval;
Marker.Markers[ShapeType.FramedTriangle] = Marker.DrawFramedTriangle;
Marker.Markers[ShapeType.FramedWedge] = Marker.DrawFramedWedge;
Marker.Markers[ShapeType.FramedRhombus] = Marker.DrawFramedRhombus;
Marker.Markers[ShapeType.None] = Marker.DrawNone;

Marker.prototype.draw = function (polylinesBuffer, shapeType, position, paletteItem) {
  var polyline;

  // If you need to create custom multi-color marker type
  // create color palette object for every fragment 
  // than request polyline of that that palette style 
  // add fragment into received polyline
  polyline = polylinesBuffer.getPolyline(paletteItem);
  Marker.Markers[shapeType](polyline, position);
};

function Shape(graphics) {
  this.m_graphics = graphics;
  this.transform = null;

  this.orientationType = OrientationType.Top;
  this.panelSize = null;
  this.shapeType = ShapeType.Rectangle;
  this.offset = new Thickness(0, 0, 0, 0);
  this.lineWidth = 1;
  this.labelOffset = 4;
  this.cornerRadius = "10%";
  this.opacity = 1;
  this.fillColor = null;
  this.labelSize = new Size(60, 30);
  this.lineType = LineType.Solid;
  this.borderColor = null;
  this.hasLabel = false;
  this.labelTemplate = null;
  this.labelPlacement = PlacementType.Auto;
}
Shape.prototype = new BaseShape();

Shape.prototype.draw = function (position, uiHash) {
  var labelPlacement,
    calloutShape,
    linePaletteItem,
    buffer,
    marker;

  position = new Rect(position).offset(this.offset);

  this.transform = new Transform();
  this.transform.size = this.panelSize;
  this.transform.setOrientation(this.orientationType);

  /* label size */
  if (this.hasLabel) {
    labelPlacement = this._getLabelPosition(position.x, position.y, position.width, position.height, this.labelSize.width, this.labelSize.height, this.labelOffset, this.labelPlacement);
  }


  switch (this.shapeType) {
    case ShapeType.Rectangle:
      calloutShape = new Callout(this.m_graphics);
      calloutShape.cornerRadius = this.cornerRadius;
      calloutShape.opacity = this.opacity;
      calloutShape.lineWidth = this.lineWidth;
      calloutShape.lineType = this.lineType;
      calloutShape.borderColor = this.borderColor;
      calloutShape.fillColor = this.fillColor;
      calloutShape.draw(null, position);
      break;
    default:
      linePaletteItem = new PaletteItem({
        lineColor: this.borderColor,
        lineWidth: this.lineWidth,
        lineType: this.lineType,
        fillColor: this.fillColor,
        opacity: this.opacity
      });

      /* from rectangle */
      this.transform.transformRect(position.x, position.y, position.width, position.height, false,
        this, function (x, y, width, height) {
          position = new Rect(x, y, width, height);
        });


      marker = new Marker();
      buffer = new PolylinesBuffer();
      marker.draw(buffer, this.shapeType, position, linePaletteItem);
      buffer.transform(this.transform, true);

      this.m_graphics.polylinesBuffer(buffer);
      break;
  }

  if (this.hasLabel) {
    this.m_graphics.template(
      labelPlacement.x,
      labelPlacement.y,
      0,
      0,
      0,
      0,
      labelPlacement.width,
      labelPlacement.height,
      this.labelTemplate.template(),
      this.labelTemplate.getHashCode(),
      this.labelTemplate.render,
      uiHash,
      null
    );
  }
};

function DrawShapeAnnotationTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  orientationOptionTask, shapeAnnotationOptionTask, alignDiagramTask, annotationLabelTemplateTask, zOrderType) {
  var _graphics,
    _transform,
    _orientationOptions,
    _annotationLabelTemplate;

  function process() {

    _graphics = getGraphics();

    _transform = createTransformTask.getTransform();
    _orientationOptions = orientationOptionTask.getOptions();

    _annotationLabelTemplate = annotationLabelTemplateTask.getTemplate();

    switch (zOrderType) {
      case ZOrderType.Background://ignore jslint
        _graphics.reset("bp-placeholder", Layers.BackgroundAnnotations);
        break;
      case ZOrderType.Foreground://ignore jslint
        _graphics.reset("bp-placeholder", Layers.ForegroundAnnotations);
        break;
    }

    _drawAnnotations(shapeAnnotationOptionTask.getAnnotations(), alignDiagramTask.getItemPosition);

    return false;
  }

  function _drawAnnotations(annotations, getItemPosition) {
    var panel,
      index, len,
      index2, len2,
      index3, len3,
      shape,
      defaultConfig,
      itemPosition, position,
      properties, property,
      annotationConfig,
      uiHash;


    switch (zOrderType) {
      case ZOrderType.Background://ignore jslint
        panel = _graphics.activate("bp-placeholder", Layers.BackgroundAnnotations);
        break;
      case ZOrderType.Foreground://ignore jslint
        panel = _graphics.activate("bp-placeholder", Layers.ForegroundAnnotations);
        break;
    }

    for (index = 0, len = annotations.length; index < len; index += 1) {
      annotationConfig = annotations[index];

      if (annotationConfig.items != null && annotationConfig.items.length > 0) {
        position = new Rect();
        for (index2 = 0, len2 = annotationConfig.items.length; index2 < len2; index2 += 1) {
          itemPosition = getItemPosition(annotationConfig.items[index2]);
          if (itemPosition != null) {
            position.addRect(itemPosition.actualPosition);
          }
        }

        if (!position.isEmpty()) {
          shape = new Shape(_graphics);
          defaultConfig = new ShapeAnnotationConfig();
          properties = ["opacity", "cornerRadius", "shapeType", "offset", "lineWidth", "borderColor", "fillColor", "lineType", "labelSize", "labelOffset", "labelPlacement", "zOrderType"];
          for (index3 = 0, len3 = properties.length; index3 < len3; index3 += 1) {
            property = properties[index3];
            shape[property] = annotationConfig.hasOwnProperty(property) ? annotationConfig[property] : defaultConfig[property];
          }

          shape.position = position;
          shape.orientationType = _orientationOptions.orientationType;
          shape.panelSize = panel.size;
          shape.labelTemplate = _annotationLabelTemplate;
          shape.hasLabel = annotationConfig.templateName != null || annotationConfig.label != null;

          uiHash = new RenderEventArgs();
          uiHash.context = annotationConfig;
          uiHash.templateName = shape.labelTemplate;

          _transform.transformRect(position.x, position.y, position.width, position.height, true,
            this, function (x, y, width, height) {
              var position = new Rect(x, y, width, height);
              shape.draw(position, uiHash);
            });//ignore jslint
        }
      }
    }
  }

  return {
    process: process
  };
}

function DrawCursorTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  combinedContextsTask,
  alignDiagramTask, itemTemplateParamsTask,
  cursorItemTask, selectedItemsTask) {
  var _graphics,
    _transform;

  function process() {
    var treeItemId = cursorItemTask.getCursorTreeItem();

    _graphics = getGraphics();
    _graphics.reset("bp-placeholder", Layers.Cursor);

    if (treeItemId != null) {
      _transform = createTransformTask.getTransform();

      drawCursor(treeItemId);
    }
    return false;
  }

  function drawCursor(treeItemId) {
    var uiHash;
      _graphics.activate("bp-placeholder", Layers.Cursor);
      var treeItemPosition = alignDiagramTask.getItemPosition(treeItemId);
    if (treeItemPosition != null) {
      var actualPosition = treeItemPosition.actualPosition,
        position = new Rect(treeItemPosition.contentPosition),
        templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
        template = templateParams.template,
        templateConfig = template.templateConfig,
        cursorPadding = templateConfig.cursorPadding;

      position.offset(cursorPadding.left, cursorPadding.top, cursorPadding.right, cursorPadding.bottom);

      uiHash = new RenderEventArgs();
      uiHash.context = combinedContextsTask.getConfig(treeItemId);
      uiHash.isCursor = true;
      uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
      uiHash.templateName = templateConfig.name;

      _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
        this, function (x, y, width, height) {
          _graphics.template(
            x
            , y
            , width
            , height
            , position.x
            , position.y
            , position.width
            , position.height
            , template.cursorTemplate.template()
            , template.cursorTemplate.getHashCode()
            , template.cursorTemplate.render
            , uiHash
            , { "borderWidth": templateConfig.cursorBorderWidth }
          );
        });
    }
  }

  return {
    process: process
  };
}

function DrawHighlightTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  combinedContextsTask,
  alignDiagramTask, itemTemplateParamsTask,
  highlightItemTask, cursorItemTask, selectedItemsTask) {
  var _graphics,
    _transform;

  function process() {
    var treeItemId = highlightItemTask.getHighlightTreeItem();

    _graphics = getGraphics();
    _graphics.reset("bp-placeholder", Layers.Highlight);

    if (treeItemId != null) {
      _transform = createTransformTask.getTransform();
      drawHighlight(treeItemId);
    }

    return false;
  }

  function drawHighlight(treeItemId) {
    var uiHash;
      _graphics.activate("bp-placeholder", Layers.Highlight);
      var treeItemPosition = alignDiagramTask.getItemPosition(treeItemId),
      actualPosition = treeItemPosition.actualPosition,
      templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
      template = templateParams.template,
      templateConfig = template.templateConfig,
      highlightPadding = templateConfig.highlightPadding;

    uiHash = new RenderEventArgs();
    uiHash.context = combinedContextsTask.getConfig(treeItemId);
    uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
    uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
    uiHash.templateName = templateConfig.name;

    _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
      this, function (x, y, width, height) {
        var position = new Rect(0, 0, Math.round(width), Math.round(height));
        position.offset(highlightPadding.left, highlightPadding.top, highlightPadding.right, highlightPadding.bottom);
        if (treeItemPosition.actualVisibility == Visibility.Normal) {
          _graphics.template(
            x
            , y
            , width
            , height
            , position.x
            , position.y
            , position.width
            , position.height
            , template.highlightTemplate.template()
            , template.highlightTemplate.getHashCode()
            , template.highlightTemplate.render
            , uiHash
            , { "borderWidth": templateConfig.highlightBorderWidth }
          );
        } else {
          _graphics.template(
            Math.round(x)
            , Math.round(y)
            , Math.round(width)
            , Math.round(height)
            , Math.round(position.x)
            , Math.round(position.y)
            , Math.round(position.width)
            , Math.round(position.height)
            , template.dotHighlightTemplate.template()
            , template.dotHighlightTemplate.getHashCode()
            , template.dotHighlightTemplate.render
            , uiHash
            , { "borderWidth": templateConfig.highlightBorderWidth }
          );
        }
      });
  }

  return {
    process: process
  };
}

function DrawHighlightAnnotationTask(getGraphics, createTransformTask, applyLayoutChangesTask, scaleOptionTask,
  combinedContextsTask,
  calloutOptionTask,
  readTemplatesTask,
  alignDiagramTask, centerOnCursorTask,
  highlightItemTask, cursorItemTask, selectedItemsTask, frameSizeTask) {
  var _graphics,
    _transform,
    _calloutShape = new Callout(getGraphics()),
    _options;

  function process() {
    var treeItemId = highlightItemTask.getHighlightTreeItem();

    _graphics = getGraphics();
    _graphics.reset("calloutplaceholder", Layers.Annotation);

    if (treeItemId !== null) {
      _transform = createTransformTask.getTransform();
      _options = calloutOptionTask.getOptions();

      drawHighlightAnnotation(treeItemId);
    }
    return false;
  }

  function drawHighlightAnnotation(treeItemId) {
    var itemConfig,
      calloutPanelPosition,
      position,
      uiHash,
      calloutTemplateName,
      calloutTemplate,
      showCallout = true,
      treeItemPosition = alignDiagramTask.getItemPosition(treeItemId),
      actualPosition = treeItemPosition.actualPosition;


    switch (treeItemPosition.actualVisibility) {
      case Visibility.Dot:
      case Visibility.Line:
      case Visibility.Normal:
        itemConfig = calloutOptionTask.getItemOptions(treeItemId);

        switch (itemConfig.showCallout) {
          case Enabled.False:
            showCallout = false;
            break;
          case Enabled.True:
            showCallout = false;
            break;
          default:
            showCallout = _options.showCallout;
            break;
        }

        if (showCallout) {
          _graphics.activate("bp-placeholder", Layers.Item);

          _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
            this, function (x, y, width, height) {
              var snapRect = new Rect(x, y, width, height),
                snapPoint = new Point(snapRect.centerPoint()),
                { medianRect, viewPortRect } = getFrameMedianPosition(),
                projectionPoint = medianRect.getProjectionPoint(snapRect.centerPoint());

              if(projectionPoint == null) {
                /* snapPoint is inside viewport, no need to project */
                projectionPoint = snapPoint;
              }
              if ((treeItemPosition.actualVisibility >= _options.calloutMaximumVisibility && treeItemPosition.actualVisibility != Visibility.Invisible) || !medianRect.overlaps(snapRect)) {

                calloutTemplateName = !isNullOrEmpty(itemConfig.calloutTemplateName) ? itemConfig.calloutTemplateName :
                  !isNullOrEmpty(itemConfig.templateName) ? itemConfig.templateName :
                    !isNullOrEmpty(_options.defaultCalloutTemplateName) ? _options.defaultCalloutTemplateName :
                      _options.defaultTemplateName;

                calloutTemplate = readTemplatesTask.getTemplate(calloutTemplateName, readTemplatesTask.DefaultWidgetTemplateName);

                position = getAnnotationPosition(projectionPoint, viewPortRect, calloutTemplate.templateConfig.itemSize);

                /* position callout div placeholder */
                calloutPanelPosition = new Rect(position);
                calloutPanelPosition.addRect(projectionPoint.x, projectionPoint.y);
                calloutPanelPosition.offset(50);

                /* recalculate geometries */
                projectionPoint.x -= calloutPanelPosition.x;
                projectionPoint.y -= calloutPanelPosition.y;
                position.x -= calloutPanelPosition.x;
                position.y -= calloutPanelPosition.y;

                uiHash = new RenderEventArgs();
                uiHash.context = combinedContextsTask.getConfig(treeItemId);
                uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
                uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
                uiHash.templateName = calloutTemplate.templateConfig.name;
                _graphics.show("calloutplaceholder");
                _graphics.activate("calloutplaceholder", Layers.Annotation);
                _graphics.position("calloutplaceholder", calloutPanelPosition.x, calloutPanelPosition.y, calloutPanelPosition.width, calloutPanelPosition.height);
                _graphics.template(
                  position.x
                  , position.y
                  , position.width
                  , position.height
                  , 0
                  , 0
                  , position.width
                  , position.height
                  , calloutTemplate.itemTemplate.template()
                  , calloutTemplate.itemTemplate.getHashCode()
                  , calloutTemplate.itemTemplate.render
                  , uiHash
                  , null
                );

                _calloutShape.pointerPlacement = PlacementType.Auto;
                _calloutShape.cornerRadius = _options.calloutCornerRadius;
                _calloutShape.offset = _options.calloutOffset;
                _calloutShape.opacity = _options.calloutOpacity;
                _calloutShape.lineWidth = _options.calloutLineWidth;
                _calloutShape.pointerWidth = _options.calloutPointerWidth;
                _calloutShape.borderColor = _options.calloutBorderColor;
                _calloutShape.fillColor = _options.calloutfillColor;
                _calloutShape.draw(projectionPoint, position);
              } else {
                _graphics.hide("calloutplaceholder");
              }
            }
          );
        } else {
          _graphics.hide("calloutplaceholder");
        }
        break;
      case Visibility.Invisible:
        _graphics.hide("calloutplaceholder");
        break;
    }
  }

  function getFrameMedianPosition() {
    var scaleOptions = scaleOptionTask.getOptions(),
      scale = scaleOptions.scale,
      placeholderOffset = new Point(centerOnCursorTask.getPlaceholderOffset()),
      scrollPanelSize = new Size(applyLayoutChangesTask.getScrollPanelSize()),
      frameBaseOffset = new Thickness(applyLayoutChangesTask.getFrameOffset()),
      medianThickness = new Thickness(frameSizeTask.getMedian());

    
    placeholderOffset.scale(1.0 / scale);
    frameBaseOffset.scale(1.0 / scale);
    scrollPanelSize.scale(1.0 / scale);
    medianThickness.scale(1.0 / scale);

    var viewPortRect = new Rect(placeholderOffset.x, placeholderOffset.y, scrollPanelSize.width, scrollPanelSize.height);
    var medianRect = new Rect(viewPortRect);
    medianRect.offset(frameBaseOffset);
    medianRect.offset(medianThickness);

    return { 
      medianRect: medianRect,
      viewPortRect: viewPortRect
    };
  }

  function getAnnotationPosition(snapPoint, panelRect, itemSize) {
    var result = new Rect(snapPoint.x, snapPoint.y, itemSize.width, itemSize.height);

    switch (_options.orientationType) {
      case OrientationType.Top:
      case OrientationType.Bottom:
        result.y -= (itemSize.height / 4.0);
        if (snapPoint.x < panelRect.horizontalCenter()) {
          result.x += _options.calloutPlacementOffset;
        }
        else {
          result.x -= (_options.calloutPlacementOffset + itemSize.width);
        }
        break;
      default:
        result.x -= (itemSize.width / 4.0);
        if (snapPoint.y < panelRect.verticalCenter()) {
          result.y += _options.calloutPlacementOffset;
        }
        else {
          result.y -= (_options.calloutPlacementOffset + itemSize.height);
        }
        break;
    }

    // If annotation clipped then move it back into view port
    if (result.x < panelRect.x) {
      result.x = panelRect.x + _options.calloutPlacementOffset;
    }
    else if (result.right() > panelRect.right()) {
      result.x -= (result.right() - panelRect.right() + _options.calloutPlacementOffset);
    }

    if (result.y < panelRect.y) {
      result.y = panelRect.y + _options.calloutPlacementOffset;
    }
    else if (result.bottom() > panelRect.bottom()) {
      result.y -= (result.bottom() - panelRect.bottom() + _options.calloutPlacementOffset);
    }

    return result;
  }

  return {
    process: process
  };
}

function DrawTreeItemsTask(getGraphics, createTransformTask, applyLayoutChangesTask, scaleOptionTask,
  itemsSizesOptionTask,
  combinedContextsTask,
  alignDiagramTask, centerOnCursorTask,
  itemTemplateParamsTask,
  cursorItemTask, selectedItemsTask,
  groupTitleTemplateTask, checkBoxTemplateTask, buttonsTemplateTask) {

  var _positions,
    _graphics,
    _transform,
    _itemsSizesOptions,

    _buttonsTemplate,
    _checkBoxTemplate,
    _groupTitleTemplate;

  function process() {
    _graphics = getGraphics();

    _itemsSizesOptions = itemsSizesOptionTask.getOptions();
    _positions = alignDiagramTask.getItemsPositions();
    _transform = createTransformTask.getTransform();

    _buttonsTemplate = buttonsTemplateTask.getTemplate();
    _checkBoxTemplate = checkBoxTemplateTask.getTemplate();
    _groupTitleTemplate = groupTitleTemplateTask.getTemplate();

    _graphics.reset("bp-placeholder", Layers.Item);
    _graphics.reset("bp-placeholder", Layers.Controls);

    redrawTreeItems();

    return false;
  }

  function redrawTreeItems() {
    var uiHash,
      cursorItemId = cursorItemTask.getCursorTreeItem(),
      treeItemPosition,
      actualPosition,
      viewPortPosition = getViewPortPosition();

    for (var treeItemId in _positions) {
      if (_positions.hasOwnProperty(treeItemId)) {
        treeItemPosition = _positions[treeItemId],
        actualPosition = treeItemPosition.actualPosition;
        if (treeItemPosition.actualVisibility == Visibility.Normal) {
          _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
            this, function (x, y, width, height) {
              var nodePosition = new Rect(x, y, width, height);
              if (viewPortPosition == null || viewPortPosition.overlaps(nodePosition)) {
                var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId);
                if(templateParams != null) {
                  var template = templateParams.template;

                  uiHash = new RenderEventArgs();
                  uiHash.id = treeItemId;
                  uiHash.context = combinedContextsTask.getConfig(treeItemId);
                  uiHash.isCursor = (treeItemId == cursorItemId);
                  uiHash.isSelected = selectedItemsTask.isSelected(treeItemId);
                  uiHash.templateName = template.templateConfig.name;

                  uiHash.template = templateParams.template;
                  uiHash.isActive = templateParams.isActive;
                  uiHash.hasSelectorCheckbox = templateParams.hasSelectorCheckbox;
                  uiHash.hasButtons = templateParams.hasButtons;
                  uiHash.hasGroupTitle = templateParams.hasGroupTitle;
                  uiHash.onButtonsRender = templateParams.onButtonsRender;

                  _graphics.activate("bp-placeholder", Layers.Item);
                  _graphics.template(
                    x
                    , y
                    , width
                    , height
                    , treeItemPosition.contentPosition.x
                    , treeItemPosition.contentPosition.y
                    , treeItemPosition.contentPosition.width
                    , treeItemPosition.contentPosition.height
                    , template.itemTemplate.template()
                    , template.itemTemplate.getHashCode()
                    , template.itemTemplate.render
                    , uiHash
                    , { "borderWidth": template.templateConfig.itemBorderWidth }
                  );

                  if (templateParams.hasGroupTitle) {
                    var groupTitlePosition = 0;
                    switch (_itemsSizesOptions.groupTitlePlacementType) {
                      case AdviserPlacementType.Left:
                      case AdviserPlacementType.Auto:
                        groupTitlePosition = 2;
                        break;
                      case AdviserPlacementType.Right:
                        groupTitlePosition = width - (_itemsSizesOptions.groupTitlePanelSize - 4);
                        break;
                    }
                    _graphics.template(
                      x,
                      y,
                      width,
                      height,
                      groupTitlePosition,
                      treeItemPosition.contentPosition.y,
                      _itemsSizesOptions.groupTitlePanelSize - 4,
                      treeItemPosition.contentPosition.height + 2,
                      _groupTitleTemplate.template(),
                      _groupTitleTemplate.getHashCode(),
                      _groupTitleTemplate.render,
                      uiHash,
                      null
                    );
                  }
                  if (templateParams.hasSelectorCheckbox) {
                    _graphics.activate("bp-placeholder", Layers.Controls);
                    _graphics.template(
                      x,
                      y,
                      width,
                      height,
                      treeItemPosition.contentPosition.x,
                      height - (_itemsSizesOptions.checkBoxPanelSize - 4),
                      treeItemPosition.contentPosition.width,
                      _itemsSizesOptions.checkBoxPanelSize - 4,
                      _checkBoxTemplate.template(),
                      _checkBoxTemplate.getHashCode(),
                      _checkBoxTemplate.render,
                      uiHash,
                      null
                    );
                  }
                  if (templateParams.hasButtons) {
                    _graphics.activate("bp-placeholder", Layers.Controls);
                    var buttonsPanelPosition = 0;
                    switch (_itemsSizesOptions.groupTitlePlacementType) {
                      case AdviserPlacementType.Left:
                      case AdviserPlacementType.Auto:
                        buttonsPanelPosition = width - (_itemsSizesOptions.buttonsPanelSize - 4);
                        break;
                      case AdviserPlacementType.Right:
                        buttonsPanelPosition = 2;
                        break;
                    }
                    _graphics.template(
                      x,
                      y,
                      width,
                      height,
                      buttonsPanelPosition,
                      treeItemPosition.contentPosition.y,
                      _itemsSizesOptions.buttonsPanelSize - 4,
                      Math.max(treeItemPosition.contentPosition.height, height - treeItemPosition.contentPosition.y),
                      _buttonsTemplate.template(),
                      template.templateConfig.name + _buttonsTemplate.getHashCode(),
                      _buttonsTemplate.render,
                      uiHash,
                      null
                    );
                  }
                }
              }
            });//ignore jslint
        }
      }
    }
  }

  function getViewPortPosition() {
    var result = null;
    if (centerOnCursorTask != null) {
      var scaleOptions = scaleOptionTask.getOptions(),
        scale = scaleOptions.scale,
        placeholderOffset = new Point(centerOnCursorTask.getPlaceholderOffset()),
        panelSize = new Rect(alignDiagramTask.getContentSize()),
        optimalPanelSize = new Size(applyLayoutChangesTask.getOptimalPanelSize());

      placeholderOffset.scale(1.0 / scale);
      optimalPanelSize.scale(1.0 / scale);

      result = new Rect(
        placeholderOffset.x,
        placeholderOffset.y,
        Math.min(optimalPanelSize.width, panelSize.width),
        Math.min(optimalPanelSize.height, panelSize.height)
      );
    }
    return result;
  }

  return {
    process: process
  };
}

function DotSegment(x, y, width, height, cornerRadius) {
  this.segmentType = SegmentType.Dot;

  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.cornerRadius = cornerRadius;
}

function DrawMinimizedItemsTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  minimizedItemsOptionTask, itemTemplateParamsTask, alignDiagramTask) {
  var _graphics,
    _transform,
    _options,
    _positions;

  function process() {

    _graphics = getGraphics();

    _transform = createTransformTask.getTransform();
    _options = minimizedItemsOptionTask.getOptions();
    _positions = alignDiagramTask.getItemsPositions();

    _graphics.reset("bp-placeholder", Layers.Marker);

    drawMinimizedItems();

    return false;
  }

  function drawMinimizedItems() {
    var markers = new PolylinesBuffer(),
      polyline,
      marker = new Marker(),
      itemTitleColor,
      itemFillColor,
      minimizedItemShapeType,
      minimizedItemCornerRadius,
      treeItemPosition,
      actualPosition,
      minimizedItemsOptions,
      templateParams,
      templateConfig;

    for (var treeItemId in _positions) {
      if (_positions.hasOwnProperty(treeItemId)) {
        treeItemPosition = _positions[treeItemId],
          actualPosition = treeItemPosition.actualPosition,
          minimizedItemsOptions = minimizedItemsOptionTask.getItemOptions(treeItemId);

        _transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
          this, function (x, y, width, height) {
            switch (treeItemPosition.actualVisibility) {
              case Visibility.Dot:
                templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId);
                templateConfig = templateParams.template.templateConfig;

                itemTitleColor = null;
                itemFillColor = null;
                minimizedItemShapeType = null;
                minimizedItemCornerRadius = 0;

                /* use individual item options first */
                if (minimizedItemsOptions != null) {
                  itemTitleColor = minimizedItemsOptions.itemTitleColor;
                  itemFillColor = minimizedItemsOptions.itemTitleColor;
                  minimizedItemShapeType = minimizedItemsOptions.minimizedItemShapeType;
                }

                /* use template config & control options next */
                itemTitleColor = itemTitleColor || templateConfig.minimizedItemBorderColor || Colors.Navy;
                itemFillColor = itemFillColor || templateConfig.minimizedItemFillColor || Colors.Navy;
                if (minimizedItemShapeType == null) {
                  minimizedItemShapeType = (templateConfig.minimizedItemShapeType !== null ? templateConfig.minimizedItemShapeType : _options.minimizedItemShapeType);
                }
                minimizedItemCornerRadius = templateConfig.minimizedItemCornerRadius === null ? templateConfig.minimizedItemSize.width : templateConfig.minimizedItemCornerRadius;

                if (minimizedItemShapeType == null || minimizedItemShapeType == ShapeType.None) {
                  polyline = markers.getPolyline(new PaletteItem({
                    'lineColor': itemTitleColor,
                    'lineWidth': templateConfig.minimizedItemLineWidth,
                    'lineType': templateConfig.minimizedItemLineType,
                    'fillColor': itemFillColor,
                    'opacity': templateConfig.minimizedItemOpacity
                  }));
                  polyline.addSegment(new DotSegment(x, y, width, height, minimizedItemCornerRadius));
                } else {
                  marker.draw(markers, minimizedItemShapeType, new Rect(x, y, width, height),
                    new PaletteItem({
                      'lineColor': itemTitleColor,
                      'lineWidth': templateConfig.minimizedItemLineWidth,
                      'lineType': templateConfig.minimizedItemLineType,
                      'fillColor': itemFillColor,
                      'opacity': templateConfig.minimizedItemOpacity
                    })
                  );
                }
                break;
              case Visibility.Invisible:
                break;                
            }
          });//ignore jslint
      }
    }


    _graphics.activate("bp-placeholder", Layers.Marker);
    _graphics.polylinesBuffer(markers);
  }

  return {
    process: process
  };
}

function DrawConnectorsTask(getGraphics, connectionsGraphTask, connectorsOptionTask, showElbowDots, paletteManagerTask) {
  function process() {
    var graphics = getGraphics();
    var graph = connectionsGraphTask.getGraph();
    var connectorsOptions = connectorsOptionTask.getOptions();
    var paletteManager = paletteManagerTask.getPaletteManager();

    graphics.reset("bp-placeholder", Layers.Connector);
    graphics.activate("bp-placeholder", Layers.Connector);

    var buffer = new PolylinesBuffer();

    var elbowDotRadius = Math.round(connectorsOptions.elbowDotSize / 2);

    var processed = {};
    var processedDots = {};
    graph.loopNodes(this, null, function (itemid) {
      graph.loopNodeEdges(this, itemid, function (to, connectorEdge) {
        if (!processed.hasOwnProperty(to)) {
          var paletteItem = null;
          if (connectorEdge.fromOffset <= 1) {
            paletteItem = paletteManager.getPalette(ConnectorStyleType.Regular);
          } else {
            paletteManager.selectPalette(connectorEdge.fromOffset);
            paletteItem = paletteManager.getPalette(ConnectorStyleType.Extra);
          }
          var polyline = buffer.getPolyline(paletteItem);

          /* draw intersection dots */
          if (showElbowDots && connectorEdge.dotId != null && connectorsOptions.elbowType != ElbowType.None && !processedDots.hasOwnProperty(connectorEdge.dotId)) {
            var dotPolyline = buffer.getPolyline(polyline.arrowPaletteItem);
            var dotPoint = (connectorEdge.dotId == connectorEdge.from) ? connectorEdge.polyline.getStartPoint() : connectorEdge.polyline.getEndPoint();
            dotPolyline.addSegment(new DotSegment(dotPoint.x - elbowDotRadius, dotPoint.y - elbowDotRadius, elbowDotRadius * 2, elbowDotRadius * 2, elbowDotRadius));
            processedDots[connectorEdge.dotId] = true;
          }

          var arrowId = null;

          if (connectorEdge.hasArrow) {
            switch (connectorsOptions.arrowsDirection) {
              case GroupByType.Parents:
                arrowId = !connectorEdge.isOppositeFlow ? connectorEdge.parentsArrowId : connectorEdge.childrenArrowId;
                break;
              case GroupByType.Children:
                arrowId = !connectorEdge.isOppositeFlow ? connectorEdge.childrenArrowId : connectorEdge.parentsArrowId;
                break;
            }
          }

          if (arrowId == null) {
            var newSegment = connectorEdge.polyline.clone();

            if (connectorEdge.hasMiddle && connectorsOptions.arrowsDirection != GroupByType.None) {
              var isForward = true;
              if (connectorEdge.from == connectorEdge.middleParent) {
                isForward = (connectorsOptions.arrowsDirection == GroupByType.Children);
              } else {
                isForward = (connectorsOptions.arrowsDirection == GroupByType.Parents);
              }
              if (connectorEdge.isOppositeFlow) {
                isForward = !isForward;
              }
              newSegment.addOffsetArrow(isForward, connectorsOptions.linesWidth, 0.4, connectorsOptions.extraArrowsMinimumSpace, function (arrowPolyline) {
                arrowPolyline.mergeTo(buffer.getPolyline(polyline.arrowPaletteItem));
              }); //ignore jslint
            }

            if (connectorEdge.from == itemid) {
              newSegment.mergeTo(polyline);
            } else {
              polyline.addInverted(newSegment);
            }
          } else {
            if (arrowId == connectorEdge.to) {
              connectorEdge.polyline.clone().mergeTo(polyline);
            } else {
              polyline.addInverted(connectorEdge.polyline.clone());
            }
            polyline.addArrow(connectorsOptions.linesWidth, function (arrowPolyline) {
              arrowPolyline.mergeTo(buffer.getPolyline(arrowPolyline.paletteItem));
            }); //ignore jslint
          }
        }
      });
      processed[itemid] = true;
    });

    graphics.polylinesBuffer(buffer);

    return false;
  }

  return {
    process: process
  };
}

function Label() {
  this.text = null;
  this.position = null; // Rect
  this.weight = 0;

  this.isActive = true;
  this.labelType = LabelType.Regular;

  this.labelOrientation = TextOrientationType.Horizontal;
  this.horizontalAlignmentType = HorizontalAlignmentType.Center;
  this.verticalAlignmentType = VerticalAlignmentType.Bottom;

  this.parent = Rect.prototype;
  this.parent.constructor.apply(this, arguments);
}
Label.prototype = new Rect();

function DrawItemLabelsTask(getGraphics, createTransformTask, applyLayoutChangesTask,
  labelsOptionTask,
  alignDiagramTask) {

  function process() {
    var labelsOption = labelsOptionTask.getOptions();

    var params = {
      graphics: getGraphics(),
      transform: createTransformTask.getTransform(),
      treeItemsPositions: alignDiagramTask.getItemsPositions()
    };

    var options = {
      showLabels: labelsOption.showLabels,
      labelFontSize: labelsOption.labelFontSize,
      labelFontFamily: labelsOption.labelFontFamily,
      labelFontStyle: labelsOption.labelFontStyle,
      labelFontWeight: labelsOption.labelFontWeight,
      labelColor: labelsOption.labelColor,
      itemsOptions: labelsOptionTask.getItemsOptions(),
      labelSize: labelsOption.labelSize,
      labelOrientation: labelsOption.labelOrientation,
      labelPlacement: labelsOption.labelPlacement,
      labelOffset: labelsOption.labelOffset
    };

    params.graphics.reset("bp-placeholder", Layers.Label);

    redrawLabels(params, options);

    return false;
  }

  function redrawLabels(params, options) {
    var labels = [];
    if (options.showLabels == Enabled.Auto || options.showLabels == Enabled.True) {
      for (var treeItemId in params.treeItemsPositions) {
        if (params.treeItemsPositions.hasOwnProperty(treeItemId)) {
          var labelOptions = options.itemsOptions[treeItemId],
            treeItemPosition = params.treeItemsPositions[treeItemId],
            actualPosition = treeItemPosition.actualPosition;

          if (labelOptions != null) {
            params.transform.transformRect(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, true,
              this, function (x, y, width, height) {

                switch (treeItemPosition.actualVisibility) {
                  case Visibility.Normal:
                    if (options.showLabels == Enabled.Auto) {
                      // Don't allow labels overlap normal items in Auto mode
                      label = new Label(x, y, width, height);
                      label.weight = 10000;
                      label.labelType = LabelType.Dummy;
                      labels.push(label);
                    }
                    break;
                  case Visibility.Dot:
                  case Visibility.Line:
                    var label = createLabel(x, y, width, height, labelOptions, treeItemPosition, options);
                    if (label != null) {
                      labels.push(label);
                    }
                    break;
                }
              });//ignore jslint
          }
        }
      }
    }

    /* Auto resolve overllapings between nodes */
    if (options.showLabels == Enabled.Auto) {
      getCrossingRectangles(this, labels, function (label1, label2) {
        if (label1.isActive && label2.isActive) {
          switch (label1.labelType) {
            case LabelType.Dummy:
              switch (label2.labelType) {
                case LabelType.Dummy:
                  break;
                case LabelType.Regular:
                  label2.isActive = false;
                  break;
                case LabelType.Fixed:
                  label2.isActive = false;
                  break;
              }
              break;
            case LabelType.Fixed:
              switch (label2.labelType) {
                case LabelType.Dummy:
                  label1.isActive = false;
                  break;
                case LabelType.Regular:
                  label2.isActive = false;
                  break;
                case LabelType.Fixed:
                  break;
              }
              break;
            case LabelType.Regular:
              switch (label2.labelType) {
                case LabelType.Dummy:
                  label1.isActive = false;
                  break;
                case LabelType.Regular:
                  if (label1.weight <= label2.weight) {
                    label1.isActive = false;
                  } else {
                    label2.isActive = false;
                  }
                  break;
                case LabelType.Fixed:
                  label1.isActive = false;
                  break;
              }
              break;
          }
        }
      });
    }

    /* Draw labels */
    params.graphics.activate("bp-placeholder", Layers.Label);
    var attr = {
      "fontSize": options.labelFontSize,
      "fontFamily": options.labelFontFamily,
      "fontStyle": options.labelFontStyle,
      "fontWeight": options.labelFontWeight,
      "fontColor": options.labelColor
    };

    for (var index = 0, len = labels.length; index < len; index += 1) {
      var label = labels[index];
      if (label.isActive) {
        switch (label.labelType) {
          case LabelType.Regular:
          case LabelType.Fixed:
            params.graphics.text(label.x, label.y, label.width, label.height, label.text,
              label.labelOrientation,
              label.horizontalAlignmentType,
              label.verticalAlignmentType,
              attr);
            break;
        }
      }
    }
  }

  function createLabel(x, y, width, height, labelOptions, treeItemPosition, options) {
    var result = null,
      labelWidth,
      labelHeight,
      labelSize,
      labelPlacement,
      weight;


    if (!isNullOrEmpty(labelOptions.label)) {
      var labelType = getLabelType(treeItemPosition.actualVisibility, labelOptions.showLabel, options.showLabels);

      switch (labelType) {
        case LabelType.Regular:
          weight = treeItemPosition.actualSize.width + treeItemPosition.actualSize.height;
          break;
        case LabelType.Fixed:
          weight = 10000;
          break;
        case LabelType.None:
          weight = 0;
          break;
      }

      if (labelType != LabelType.None) {
        labelSize = (labelOptions.labelSize != null) ? labelOptions.labelSize : options.labelSize;

        var labelOrientation = (labelOptions.labelOrientation != TextOrientationType.Auto) ? labelOptions.labelOrientation :
          (options.labelOrientation != TextOrientationType.Auto) ? options.labelOrientation :
            TextOrientationType.Horizontal;

        labelPlacement = (labelOptions.labelPlacement != PlacementType.Auto) ? labelOptions.labelPlacement :
          (options.labelPlacement != PlacementType.Auto) ? options.labelPlacement :
            PlacementType.Top;

        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            labelWidth = labelSize.width;
            labelHeight = labelSize.height;
            break;
          case TextOrientationType.RotateLeft:
          case TextOrientationType.RotateRight:
            labelHeight = labelSize.width;
            labelWidth = labelSize.height;
            break;
        }

        var position = getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, options.labelOffset);

        result = new Label(position.position);
        result.labelType = labelType;
        result.weight = weight;
        result.text = labelOptions.label;


        result.labelOrientation = labelOrientation;
        result.horizontalAlignmentType = position.horizontalAlignmentType;
        result.verticalAlignmentType = position.verticalAlignmentType;
      }
    }
    return result;
  }

  function getLabelType(actualVisibility, showLabel, showLabels) {
    var result = LabelType.None;
    switch (showLabel) {
      case Enabled.Auto:
        switch (showLabels) {
          case Enabled.Auto:
            switch (actualVisibility) {
              case Visibility.Line:
              case Visibility.Dot:
                result = LabelType.Regular;
                break;
            }
            break;
          case Enabled.False:
            break;
          case Enabled.True:
            result = LabelType.Fixed;
            break;
        }
        break;
      case Enabled.False:
        break;
      case Enabled.True:
        result = LabelType.Fixed;
        break;
    }
    return result;
  }

  function getLabelPosition(labelPlacement, labelOrientation, x, y, width, height, labelWidth, labelHeight, labelOffset) {
    var position,
      horizontalAlignmentType,
      verticalAlignmentType;

    switch (labelPlacement) {
      case PlacementType.Auto:
      case PlacementType.Top:
        position = new Rect(x + width / 2.0 - labelWidth / 2.0, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
        }
        break;
      case PlacementType.TopRight:
      case PlacementType.RightTop:
        position = new Rect(x + width + labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case PlacementType.Right:
        position = new Rect(x + width + labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case PlacementType.BottomRight:
      case PlacementType.RightBottom:
        position = new Rect(x + width + labelOffset, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
        }
        break;
      case PlacementType.Bottom:
        position = new Rect(x + width / 2.0 - labelWidth / 2.0, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
        }
        break;
      case PlacementType.BottomLeft:
      case PlacementType.LeftBottom:
        position = new Rect(x - labelWidth - labelOffset, y + height + labelOffset, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
        }
        break;
      case PlacementType.Left:
        position = new Rect(x - labelWidth - labelOffset, y + height / 2.0 - labelHeight / 2.0, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Middle;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Center;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
        }
        break;
      case PlacementType.TopLeft:
      case PlacementType.LeftTop:
        position = new Rect(x - labelWidth - labelOffset, y - labelOffset - labelHeight, labelWidth, labelHeight);
        switch (labelOrientation) {
          case TextOrientationType.Horizontal:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateLeft:
            horizontalAlignmentType = HorizontalAlignmentType.Left;
            verticalAlignmentType = VerticalAlignmentType.Bottom;
            break;
          case TextOrientationType.RotateRight:
            horizontalAlignmentType = HorizontalAlignmentType.Right;
            verticalAlignmentType = VerticalAlignmentType.Top;
            break;
        }
        break;
    }

    return {
      position: position,
      horizontalAlignmentType: horizontalAlignmentType,
      verticalAlignmentType: verticalAlignmentType
    };
  }

  return {
    process: process
  };
}

function DrawFrameItemsTask(getGraphics, applyLayoutChangesTask, projectItemsToFrameTask, itemTemplateParamsTask, minimizedItemsOptionTask) {

  var _graphics;

  function process() {
    var frameThickness = new Thickness(applyLayoutChangesTask.getFrameThickness());

    _graphics = getGraphics();
    _graphics.reset("frameplaceholder", Layers.Marker);

    if(!frameThickness.isEmpty()) {
      drawFrameItems();
    }
    return false;
  }

  function drawFrameItems() {
    var markers = new PolylinesBuffer(),
      positions = projectItemsToFrameTask.getPositions(),
      options = minimizedItemsOptionTask.getOptions(),
      marker = new Marker(),
      polyline;

    for (var treeItemId in positions) {
      if(positions.hasOwnProperty(treeItemId)) {
        var actualPosition = positions[treeItemId],
          templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
          templateConfig = templateParams.template.templateConfig,
          minimizedItemsOptions = minimizedItemsOptionTask.getItemOptions(treeItemId),
          itemTitleColor = null,
          itemFillColor = null,
          minimizedItemShapeType = null,
          minimizedItemCornerRadius = 0;

        /* use individual item options first */
        if (minimizedItemsOptions != null) {
          itemTitleColor = minimizedItemsOptions.itemTitleColor;
          itemFillColor = minimizedItemsOptions.itemTitleColor;
          minimizedItemShapeType = minimizedItemsOptions.minimizedItemShapeType;
        }

        /* use template config & control options next */
        itemTitleColor = itemTitleColor || templateConfig.minimizedItemBorderColor || Colors.Navy;
        itemFillColor = itemFillColor || templateConfig.minimizedItemFillColor || Colors.Navy;
        if (minimizedItemShapeType == null) {
          minimizedItemShapeType = (templateConfig.minimizedItemShapeType !== null ? templateConfig.minimizedItemShapeType : options.minimizedItemShapeType);
        }
        minimizedItemCornerRadius = templateConfig.minimizedItemCornerRadius === null ? templateConfig.minimizedItemSize.width : templateConfig.minimizedItemCornerRadius;

        if (minimizedItemShapeType == null || minimizedItemShapeType == ShapeType.None) {
          polyline = markers.getPolyline(new PaletteItem({
            'lineColor': itemTitleColor,
            'lineWidth': templateConfig.minimizedItemLineWidth,
            'lineType': templateConfig.minimizedItemLineType,
            'fillColor': itemFillColor,
            'opacity': templateConfig.minimizedItemOpacity
          }));
          polyline.addSegment(new DotSegment(actualPosition.x, actualPosition.y, actualPosition.width, actualPosition.height, minimizedItemCornerRadius));
        } else {
          marker.draw(markers, minimizedItemShapeType, actualPosition,
            new PaletteItem({
              'lineColor': itemTitleColor,
              'lineWidth': templateConfig.minimizedItemLineWidth,
              'lineType': templateConfig.minimizedItemLineType,
              'fillColor': itemFillColor,
              'opacity': templateConfig.minimizedItemOpacity
            })
          );
        }
      }
    }
    _graphics.activate("frameplaceholder", Layers.Marker);
    _graphics.polylinesBuffer(markers);
  }

  return {
    process: process
  };
}

function DrawFrameHighlightTask(getGraphics, projectItemsToFrameTask,
  combinedContextsTask,
  itemTemplateParamsTask,
  highlightItemTask, cursorItemTask) {
  var _graphics;

  function process() {
    var treeItemId = highlightItemTask.getHighlightTreeItem();

    _graphics = getGraphics();
    _graphics.reset("frameplaceholder", Layers.Highlight);

    if (treeItemId != null) {
      drawHighlight(treeItemId);
    }

    return false;
  }

  function drawHighlight(treeItemId) {
    var uiHash,
      positions = projectItemsToFrameTask.getPositions(),
      position = positions[treeItemId];
    if(position != null) {
      var templateParams = itemTemplateParamsTask.getTemplateParams(treeItemId),
        template = templateParams.template,
        templateConfig = template.templateConfig,
        highlightPadding = templateConfig.highlightPadding;

      _graphics.activate("frameplaceholder", Layers.Highlight);

      uiHash = new RenderEventArgs();
      uiHash.context = combinedContextsTask.getConfig(treeItemId);
      uiHash.isCursor = (cursorItemTask.getCursorTreeItem() == treeItemId);
      uiHash.isSelected = true;
      uiHash.templateName = templateConfig.name;

      var contentPosition = new Rect(0, 0, Math.round(position.width), Math.round(position.height));
      contentPosition.offset(highlightPadding.left, highlightPadding.top, highlightPadding.right, highlightPadding.bottom);

      _graphics.template(
        Math.round(position.x)
        , Math.round(position.y)
        , Math.round(position.width)
        , Math.round(position.height)
        , Math.round(contentPosition.x)
        , Math.round(contentPosition.y)
        , Math.round(contentPosition.width)
        , Math.round(contentPosition.height)
        , template.dotHighlightTemplate.template()
        , template.dotHighlightTemplate.getHashCode()
        , template.dotHighlightTemplate.render
        , uiHash
        , { "borderWidth": templateConfig.highlightBorderWidth }
      );
    }
  }

  return {
    process: process
  };
}

function DrawLevelAnnotationTitlesTask(getGraphics, verticalOffsetTask, createTransformTask, applyLayoutChangesTask, 
  levelAnnotationOptionTask, mergeLevelIntervalsTask, levelAnnotationTemplateTask, levelTitlePlacementOptionTask) {
  var _graphics,
    _positions,
    _transform,
    _template;

  function process() {
    var annotations = levelAnnotationOptionTask.getAnnotations();

    _graphics = getGraphics();
    _graphics.reset("titlesplaceholder", Layers.LevelAnnotation);

    if (annotations.length > 0) {
      _positions = mergeLevelIntervalsTask.getPositions();
      _transform = createTransformTask.getTransform();
      _template = levelAnnotationTemplateTask.getTitleTemplate();

      drawAnnotations(annotations, _positions);
    }

    return false;
  }

  function drawAnnotations(annotations, positions) {
    var verticalOffset = new Interval(verticalOffsetTask.getVerticalOffset()),
    { levelTitlePanelSize } = levelTitlePlacementOptionTask.getOptions();

    _graphics.activate("titlesplaceholder", Layers.LevelAnnotation);

    var transformedVerticalOffset;
    _transform.transformRect(0, verticalOffset.from, 0, verticalOffset.width(), true,
      this, function (x, y, width, height) {
        transformedVerticalOffset = new Rect(x, y, width, height);
      });

    for (var index = 0, len = annotations.length; index < len; index += 1) {
      var annotationConfig = annotations[index];
      var intervals = positions[index];
      if (intervals != null) {
        for (var index3 = 0, len3 = intervals.length; index3 < len3; index3 += 1) {
          var interval = intervals[index3];

          var position = new Rect(0, interval.from, levelTitlePanelSize, interval.width());
          var verticalInterval = position.verticalInterval();

          if(verticalInterval.overlaps(verticalOffset)) {
            var offset = new Thickness(0, annotationConfig.offset.top, 0, annotationConfig.offset.bottom);
            position.offset(offset);

            var uiHash = new RenderEventArgs();
            uiHash.context = annotationConfig;
      
            _transform.transformRect(position.x, position.y, position.width, position.height, true,
              this, function (x, y, width, height) {
                _graphics.template(
                  x - transformedVerticalOffset.x
                  , y - transformedVerticalOffset.y
                  , width
                  , height
                  , 0
                  , 0
                  , width
                  , height
                  , _template.template()
                  , _template.getHashCode()
                  , _template.render
                  , uiHash
                  , null
                );
              });
          }
        }
      }
    }
  }

  return {
    process: process
  };
}

function DrawLevelAnnotationBackgroundTask(getGraphics, verticalOffsetTask, createTransformTask, applyLayoutChangesTask, 
  levelAnnotationOptionTask, mergeLevelIntervalsTask, levelAnnotationTemplateTask) {
  var _graphics,
    _positions,
    _transform,
    _backgroundTemplate;

  function process() {
    var annotations = levelAnnotationOptionTask.getAnnotations();

    _graphics = getGraphics();
    _graphics.reset("bp-placeholder", Layers.LevelAnnotation);

    if (annotations.length > 0) {
      _positions = mergeLevelIntervalsTask.getPositions();
      _transform = createTransformTask.getTransform();
      _backgroundTemplate = levelAnnotationTemplateTask.getBackgroundTemplate();

      drawAnnotations(annotations, _positions);
    }

    return false;
  }

  function drawAnnotations(annotations, positions) {
    var verticalOffset = new Interval(verticalOffsetTask.getVerticalOffset()),
      panel = _graphics.activate("bp-placeholder", Layers.LevelAnnotation),
      panelRect;

    _transform.transformRect(0, 0, panel.size.width, panel.size.height, false,
      this, function (x, y, width, height) {
        panelRect = new Rect(x, y, width, height);
      });

      
    for (var index = 0, len = annotations.length; index < len; index += 1) {
      var annotationConfig = annotations[index];
      var lineWidth = _transform.transformThickness(annotationConfig.lineWidth, true);
      var intervals = positions[index];
      if (intervals != null) {
        for (var index3 = 0, len3 = intervals.length; index3 < len3; index3 += 1) {
          var interval = intervals[index3];

          var position = new Rect(0, interval.from, panelRect.width, interval.width());
          position.offset(annotationConfig.offset);

          var verticalInterval = position.verticalInterval();
          if(verticalInterval.overlaps(verticalOffset)) {
            var uiHash = new RenderEventArgs();
            uiHash.context = annotationConfig;
            mergeObjects(uiHash.context, { lineWidth });
    
            _transform.transformRect(position.x, position.y, position.width, position.height, true,
              this, function (x, y, width, height) {
                _graphics.template(
                  x
                  , y
                  , width
                  , height
                  , 0
                  , 0
                  , width
                  , height
                  , _backgroundTemplate.template()
                  , _backgroundTemplate.getHashCode()
                  , _backgroundTemplate.render
                  , uiHash
                  , null
                );
              });
          }
        }
      }
    }
  }

  return {
    process: process
  };
}

function TaskManagerFactory(getOptions, getGraphics, getLayout, setLayout, templates) {
  var tasks = new TaskManager();

  // Dependencies
  tasks.addDependency('options', getOptions);
  tasks.addDependency('graphics', getGraphics);
  tasks.addDependency('getLayout', getLayout);
  tasks.addDependency('setLayout', setLayout);
  tasks.addDependency('templates', templates);

  tasks.addDependency('defaultConfig', new OrgConfig());
  tasks.addDependency('defaultItemConfig', new OrgItemConfig());
  tasks.addDependency('defaultTemplateConfig', new TemplateConfig());
  
  tasks.addDependency('defaultBackgroundAnnotationConfig', new BackgroundAnnotationConfig());
  tasks.addDependency('defaultConnectorAnnotationConfig', new ConnectorAnnotationConfig());
  tasks.addDependency('defaultHighlightPathAnnotationConfig', new HighlightPathAnnotationConfig());
  tasks.addDependency('defaultShapeAnnotationConfig', new ShapeAnnotationConfig());
  tasks.addDependency('defaultLevelAnnotationConfig', new LevelAnnotationConfig());

  tasks.addDependency('showElbowDots', false);
  tasks.addDependency('null', null);
  tasks.addDependency('foreground', ZOrderType.Foreground);
  tasks.addDependency('background', ZOrderType.Background);

  // Options
  tasks.addTask('OptionsTask', ['options'], OptionsTask, Colors.Black);
  tasks.addTask('CalloutOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], CalloutOptionTask, Colors.Navy);
  tasks.addTask('ConnectorsOptionTask', ['OptionsTask', 'defaultConfig'], ConnectorsOptionTask, Colors.Navy);
  tasks.addTask('ItemsOptionTask', ['OptionsTask', 'defaultItemConfig'], OrgItemsOptionTask, Colors.Navy);
  tasks.addTask('ItemsContentOptionTask', ['OptionsTask', 'defaultItemConfig'], ItemsContentOptionTask, Colors.Navy);
  tasks.addTask('ItemsSizesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], ItemsSizesOptionTask, Colors.Navy);
  tasks.addTask('MinimumVisibleLevelsOptionTask', ['OptionsTask', 'defaultConfig'], MinimumVisibleLevelsOptionTask, Colors.Navy);  
  tasks.addTask('LabelsOptionTask', ['OptionsTask', 'defaultConfig', 'defaultItemConfig'], LabelsOptionTask, Colors.Navy);
  tasks.addTask('TemplatesOptionTask', ['OptionsTask', 'defaultConfig', 'defaultTemplateConfig'], TemplatesOptionTask, Colors.Navy);
  tasks.addTask('OrientationOptionTask', ['OptionsTask', 'defaultConfig'], OrientationOptionTask, Colors.Navy);
  tasks.addTask('VisualTreeOptionTask', ['OptionsTask', 'defaultConfig'], OrgVisualTreeOptionTask, Colors.Navy);
  tasks.addTask('MinimizedItemsOptionTask', ['OptionsTask'], MinimizedItemsOptionTask, Colors.Navy);

  tasks.addTask('CursorItemOptionTask', ['OptionsTask', 'defaultConfig'], CursorItemOptionTask, Colors.Navy);
  tasks.addTask('HighlightItemOptionTask', ['OptionsTask', 'defaultConfig'], HighlightItemOptionTask, Colors.Navy);
  tasks.addTask('SelectedItemsOptionTask', ['OptionsTask'], SelectedItemsOptionTask, Colors.Navy);
  tasks.addTask('CursorSelectionPathModeOptionTask', ['OptionsTask', 'defaultConfig'], CursorSelectionPathModeOptionTask, Colors.Navy);

  tasks.addTask('SplitAnnotationsOptionTask', ['OptionsTask'], SplitAnnotationsOptionTask, Colors.Cyan);

  tasks.addTask('ForegroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'foreground'], ShapeAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundShapeAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultShapeAnnotationConfig', 'background'], ShapeAnnotationOptionTask, Colors.Navy);
  tasks.addTask('ForegroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'foreground'], HighlightPathAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundHighlightPathAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultHighlightPathAnnotationConfig', 'background'], HighlightPathAnnotationOptionTask, Colors.Navy);
  tasks.addTask('ForegroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'foreground'], ConnectorAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundConnectorAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultConnectorAnnotationConfig', 'background'], ConnectorAnnotationOptionTask, Colors.Navy);
  tasks.addTask('BackgroundAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultBackgroundAnnotationConfig'], BackgroundAnnotationOptionTask, Colors.Navy);
  tasks.addTask('LevelAnnotationOptionTask', ['SplitAnnotationsOptionTask', 'defaultLevelAnnotationConfig'], LevelAnnotationOptionTask, Colors.Navy);

  tasks.addTask('ScaleOptionTask', ['OptionsTask', 'defaultConfig'], ScaleOptionTask, Colors.Navy);
  tasks.addTask('FrameOptionTask', ['OptionsTask', 'defaultConfig'], FrameOptionTask, Colors.Navy);
  tasks.addTask('LevelTitlePlacementOptionTask', ['OptionsTask', 'defaultConfig'], LevelTitlePlacementOptionTask, Colors.Navy);
  tasks.addTask('LevelTitleTemplateOptionTask', ['OptionsTask', 'defaultConfig'], LevelTitleTemplateOptionTask, Colors.Navy);

  // Transformations
  tasks.addTask('CombinedContextsTask', ['ItemsContentOptionTask'], CombinedContextsTask, Colors.Cyan);
  tasks.addTask('OrgTreeTask', ['ItemsOptionTask'], OrgTreeTask, Colors.Red);

  // Transformations / Templates
  tasks.addTask('ReadTemplatesTask', ['TemplatesOptionTask', 'templates'], ReadTemplatesTask, Colors.Cyan);
  tasks.addTask('ActiveItemsTask', ['ItemsSizesOptionTask', 'ReadTemplatesTask'], ActiveItemsTask, Colors.Cyan);
  tasks.addTask('ItemTemplateParamsTask', ['ItemsSizesOptionTask', 'CursorItemOptionTask', 'ReadTemplatesTask'], ItemTemplateParamsTask, Colors.Cyan);

  tasks.addTask('GroupTitleTemplateTask', ['TemplatesOptionTask', 'templates'], GroupTitleTemplateTask, Colors.Cyan);
  tasks.addTask('CheckBoxTemplateTask', ['ItemsSizesOptionTask', 'templates'], CheckBoxTemplateTask, Colors.Cyan);
  tasks.addTask('ButtonsTemplateTask', ['ItemsSizesOptionTask', 'templates'], ButtonsTemplateTask, Colors.Cyan);
  tasks.addTask('AnnotationLabelTemplateTask', ['ItemsOptionTask', 'templates'], AnnotationLabelTemplateTask, Colors.Cyan);
  tasks.addTask('LevelAnnotationTemplateTask', ['OrientationOptionTask', 'LevelTitleTemplateOptionTask', 'templates'], LevelAnnotationTemplateTask, Colors.Cyan);

  tasks.addTask('VisualTreeTask', ['OrgTreeTask', 'ActiveItemsTask', 'VisualTreeOptionTask'], VisualTreeTask, Colors.Red);
  tasks.addTask('VisualTreeLevelsTask', ['VisualTreeTask', 'ItemTemplateParamsTask'], VisualTreeLevelsTask, Colors.Red);
  tasks.addTask('ExtractNestedLayoutsTask', ['OptionsTask'], OrgExtractNestedLayoutsTask, Colors.Red);
  tasks.addTask('CreateLayoutsTreeTask', ['VisualTreeTask', 'VisualTreeLevelsTask', 'ExtractNestedLayoutsTask'], OrgCreateLayoutsTreeTask, Colors.Red);
  

  tasks.addTask('ConnectionsGraphTask', ['graphics', 'CreateTransformTask', 'ConnectorsOptionTask', 'VisualTreeLevelsTask', 'ExtractNestedLayoutsTask', 'AlignDiagramTask'], ConnectionsGraphTask, Colors.Cyan);

  // Transformations/Selections
  tasks.addTask('HighlightItemTask', ['HighlightItemOptionTask', 'ActiveItemsTask'], HighlightItemTask, Colors.Cyan);

  tasks.addTask('CursorItemTask', ['CursorItemOptionTask', 'ActiveItemsTask'], CursorItemTask, Colors.Cyan);
  tasks.addTask('CursorNeighboursTask', ['CursorItemTask', 'VisualTreeTask'], OrgCursorNeighboursTask, Colors.Cyan);
  tasks.addTask('SelectedItemsTask', ['SelectedItemsOptionTask', 'ItemsOptionTask'], SelectedItemsTask, Colors.Cyan);
  tasks.addTask('SelectionPathItemsTask', ['VisualTreeTask', 'CursorItemTask', 'SelectedItemsTask', 'CursorSelectionPathModeOptionTask'], OrgSelectionPathItemsTask, Colors.Cyan);

  tasks.addTask('NormalVisibilityItemsByForegroundShapeAnnotationTask', ['ForegroundShapeAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundShapeAnnotationTask', ['BackgroundShapeAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundAnnotationTask', ['BackgroundAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByForegroundHighlightPathAnnotationTask', ['ForegroundHighlightPathAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask', ['BackgroundHighlightPathAnnotationOptionTask'], NormalVisibilityItemsByAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByForegroundConnectorAnnotationTask', ['ForegroundConnectorAnnotationOptionTask'], NormalVisibilityItemsByConnectorAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByBackgroundConnectorAnnotationTask', ['BackgroundConnectorAnnotationOptionTask'], NormalVisibilityItemsByConnectorAnnotationTask, Colors.Cyan);
  tasks.addTask('NormalVisibilityItemsByMinimumVisibleLevelsTask', ['MinimumVisibleLevelsOptionTask', 'OrgTreeTask'], OrgNormalVisibilityItemsByMinimumVisibleLevelsTask, Colors.Cyan);
  
  tasks.addTask('CombinedNormalVisibilityItemsTask', [
    'ItemsSizesOptionTask',
    'CursorItemTask',
    'CursorNeighboursTask',
    'SelectedItemsTask',
    'SelectionPathItemsTask',
    'NormalVisibilityItemsByForegroundShapeAnnotationTask',
    'NormalVisibilityItemsByBackgroundShapeAnnotationTask',
    'NormalVisibilityItemsByBackgroundAnnotationTask',
    'NormalVisibilityItemsByForegroundHighlightPathAnnotationTask',
    'NormalVisibilityItemsByBackgroundHighlightPathAnnotationTask',
    'NormalVisibilityItemsByForegroundConnectorAnnotationTask',
    'NormalVisibilityItemsByBackgroundConnectorAnnotationTask',
    'NormalVisibilityItemsByMinimumVisibleLevelsTask'], CombinedNormalVisibilityItemsTask, Colors.Cyan);

  // Layout
  tasks.addTask('FrameSizeTask', ['FrameOptionTask', 'ReadTemplatesTask', 'ScaleOptionTask'], FrameSizeTask, Colors.Navy);
  tasks.addTask('LevelTitleSizeTask', ['LevelTitlePlacementOptionTask', 'LevelAnnotationOptionTask', 'OrientationOptionTask', 'ScaleOptionTask'], LevelTitleSizeTask, Colors.Navy);
  tasks.addTask('LayoutOptionsTask', ['getLayout', 'OptionsTask'], LayoutOptionsTask, Colors.Black);
  tasks.addTask('CurrentControlSizeTask', ['LayoutOptionsTask', 'ItemsSizesOptionTask', 'FrameSizeTask', 'LevelTitleSizeTask'], CurrentControlSizeTask, Colors.Black);
  tasks.addTask('CurrentScrollPositionTask', ['LayoutOptionsTask'], CurrentScrollPositionTask, Colors.Black);

  tasks.addTask('ItemsPositionsTask', ['CurrentControlSizeTask', 'ScaleOptionTask', 'OrientationOptionTask', 'ItemsSizesOptionTask', 'ConnectorsOptionTask', 'VisualTreeOptionTask',
    'CreateLayoutsTreeTask',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'CombinedNormalVisibilityItemsTask'], ItemsPositionsTask, Colors.Red);

  tasks.addTask('AlignDiagramTask', ['OrientationOptionTask', 'ItemsSizesOptionTask', 'VisualTreeOptionTask', 'ScaleOptionTask', 'CurrentControlSizeTask', 'ActiveItemsTask', 'ItemsPositionsTask'], AlignDiagramTask, Colors.Red);
  tasks.addTask('CreateTransformTask', ['OrientationOptionTask', 'ScaleOptionTask', 'AlignDiagramTask'], CreateTransformTask, Colors.Cyan);

  // Managers
  tasks.addTask('PaletteManagerTask', ['ConnectorsOptionTask', 'null'], PaletteManagerTask, Colors.Cyan);

  // Apply Layout Changes
  tasks.addTask('ApplyLayoutChangesTask', ['graphics', 'setLayout', 'ItemsSizesOptionTask', 'CurrentControlSizeTask', 'ScaleOptionTask', 'AlignDiagramTask', 'FrameSizeTask', 'LevelTitleSizeTask'], ApplyLayoutChangesTask, Colors.Green);
  tasks.addTask('CenterOnCursorTask', ['LayoutOptionsTask', 'ApplyLayoutChangesTask', 'CurrentScrollPositionTask', 'CursorItemTask', 'AlignDiagramTask', 'CreateTransformTask', 'ScaleOptionTask'], CenterOnCursorTask, Colors.Cyan);
  tasks.addTask('ProjectItemsToFrameTask', ['CreateTransformTask', 'FrameSizeTask',
    'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'ItemTemplateParamsTask',
    'SelectedItemsTask'], ProjectItemsToFrameTask, Colors.Green);

  tasks.addTask('ViewPortPlacementTask', ['ScaleOptionTask', 'CenterOnCursorTask', 'CreateTransformTask', 'ApplyLayoutChangesTask'], ViewPortPlacementTask, Colors.Green);  
  tasks.addTask('VerticalOffsetTask', ['ViewPortPlacementTask'], VerticalOffsetTask, Colors.Green);  

  tasks.addTask('LogicalLevelsPlacementTask', ['OrgTreeTask', 'VisualTreeTask', 'AlignDiagramTask'], OrgLogicalLevelsPlacementTask, Colors.Green);
  tasks.addTask('MergeLevelIntervalsTask', ['LevelAnnotationOptionTask', 'LogicalLevelsPlacementTask'], MergeLevelIntervalsTask, Colors.Green); 

  // Renders
  tasks.addTask('DrawBackgroundAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'BackgroundAnnotationOptionTask', 'VisualTreeTask', 'AlignDiagramTask'], DrawBackgroundAnnotationTask, Colors.Green);

  tasks.addTask('DrawBackgroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'ForegroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'foreground'], DrawHighlightPathAnnotationTask, Colors.Cyan);
  tasks.addTask('DrawForegroundHighlightPathAnnotationTask', ['graphics', 'ConnectorsOptionTask', 'BackgroundHighlightPathAnnotationOptionTask', 'ConnectionsGraphTask', 'background'], DrawHighlightPathAnnotationTask, Colors.Cyan);

  tasks.addTask('DrawForegroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], DrawConnectorAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundConnectorAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundConnectorAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], DrawConnectorAnnotationTask, Colors.Green);
  tasks.addTask('DrawForegroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'ForegroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'foreground'], DrawShapeAnnotationTask, Colors.Green);
  tasks.addTask('DrawBackgroundShapeAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'OrientationOptionTask', 'BackgroundShapeAnnotationOptionTask', 'AlignDiagramTask', 'AnnotationLabelTemplateTask', 'background'], DrawShapeAnnotationTask, Colors.Green);

  tasks.addTask('DrawCursorTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'CursorItemTask', 'SelectedItemsTask'], DrawCursorTask, Colors.Green);
  tasks.addTask('DrawHighlightTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'CombinedContextsTask', 'AlignDiagramTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask'], DrawHighlightTask, Colors.Green);
  tasks.addTask('DrawHighlightAnnotationTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask', 'CombinedContextsTask', 'CalloutOptionTask', 'ReadTemplatesTask', 'AlignDiagramTask', 'CenterOnCursorTask', 'HighlightItemTask', 'CursorItemTask', 'SelectedItemsTask', 'FrameSizeTask'], DrawHighlightAnnotationTask, Colors.Green);

  tasks.addTask('DrawTreeItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'ScaleOptionTask',
    'ItemsSizesOptionTask',
    'CombinedContextsTask',
    'AlignDiagramTask', 'CenterOnCursorTask',
    'ItemTemplateParamsTask',
    'CursorItemTask', 'SelectedItemsTask',
    'GroupTitleTemplateTask', 'CheckBoxTemplateTask', 'ButtonsTemplateTask'
  ], DrawTreeItemsTask, Colors.Green);

  tasks.addTask('DrawMinimizedItemsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'MinimizedItemsOptionTask', 'ItemTemplateParamsTask', 'AlignDiagramTask'], DrawMinimizedItemsTask, Colors.Green);
  tasks.addTask('DrawConnectorsTask', ['graphics', 'ConnectionsGraphTask', 'ConnectorsOptionTask', 'showElbowDots', 'PaletteManagerTask'], DrawConnectorsTask, Colors.Green);
  tasks.addTask('DrawItemLabelsTask', ['graphics', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LabelsOptionTask', 'AlignDiagramTask'], DrawItemLabelsTask, Colors.Green);

  tasks.addTask('DrawFrameItemsTask', ['graphics', 'ApplyLayoutChangesTask', 'ProjectItemsToFrameTask', 'ItemTemplateParamsTask', 'MinimizedItemsOptionTask'], DrawFrameItemsTask, Colors.Green);
  tasks.addTask('DrawFrameHighlightTask', ['graphics', 'ProjectItemsToFrameTask', 'CombinedContextsTask', 'ItemTemplateParamsTask', 'HighlightItemTask', 'CursorItemTask'], DrawFrameHighlightTask, Colors.Green);

  tasks.addTask('DrawLevelAnnotationBackgroundTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask'], DrawLevelAnnotationBackgroundTask, Colors.Green);
  tasks.addTask('DrawLevelAnnotationTitlesTask', ['graphics', 'VerticalOffsetTask', 'CreateTransformTask', 'ApplyLayoutChangesTask', 'LevelAnnotationOptionTask', 'MergeLevelIntervalsTask', 'LevelAnnotationTemplateTask', 'LevelTitlePlacementOptionTask'], DrawLevelAnnotationTitlesTask, Colors.Green);
  return tasks;
}

function EventArgsFactory(data, oldTreeItemId, newTreeItemId, name) {
  var result = new OrgEventArgs(),
    combinedContextsTask = data.tasks.getTask("CombinedContextsTask"),
    alignDiagramTask = data.tasks.getTask("AlignDiagramTask"),
    oldItemConfig = combinedContextsTask.getConfig(oldTreeItemId),
    newItemConfig = combinedContextsTask.getConfig(newTreeItemId),
    itemPosition,
    offset,
    panelOffset;

  if (oldItemConfig && oldItemConfig.id != null) {
    result.oldContext = oldItemConfig;
  }

  if (newItemConfig && newItemConfig.id != null) {
    result.context = newItemConfig;

    if (newItemConfig.parent !== null) {
      result.parentItem = combinedContextsTask.getConfig(newItemConfig.parent);
    }

    panelOffset = getElementOffset(data.layout.mousePanel);
    offset = getElementOffset(data.layout.element);
    itemPosition = alignDiagramTask.getItemPosition(newTreeItemId),
      result.position = new Rect(itemPosition.actualPosition)
        .translate(panelOffset.left, panelOffset.top)
        .translate(-offset.left, -offset.top);
  }

  if (name != null) {
    result.name = name;
  }

  return result;
}

function Cache() {
  this.threshold = 20;

  this.m_visible = {};
  this.m_invisible = {};
}
Cache.prototype.begin = function () {
  var placeholder,
    type,
    index,
    control;

  for (placeholder in this.m_visible) {
    if (this.m_visible.hasOwnProperty(placeholder)) {
      for (type in this.m_visible[placeholder]) {
        if (this.m_visible[placeholder].hasOwnProperty(type)) {
          for (index = this.m_visible[placeholder][type].length - 1; index >= 0; index -= 1) {
            control = this.m_visible[placeholder][type][index];
            control.style.visibility = "hidden";
            this.m_invisible[placeholder][type].push(control);
          }
          this.m_visible[placeholder][type].length = 0;
        }
      }
    }
  }
};

Cache.prototype.end = function () {
  var placeholder,
    type,
    control;
  for (placeholder in this.m_visible) {
    if (this.m_visible.hasOwnProperty(placeholder)) {
      for (type in this.m_visible[placeholder]) {
        if (this.m_visible[placeholder].hasOwnProperty(type)) {
          control = null;
          if (this.m_invisible[placeholder][type].length > this.threshold) {
            while ((control = this.m_invisible[placeholder][type].pop()) !== undefined) {
              control.parentNode.removeChild(control);
            }
          }
        }
      }
    }
  }
};

Cache.prototype.reset = function (placeholder, layer) {
  placeholder = placeholder + "-" + layer;
  var control = null,
    type,
    index;
  for (type in this.m_visible[placeholder]) {
    if (this.m_visible[placeholder].hasOwnProperty(type)) {
      for (index = this.m_visible[placeholder][type].length - 1; index >= 0; index -= 1) {
        control = this.m_visible[placeholder][type][index];
        this.m_invisible[placeholder][type].push(control);
        control.style.visibility = "hidden";
      }
      this.m_visible[placeholder][type].length = 0;
    }
  }
};

Cache.prototype.clear = function () {
  var placeholder,
    type,
    control;
  for (placeholder in this.m_visible) {
    if (this.m_visible.hasOwnProperty(placeholder)) {
      for (type in this.m_visible[placeholder]) {
        if (this.m_visible[placeholder].hasOwnProperty(type)) {
          control = null;
          while ((control = this.m_visible[placeholder][type].pop()) !== undefined) {
            control.parentNode.removeChild(control);
          }
          while ((control = this.m_invisible[placeholder][type].pop()) !== undefined) {
            control.parentNode.removeChild(control);
          }
        }
      }
    }
  }
};

Cache.prototype.get = function (placeholder, layer, type) {
  placeholder = placeholder + "-" + layer;
  var result = null;
  if (this.m_visible[placeholder] === undefined) {
    this.m_visible[placeholder] = {};
    this.m_invisible[placeholder] = {};
  }
  if (this.m_visible[placeholder][type] === undefined) {
    this.m_visible[placeholder][type] = [];
    this.m_invisible[placeholder][type] = [];
  }
  result = this.m_invisible[placeholder][type].pop() || null;
  if (result !== null) {
    this.m_visible[placeholder][type].push(result);
    result.style.visibility = "inherit";
  }
  return result;
};

Cache.prototype.put = function (placeholder, layer, type, control) {
  placeholder = placeholder + "-" + layer;
  this.m_visible[placeholder][type].push(control);
};

function Placeholder(name) {
  this.name = name;

  this.layers = {};
  this.activeLayer = null;

  this.size = null;
  this.rect = null;

  this.div = null;
}

function Layer(name) {
  this.name = name;

  this.canvas = null;

  this.svgcanvas = null;
}

function Graphics(element) {
  this.m_element = element;

  this.m_placeholders = {};
  this.m_activePlaceholder = null;

  this.m_cache = new Cache();

  this.debug = false;
  this.layerNames = {};

  loop(this, Layers, function (key, value) {
    this.layerNames[value] = key;
  });
}
Graphics.prototype.clean = function () {
  var key,
    placeholder,
    layerKey,
    layer;
  this.m_cache.clear();

  this.m_cache = null;

  this.m_element = null;
  for (key in this.m_placeholders) {
    if (this.m_placeholders.hasOwnProperty(key)) {
      placeholder = this.m_placeholders[key];

      for (layerKey in placeholder.layers) {
        if (placeholder.layers.hasOwnProperty(layerKey)) {
          layer = placeholder.layers[layerKey];
          layer.canvas.parentNode.removeChild(layer.canvas);
          layer.canvas = null;
        }
      }
      placeholder.layers.length = 0;
      placeholder.activeLayer = null;

      placeholder.size = null;
      placeholder.rect = null;
      placeholder.div = null;
    }
  }
  this.m_placeholders.length = 0;
  this.m_activePlaceholder = null;
};

Graphics.prototype.resize = function (name, width, height) {
  var placeholder = this.m_placeholders[name];
  if (placeholder === undefined) {
    placeholder = this._activatePlaceholder(name);
  }
  this.resizePlaceholder(placeholder, 0, 0, width, height);
};

Graphics.prototype.position = function (name, left, top, width, height) {
  var placeholder = this.m_placeholders[name];
  if (placeholder === undefined) {
    placeholder = this._activatePlaceholder(name);
  }
  this.resizePlaceholder(placeholder, left, top, width, height);
};

Graphics.prototype.show = function (name) {
  var placeholder = this.m_placeholders[name];
  if (placeholder != null) {
    JsonML$1.applyStyles(placeholder.div, {
      display: "inherit",
      visibility: "inherit"
    });
  }
};

Graphics.prototype.hide = function (name) {
  var placeholder = this.m_placeholders[name];
  if (placeholder != null) {
    JsonML$1.applyStyles(placeholder.div, {
      "display": "none",
      "visibility": "hidden"
    });
  }
};

Graphics.prototype.resizePlaceholder = function (placeholder, left, top, width, height) {
  var layerKey,
    layer;

  placeholder.size = new Size(width, height);
  placeholder.rect = new Rect(left, top, width, height);

  JsonML$1.applyStyles(placeholder.div, placeholder.rect.getCSS());
  for (layerKey in placeholder.layers) {
    if (placeholder.layers.hasOwnProperty(layerKey)) {
      layer = placeholder.layers[layerKey];
      if (layer.name !== -1) {
        JsonML$1.applyStyles(layer.canvas, {
          "position": "absolute",
          "width": "0px",
          "height": "0px"
        });
      }
    }
  }
};

Graphics.prototype.begin = function () {
  this.m_cache.begin();
};

Graphics.prototype.end = function () {
  this.m_cache.end();
};


Graphics.prototype.reset = function (arg0, arg1) {
  var placeholderName = "none",
    layerName = -1;
  switch (arguments.length) {
    case 1:
      if (typeof arg0 === "string") {
        placeholderName = arg0;
      }
      else {
        layerName = arg0;
      }
      break;
    case 2:
      placeholderName = arg0;
      layerName = arg1;
      break;
  }
  this.m_cache.reset(placeholderName, layerName);
};

Graphics.prototype.activate = function (arg0, arg1) {
  switch (arguments.length) {
    case 1:
      if (typeof arg0 === "string") {
        this._activatePlaceholder(arg0);
        this._activateLayer(-1);
      }
      else {
        this._activatePlaceholder("none");
        this._activateLayer(arg0);
      }
      break;
    case 2:
      this._activatePlaceholder(arg0);
      this._activateLayer(arg1);
      break;
  }
  return this.m_activePlaceholder;
};

Graphics.prototype._activatePlaceholder = function (placeholderName) {
  var placeholder = this.m_placeholders[placeholderName],
    div, divs;
  if (placeholder === undefined) {
    div = null;
    if (placeholderName === "none") {
      div = this.m_element;
    }
    else {
      divs = this.m_element.getElementsByClassName(placeholderName);
      div = divs.length > 0 ? divs[0] : this.m_element;
    }

    placeholder = new Placeholder(placeholderName);
    placeholder.div = div;
    placeholder.size = getInnerSize(div);
    placeholder.rect = new Rect(0, 0, placeholder.size.width, placeholder.size.height);

    this.m_placeholders[placeholderName] = placeholder;
  }
  this.m_activePlaceholder = placeholder;
  return this.m_activePlaceholder;
};

Graphics.prototype._activateLayer = function (layerName) {
  var layer = this.m_activePlaceholder.layers[layerName],
    placeholder,
    canvas,
    maximumLayer,
    layerKey;
  if (layer === undefined) {
    placeholder = this.m_activePlaceholder;
    if (layerName === -1) {
      layer = new Layer(layerName);
      layer.canvas = placeholder.div;
    }
    else {
      canvas = JsonML$1.toHTML(["div",
        {
          "style": {
            "position": "absolute",
            "width": "0px",
            "height": "0px"
          },
          "class": ["Layer" + layerName, "Layer" + this.layerNames[layerName]]
        }
      ]);

      maximumLayer = null;
      for (layerKey in placeholder.layers) {
        if (placeholder.layers.hasOwnProperty(layerKey)) {
          layer = placeholder.layers[layerKey];
          if (layer.name < layerName) {
            maximumLayer = (maximumLayer !== null) ? Math.max(maximumLayer, layer.name) : layer.name;
          }
        }
      }

      layer = new Layer(layerName);
      layer.canvas = canvas;

      if (maximumLayer === null) {
        this.prepend(placeholder.div, layer.canvas);
      } else {
        this.insertAfter(placeholder.layers[maximumLayer].canvas, layer.canvas);
      }
    }
    placeholder.layers[layerName] = layer;
  }
  this.m_activePlaceholder.activeLayer = layer;
};

Graphics.prototype.prepend = function (parent, newElement) {
  if (parent.firstChild == null) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, parent.firstChild);
  }
};

Graphics.prototype.insertAfter = function (insertAfterElement, newElement) {
  var parent = insertAfterElement.parentNode;
  if (parent.lastChild == insertAfterElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, insertAfterElement.nextSibling);
  }
};

Graphics.prototype.text = function (x, y, width, height, label, orientation, horizontalAlignment, verticalAlignment, attr) {
  var placeholder = this.m_activePlaceholder,
    style = {
      "position": "absolute",
      "padding": 0,
      "margin": 0,
      "textAlign": getTextAlign(horizontalAlignment),
      "fontSize": attr.fontSize,
      "fontFamily": attr.fontFamily,
      "fontWeight": attr.fontWeight,
      "fontStyle": attr.fontStyle,
      "color": attr.fontColor,
      "lineHeight": 1
    },
    rotation = "",
    element,
    tdstyle;

  switch (orientation) {
    case TextOrientationType.Horizontal:
    case TextOrientationType.Auto:
      style.left = x + "px";
      style.top = y + "px";
      style.width = width + "px";
      style.height = height + "px";
      break;
    case TextOrientationType.RotateLeft:
      style.left = x + Math.round(width / 2.0 - height / 2.0) + "px";
      style.top = y + Math.round(height / 2.0 - width / 2.0) + "px";
      style.width = height + "px";
      style.height = width + "px";
      rotation = "rotate(-90deg)";
      break;
    case TextOrientationType.RotateRight:
      style.left = x + Math.round(width / 2.0 - height / 2.0) + "px";
      style.top = y + Math.round(height / 2.0 - width / 2.0) + "px";
      style.width = height + "px";
      style.height = width + "px";
      rotation = "rotate(90deg)";
      break;
  }

  style["-webkit-transform-origin"] = "center center";
  style["-moz-transform-origin"] = "center center";
  style["-o-transform-origin"] = "center center";
  style["-ms-transform-origin"] = "center center";


  style["-webkit-transform"] = rotation;
  style["-moz-transform"] = rotation;
  style["-o-transform"] = rotation;
  style["-ms-transform"] = rotation;
  style.transform = rotation;


  style.maxWidth = style.width;
  style.maxHeight = style.height;

  label = label.replace(new RegExp("\n", 'g'), "<br/>");
  switch (verticalAlignment) {
    case VerticalAlignmentType.Top:
      if (this.debug) {
        style.border = "solid 1px black";
      }
      element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "text");
      if (element === null) {
        element = JsonML$1.toHTML(["div",
          {
            "style": style,
            $: function (element) { element.innerHTML = label; }
          }
        ]);
        placeholder.activeLayer.canvas.appendChild(element);
        this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "text", element);
      }
      else {
        JsonML$1.applyStyles(element, style);
        element.innerHTML = label;
      }
      break;
    default:
      style.borderCollapse = "collapse";
      tdstyle = {
        "verticalAlign": getVerticalAlignment(verticalAlignment),
        "padding": 0
      };
      if (this.debug) {
        tdstyle.border = "solid 1px black";
      }
      element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "textintable");
      if (element === null) {
        element = JsonML$1.toHTML(["table",
          {
            "style": style
          },
          ["tbody",
            ["tr",
              ["td",
                {
                  "style": tdstyle,
                  $: function (element) { element.innerHTML = label; }
                }
              ]
            ]
          ]
        ]);
        placeholder.activeLayer.canvas.appendChild(element);
        this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "textintable", element);
      }
      else {
        JsonML$1.applyStyles(element, style);
        var td = element.getElementsByTagName("td")[0];
        JsonML$1.applyStyles(td, tdstyle);
        td.innerHTML = label;
      }
      break;
  }
};

Graphics.prototype.polylinesBuffer = function (buffer) {
  buffer.loop(this, function (polyline) {
    if (polyline.length() > 0) {
      this.polyline(polyline);
    }
  });
};


Graphics.prototype.template = function (x, y, width, height, contentx, contenty, contentWidth, contentHeight, template, hashCode, onRenderTemplate, uiHash, attr) { //ignore jslint
  var placeholder = this.m_activePlaceholder,
    element,
    templateKey = "template" + ((hashCode !== null) ? hashCode : getHashCode(template)),
    gap = 0,
    style;

  element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, templateKey);

  if (attr !== null) {
    if (attr.borderWidth !== undefined) {
      attr.borderWidth = attr.borderWidth.toString();
      gap = this.getPxSize(attr.borderWidth);
    }
  }

  style = {
    "width": (contentWidth - gap) + "px",
    "height": (contentHeight - gap) + "px",
    "top": (y + contenty) + "px",
    "left": (x + contentx) + "px"
  };

  mergeObjects(style, attr);

  if (uiHash == null) {
    uiHash = new RenderEventArgs();
  }

  uiHash.x = x + contentx;
  uiHash.y = y + contenty;
  uiHash.width = contentWidth - gap;
  uiHash.height = contentHeight - gap;

  if (element == null) {
    element = this.getElementByTemplate(template);
    style = mergeObjects(style, {
      "position": "absolute",
      "padding": "0px",
      "margin": "0px"
    }, attr);
    JsonML$1.applyStyles(element, style);

    uiHash.element = element;
    uiHash.renderingMode = RenderingMode.Create;

    if (onRenderTemplate !== null) {
      onRenderTemplate(null, uiHash);
    }
    placeholder.activeLayer.canvas.appendChild(element);
    this.m_cache.put(placeholder.name, placeholder.activeLayer.name, templateKey, element);
  } else {
    uiHash.element = element;
    uiHash.renderingMode = RenderingMode.Update;
    JsonML$1.applyStyles(element, style);
    if (onRenderTemplate !== null) {
      onRenderTemplate(null, uiHash);
    }
  }
  return element;
};

Graphics.prototype.getElementByTemplate = function (template) {
  var result = null;
  if (Array.isArray(template)) {
    result = JsonML$1.toHTML(template);
  } else {
    var parent = document.createElement('div');
    parent.innerHTML = template;
    result = parent.firstChild;
  }
  return result;
};

Graphics.prototype.getPxSize = function (value, base) {
  var result = value;
  if (typeof value === "string") {
    if (value.indexOf("pt") > 0) {
      result = parseInt(value, 10) * 96 / 72;
    }
    else if (value.indexOf("%") > 0) {
      result = parseFloat(value) / 100.0 * base;
    }
    else {
      result = parseInt(value, 10);
    }
  }
  return result;
};

function Element(arg0, arg1) {
  this.ns = null;
  this.name = null;
  this.attr = {};
  this.style = {};

  this.children = [];

  switch (arguments.length) {
    case 1:
      this.name = arg0;
      break;
    case 2:
      this.ns = arg0;
      this.name = arg1;
      break;
  }
}
Element.prototype.setAttribute = function (key, value) {
  this.attr[key] = value;
};

Element.prototype.appendChild = function (child) {
  this.children[this.children.length] = child;
};

Element.prototype.create = function (ie8mode) {
  var result = null,
    name,
    child,
    index;
  if (this.ns !== null) {
    result = document.createElementNS(this.ns, this.name);
  }
  else {
    result = document.createElement(this.name);
  }
  for (name in this.attr) {
    if (this.attr.hasOwnProperty(name)) {
      if (ie8mode !== undefined) {
        result[name] = this.attr[name];
      }
      else {
        result.setAttribute(name, this.attr[name]);
      }
    }
  }
  for (name in this.style) {
    if (this.style.hasOwnProperty(name)) {
      result.style[name] = this.style[name];
    }
  }
  for (index = 0; index < this.children.length; index += 1) {
    child = this.children[index];
    if (typeof child === "string") {
      result.appendChild(document.createTextNode(child));
    }
    else {
      result.appendChild(child.create(ie8mode));
    }
  }
  return result;
};

Element.prototype.update = function (target, ie8mode) {
  var name,
    length,
    index,
    child,
    value;
  for (name in this.style) {
    if (this.style.hasOwnProperty(name)) {
      value = this.style[name];
      if (target.style[name] !== value) {
        target.style[name] = value;
      }
    }
  }
  for (name in this.attr) {
    if (this.attr.hasOwnProperty(name)) {
      value = this.attr[name];
      if (ie8mode !== undefined) {
        /* if you see exception here, it may be result of following situation: 
          You made changes in Polyline graphics primitive and added extra sub nodes to it, so number and type of children for shape 
          have been changed, so sub nodes mismatch is a reason for this exception.
        */
        if (target[name] !== value) {
          target[name] = value;
        }
      }
      else {
        if (target.getAttribute(name) !== value) {
          target.setAttribute(name, value);
        }
      }
    }
  }
  length = this.children.length;
  for (index = 0; index < length; index += 1) {
    child = this.children[index];
    if (typeof child === "string") {
      if (target.innerHtml !== child) {
        target.innerHtml = child;
      }
    }
    else {
      this.children[index].update(target.children[index], ie8mode);
    }
  }
};

function SvgGraphics(element) {
  this.parent = Graphics.prototype;

  this.parent.constructor.apply(this, arguments);

  this._svgxmlns = "http://www.w3.org/2000/svg";
}
SvgGraphics.prototype = new Graphics();

SvgGraphics.prototype.clean = function () {
  var key,
    placeholder,
    layerKey,
    layer;
  for (key in this.m_placeholders) {
    if (this.m_placeholders.hasOwnProperty(key)) {
      placeholder = this.m_placeholders[key];
      for (layerKey in placeholder.layers) {
        if (placeholder.layers.hasOwnProperty(layerKey)) {
          layer = placeholder.layers[layerKey];
          if (layer.svgcanvas !== null) {
            layer.svgcanvas.parentNode.removeChild(layer.svgcanvas);
            layer.svgcanvas = null;
          }
        }
      }
    }
  }
  this.parent.clean.apply(this, arguments);
};

SvgGraphics.prototype.resizePlaceholder = function (placeholder, left, top, width, height) {
  var layerKey,
    layer;

  this.parent.resizePlaceholder.apply(this, arguments);

  for (layerKey in placeholder.layers) {
    if (placeholder.layers.hasOwnProperty(layerKey)) {
      layer = placeholder.layers[layerKey];
      if (layer.svgcanvas !== null) {
        JsonML$1.applyStyles(layer.svgcanvas, {
          "position": "absolute",
          "width": width + "px",
          "height": height + "px"
        });
        layer.svgcanvas.setAttribute('viewBox', "0 0 " + width + " " + height);
      }
    }
  }
};

SvgGraphics.prototype._getCanvas = function () {
  var placeholder = this.m_activePlaceholder,
    layer = placeholder.activeLayer,
    panelSize = placeholder.rect;
  if (layer.svgcanvas === null) {
    layer.svgcanvas = document.createElementNS(this._svgxmlns, "svg");
    layer.svgcanvas.setAttribute("viewBox", panelSize.x + " " + panelSize.y + " " + panelSize.width + " " + panelSize.height);
    JsonML$1.applyStyles(layer.svgcanvas, {
      "width": panelSize.width + "px",
      "height": panelSize.height + "px"
    });

    this.prepend(placeholder.activeLayer.canvas, layer.svgcanvas);
  }

  return layer.svgcanvas;
};

SvgGraphics.prototype.polyline = function (polylineData) {
  var placeholder = this.m_activePlaceholder,
    polyline,
    data,
    attr = polylineData.paletteItem.toAttr(),
    element,
    svgcanvas,
    step,
    radius,
    cornerRadius;


  polyline = new Element(this._svgxmlns, "path");
  if (attr.fillColor !== undefined) {
    polyline.setAttribute("fill", attr.fillColor);
    polyline.setAttribute("fill-opacity", attr.opacity);
  }
  else {
    polyline.setAttribute("fill-opacity", 0);
  }

  if (attr.lineWidth !== undefined && attr.borderColor !== undefined) {
    polyline.setAttribute("stroke", attr.borderColor);
    polyline.setAttribute("stroke-width", attr.lineWidth);

    if (attr.opacity !== undefined) {
      polyline.setAttribute("stroke-opacity", attr.opacity);
    } else {
      polyline.setAttribute("stroke-opacity", 1);
    }
  } else {
    polyline.setAttribute("stroke", "transparent");
    polyline.setAttribute("stroke-width", 0);
  }

  if (attr.lineType != null) {
    step = Math.round(attr.lineWidth) || 1;
    switch (attr.lineType) {
      case LineType.Solid:
        polyline.setAttribute("stroke-dasharray", "");
        break;
      case LineType.Dotted:
        polyline.setAttribute("stroke-dasharray", step + "," + step);
        break;
      case LineType.Dashed:
        polyline.setAttribute("stroke-dasharray", (step * 5) + "," + (step * 3));
        break;
    }
  }

  data = "";
  polylineData.loop(this, function (segment) {
    switch (segment.segmentType) {
      case SegmentType.Move:
        data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
      case SegmentType.Line:
        data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
      case SegmentType.QuadraticArc:
        data += "Q" + (Math.round(segment.cpX) + 0.5) + " " + (Math.round(segment.cpY) + 0.5) + " " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
      case SegmentType.Dot:
        // A rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y
        if (segment.width == segment.height && segment.width / 2.0 <= segment.cornerRadius) {
          // dot
          radius = segment.width / 2.0;
          data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
          data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
          data += "A" + radius + " " + radius + " 0 0 0 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + segment.height / 2.0 + 0.5);
        } else if (segment.cornerRadius === 0) {
          // square
          data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        } else {
          cornerRadius = Math.min(segment.cornerRadius, Math.min(segment.width / 2.0, segment.height / 2.0));
          data += "M" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
          data += "L" + (Math.round(segment.x + segment.width) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x + segment.width - cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "L" + (Math.round(segment.x + cornerRadius) + 0.5) + " " + (Math.round(segment.y + segment.height) + 0.5);
          data += "A" + Math.round(cornerRadius) + " " + Math.round(cornerRadius) + " 0 0 1 " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + segment.height - cornerRadius) + 0.5);
          data += "L" + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y + cornerRadius) + 0.5);
        }
        break;
      case SegmentType.CubicArc:
        data += "C" + (Math.round(segment.cpX1) + 0.5) + " " + (Math.round(segment.cpY1) + 0.5) +
          " " + (Math.round(segment.cpX2) + 0.5) + " " + (Math.round(segment.cpY2) + 0.5) +
          " " + (Math.round(segment.x) + 0.5) + " " + (Math.round(segment.y) + 0.5);
        break;
    }
  });

  polyline.setAttribute("d", data);
  element = this.m_cache.get(placeholder.name, placeholder.activeLayer.name, "path");
  if (element === null) {
    element = polyline.create();
    svgcanvas = this._getCanvas();
    svgcanvas.appendChild(element);
    this.m_cache.put(placeholder.name, placeholder.activeLayer.name, "path", element);
  }
  else {
    polyline.update(element);
  }
};

/**
 * Checks if browser is Chrome.
 * 
 * @returns {boolean} Returns true if browser is chrome.
 * @ignore
 */
function isChrome () {
    if (navigator != null) { //ignore jslint
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor); //ignore jslint
    }
    return false;
}
/**
 * Creates graphics object for chart rendering
 * 
 * @param {object} element Reference to dom element the graphics object is created for
 * @returns {Graphics} Returns graphics object
 * @ignore
 */
function createGraphics(element) {
    return new SvgGraphics(element);
}

/**
 * JavaScript Abstract Control
 * @class BaseControl
 */
function BaseControl(element, options, taskManagerFactory, eventArgsFactory, templates) {
  var _data = {
    name: "orgdiagram",
    options: options,
    tasks: null,
    graphics: null,
    mouse: null,
    layout: {
      element: element,
      controlPanel: null,
      frameMousePanel: null,
      framePlaceholder: null,
      titlesMousePanel: null,
      titlesPlaceholder: null,
      scrollPanel: null,
      mousePanel: null,
      placeholder: null,
      calloutPlaceholder: null,
      forceCenterOnCursor: true
    }
  },
    _dragFrom,
    _scrollFrom,
    _scrollTo,
    _dragImage,
    _dragTimer,
    _debug = false,
    _timer = null;

  /**
   * Performs full redraw of the diagram contents via reevaluating all API options. This method has to be called explicitly
   * after all options are set in order to update controls contents.
   * 
   * @param {UpdateMode} updateMode 
   * @param {boolean} forceCenterOnCursor 
   */
  function update(updateMode, forceCenterOnCursor) {
    if (forceCenterOnCursor == null) {
      forceCenterOnCursor = true;
    }
    switch (updateMode) {
      case UpdateMode.Refresh:
        refresh(forceCenterOnCursor, _debug);
        break;
      case UpdateMode.PositonHighlight:
        positionHighlight(_debug);
        break;
      default:
        redraw();
        break;
    }
  }

  /**
   * Removes all elements control added to DOM including event listeners.
   */
  function destroy() {
    unbind(_data.layout);
    cleanLayout(_data.layout);

    _data.tasks = null;
    _data.graphics = null;
  }

  function redraw() {
    unbind(_data.layout);
    cleanLayout(_data.layout);

    createLayout(_data.layout, _data.name);
    bind(_data.layout);
    _data.tasks = taskManagerFactory(getOptions, getGraphics, getLayout, setLayout, templates);
    _data.graphics = createGraphics(_data.layout.element);
    _data.graphics.debug = _debug;

    refresh(true, _debug);
  }

  function refresh(forceCenterOnCursor, debug) {
    var centerOnCursorTask,
      placeholderOffset;

    //_data.layout.scrollPanel.css({
    //  "display": "none",
    //  "-webkit-overflow-scrolling": "auto"
    //});

    //this.graphics.begin();

    _data.layout.forceCenterOnCursor = forceCenterOnCursor;
    _data.tasks.process('OptionsTask', null, debug);

    _data.graphics.end();

    //_data.layout.scrollPanel.css({
    //  "display": "block"
    //});

    if (forceCenterOnCursor) {
      /* scroll to offset */
      centerOnCursorTask = _data.tasks.getTask("CenterOnCursorTask");
      placeholderOffset = centerOnCursorTask.getPlaceholderOffset();
      _data.layout.scrollPanel.scrollLeft = placeholderOffset.x;
      _data.layout.scrollPanel.scrollTop = placeholderOffset.y;
    }
    //_data.layout.scrollPanel.css({
    //  "-webkit-overflow-scrolling": "touch"
    //});

    /* fix pixel alignment */
    var pixelAlignmentFix = getFixOfPixelAlignment(_data.layout.element);
    JsonML$1.applyStyles(_data.layout.scrollPanel, {
      "marginBottom": "0px",
      "marginRight": "0px",
      "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
      "marginTop": pixelAlignmentFix.height + "px"
    });
  }

  function positionHighlight(debug) {
    _data.layout.forceCenterOnCursor = false;
    _data.tasks.process('HighlightItemOptionTask', null, debug);

    _data.graphics.end();
  }

  function redrawCurrentViewPort(debug) {
    _data.layout.forceCenterOnCursor = false;
    _data.tasks.process('LayoutOptionsTask', null, debug);

    _data.graphics.end();
  }

  function onScroll(event) {
    if (_timer == null) {
      _timer = window.setTimeout(function () {
        redrawCurrentViewPort(_debug);
        window.clearTimeout(_timer);
        _timer = null;
      }, 200);
    }
  }

  /**
   * Call this method to update controls configuration. Control uses default Config instance to initialize itself, 
   * so it sets only options provided in the options parameter.
   * 
   * @param {object} options Options
   */
  function setOptions(options) {
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        _data.options[option] = options[option];
      }
    }
  }

  /**
   * This method returns current configuration object.
   * 
   * @returns {object} Returns reference to current configuration object
   */
  function getOptions() {
    return _data.options;
  }

  /**
   * This method returns configuration option by name.
   * 
   * @param {*} option Option name
   */
  function getOption(option) {
    return _data.options[option];
  }

  /**
   * Sets configuration option of the control by name.
   * 
   * @param {*} option Option name
   * @param {*} value Option value
   */
  function setOption(option, value) {
    return _data.options[option] = value;
  }

  function getGraphics() {
    return _data.graphics;
  }

  function getLayout() {
    var layout = _data.layout,
      scrollPanelSize = getInnerSize(layout.controlPanel),
      placeholderOffset = new Point(layout.scrollPanel.scrollLeft, layout.scrollPanel.scrollTop);
    return {
      forceCenterOnCursor: layout.forceCenterOnCursor,
      scrollPanelSize: scrollPanelSize,
      placeholderOffset: placeholderOffset
    }
  }

  function setLayout(layoutOptions) {
    var layout = _data.layout,
      pixelAlignmentFix = getFixOfPixelAlignment(layout.element);

    JsonML$1.applyStyles(layout.controlPanel, {
      "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
      "marginTop": pixelAlignmentFix.height + "px"
    });

    /* set scroll panel position */
    JsonML$1.applyStyles(layout.scrollPanel, layoutOptions.scrollPanelRect.getCSS());

    /* set scaled content panel for tracking mouse events without scaling */
    JsonML$1.applyStyles(layout.mousePanel, layoutOptions.mousePanelSize.getCSS());

    /* set size and scale of content panel */
    var scaleText = "scale(" + layoutOptions.scale + "," + layoutOptions.scale + ")";
    var scaleProperties = {
      "transform-origin": "0 0",
      "transform": scaleText,
      "-ms-transform": scaleText, /* IE 9 */
      "-webkit-transform": scaleText, /* Safari and Chrome */
      "-o-transform": scaleText, /* Opera */
      "-moz-transform": scaleText /* Firefox */
    };
    JsonML$1.applyStyles(layout.placeholder, mergeObjects(scaleProperties, layoutOptions.placeholderSize.getCSS()));

    if (layoutOptions.autoSize) {
      /* resize element to fit placeholder if control in auto size mode */
      JsonML$1.applyStyles(layout.element, layoutOptions.controlSize.getCSS());
    }

    /* set titles panel scale and size */
    JsonML$1.applyStyles(layout.titlesMousePanel, layoutOptions.titlesMousePanelRect.getCSS());
    JsonML$1.applyStyles(layout.titlesPlaceholder, mergeObjects(scaleProperties, layoutOptions.titlesPlaceholderSize.getCSS()));

    /* set frame panel scale and size */
    JsonML$1.applyStyles(layout.frameMousePanel, layoutOptions.frameMousePanelRect.getCSS());
    JsonML$1.applyStyles(layout.framePlaceholder, mergeObjects(scaleProperties, layoutOptions.framePlaceholderSize.getCSS()));
    
    layout.scrollPanel.setAttribute("class", layoutOptions.scrollPanelRect.left > 0 ? name : "bp-scrollframe " + name);
  }

  function createLayout(layout, name) {
    var viewportSize = getInnerSize(layout.element),
      viewportRect = new Rect(0, 0, viewportSize.width, viewportSize.height),
      pixelAlignmentFix = getFixOfPixelAlignment(element);


    JsonML$1.appendDOM(layout.element, JsonML$1.toHTML(
      ["div", /* root control panel */
        {
          "tabindex": 0,
          "style": {
            "position": "relative",
            "overflow": "hidden",
            "top": "0px",
            "left": "0px",
            "width": "100%",
            "height": "100%",
            "padding": "0px",
            "marginBottom": "0px",
            "marginRight": "0px",
            "marginLeft": pixelAlignmentFix.width + "px", /* fixes div pixel alignment */
            "marginTop": pixelAlignmentFix.height + "px"
          },
          "name": "controlPanel",
          "class": name,
          "$": function (element) { layout.controlPanel = element; }
        },
        ["div", /* frameMousePanel - frame mouse tracking events panel */
          {
            "style": mergeObjects({
              position: "absolute",
              overflow: "hidden"
            },
              viewportRect.getCSS()),
            "name": "frameMousePanel",
            "class": name,
            "$": function (element) { layout.frameMousePanel = element; }
          },
          ["div", /* frameplaceholder - contents scalable panel */
            {
              "style": mergeObjects({
                position: "absolute",
                overflow: "hidden"
              },
                viewportRect.getCSS()),
              "name": "framePlaceholder",
              "class": ["frameplaceholder", name],
              "$": function (element) { layout.framePlaceholder = element; }
            }
          ]
        ],
        ["div", /* titlesMousePanel - titles mouse tracking events panel */
          {
            "style": mergeObjects({
              position: "absolute",
              overflow: "hidden"
            },
              viewportRect.getCSS()),
            "name": "titlesMousePanel",
            "class": ["bp-titles-frame", name],
            "$": function (element) { layout.titlesMousePanel = element; }
          },
          ["div", /* titlesplaceholder - contents scalable panel */
            {
              "style": mergeObjects({
                position: "absolute",
                overflow: "hidden"
              },
                viewportRect.getCSS()),
              "name": "titlesPlaceholder",
              "class": ["titlesplaceholder", name],
              "$": function (element) { layout.titlesPlaceholder = element; }
            }
          ]
        ],
        ["div", /* scrollPanel - root scroll panel */
          {
            "style": mergeObjects({
              position: "absolute",
              "overflow": "auto",
              "-webkit-overflow-scrolling": "touch",
              "top": "0px",
              "left": "0px",
              "width": viewportRect.width + "px",
              "height": viewportRect.height + "px"
            },
              viewportRect.getCSS()),
            "name": "scrollPanel",
            "class": name,
            "$": function (element) { layout.scrollPanel = element; }
          },
          ["div", /* mousePanel - mouse tracking events panel */
            {
              "style": mergeObjects({
                position: "absolute",
                overflow: "visible"
              },
                viewportRect.getCSS()),
              "name": "mousePanel",
              "class": name,
              "$": function (element) { layout.mousePanel = element; }
            },
            ["div", /* placeholder - contents scalable panel */
              {
                "style": mergeObjects({
                  position: "absolute",
                  overflow: "hidden"
                },
                  viewportRect.getCSS()),
                "name": "bp-placeholder",
                "class": ["bp-placeholder", name],
                "$": function (element) { layout.placeholder = element; }
              },
              ["div", /* calloutPlaceholder - callout panel */
                {
                  "style": {
                    position: "absolute",
                    overflow: "visible",
                    top: "0px",
                    left: "0px",
                    width: "0px",
                    height: "0px"
                  },
                  "name": "calloutPlaceholder",
                  "class": ["calloutplaceholder", name],
                  "$": function (element) { layout.calloutPlaceholder = element; }
                }
              ]
            ]
          ]
        ]
      ])
    );
  }

  function cleanLayout() {
    var controlPanel = _data.layout.controlPanel;
    if (controlPanel != null) {
      var parent = controlPanel.parentNode;
      if (parent != null) {
        parent.removeChild(controlPanel);
      }
    }
  }

  function bind(layout) {
    layout.mousePanel.addEventListener('mousemove', onMouseMove);
    layout.mousePanel.addEventListener('click', onMouseClick);
    layout.mousePanel.addEventListener('dblclick', onMouseDblClick);
    layout.mousePanel.addEventListener('change', onCheckboxChange);

    layout.element.addEventListener('keydown', onKeyDown);

    layout.scrollPanel.addEventListener('scroll', onScroll);

    if (_data.options.enablePanning && isChrome()) {
      layout.scrollPanel.draggable = true;
      layout.scrollPanel.addEventListener('dragstart', onDragStart);
      layout.scrollPanel.addEventListener('drag', onDragScroll);
      layout.scrollPanel.addEventListener('dragend', onDragScroll);
      layout.scrollPanel.addEventListener('dragover', onDragOver);
    }

    layout.frameMousePanel.addEventListener('mousemove', onFrameMouseMove);
    layout.frameMousePanel.addEventListener('click', onFrameMouseClick);
  }

  function unbind(layout) {
    if (layout.mousePanel != null) {
      layout.mousePanel.removeEventListener("mousemove", onMouseMove);
      layout.mousePanel.removeEventListener("click", onMouseClick);
      layout.mousePanel.removeEventListener("dblclick", onMouseDblClick);
      layout.mousePanel.removeEventListener("change", onCheckboxChange);
    }
    if (layout.element != null) {
      layout.element.removeEventListener("keydown", onKeyDown);
    }
    if (layout.scrollPanel != null) {
      layout.scrollPanel.removeEventListener("scroll", onScroll);
      layout.scrollPanel.removeEventListener('dragstart', onDragStart);
      layout.scrollPanel.removeEventListener('drag', onDragScroll);
      layout.scrollPanel.removeEventListener('dragend', onDragScroll);
      layout.scrollPanel.removeEventListener('dragover', onDragOver);
    }

    if (layout.frameMousePanel != null) {
      layout.frameMousePanel.removeEventListener('mousemove', onFrameMouseMove);
      layout.frameMousePanel.removeEventListener('click', onFrameMouseClick);
    }
  }

  function onFrameMouseMove(event) {
    var placeholderOffset = getElementOffset(_data.layout.frameMousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top;
    var projectItemsToFrameTask = _data.tasks.getTask("ProjectItemsToFrameTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      itemId;

    if (highlightItemOptionTask.hasHighlightEnabled()) {
      itemId = projectItemsToFrameTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius());
      setHighlightItem(event, itemId);
    }
  }

  function onFrameMouseClick(event) {
    var placeholderOffset = getElementOffset(_data.layout.frameMousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top,
      projectItemsToFrameTask = _data.tasks.getTask("ProjectItemsToFrameTask"),
      cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      newCursorItemId = projectItemsToFrameTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius()),
      eventArgs;
    event.target;
    if (newCursorItemId !== null) {
      eventArgs = getEventArgs(null, newCursorItemId);
      trigger("onMouseClick", event, eventArgs);
      if (!eventArgs.cancel) {
        if (cursorItemOptionTask.hasCursorEnabled()) {
          setCursorItem(event, newCursorItemId);
          _data.layout.element.focus();
        }
      }
    }
  }

  function onMouseMove(event) {
    var placeholderOffset = getElementOffset(_data.layout.mousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top,
      createTransformTask = _data.tasks.getTask("CreateTransformTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      itemId;

    if (highlightItemOptionTask.hasHighlightEnabled()) {
      itemId = createTransformTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius());
      setHighlightItem(event, itemId);
    }
  }

  function onCheckboxChange(event) {
    var target = event.target;
    var selectedId = target.getAttribute("data-id");
    if (selectedId != null) {
      var selectedItems = (_data.options.selectedItems || []).slice();
      var eventArgs = getEventArgs(null, selectedId);
      var position = selectedItems.findIndex(function(itemid) { return selectedId == itemid});
      trigger("onSelectionChanging", event, eventArgs);
      if (!eventArgs.cancel) {
        if (position >= 0) {
          selectedItems.splice(position, 1);
        }
        else {
          selectedItems.push(selectedId);
        }
        _data.options.selectedItems = selectedItems;

        if (position < 0) {
          target.setAttribute("checked", "checked");
        } else {
          target.removeAttribute("checked");
        }

        //refresh(false, false);

        trigger("onSelectionChanged", event, eventArgs);
      }
    }
  }

  function onMouseClick(event) {
    var placeholderOffset = getElementOffset(_data.layout.mousePanel),
      x = event.pageX - placeholderOffset.left,
      y = event.pageY - placeholderOffset.top,
      createTransformTask = _data.tasks.getTask("CreateTransformTask"),
      cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      newCursorItemId = createTransformTask.getTreeItemForMousePosition(x, y, highlightItemOptionTask.getGravityRadius()),
      target,
      buttonName,
      eventArgs;
    target = event.target;
    if (newCursorItemId !== null) {
      var buttonName = target.getAttribute("data-buttonname");
      if(isNullOrEmpty(buttonName)) {
        buttonName = target.parentNode && target.parentNode.getAttribute("data-buttonname");
      }      if (!isNullOrEmpty(buttonName)) {
        eventArgs = getEventArgs(null, newCursorItemId, buttonName);
        trigger("onButtonClick", event, eventArgs);
      }
      else if (target.getAttribute("name") === "checkbox" || target.getAttribute("name") === "selectiontext") ;
      else {
        eventArgs = getEventArgs(null, newCursorItemId);
        trigger("onMouseClick", event, eventArgs);
        if (!eventArgs.cancel) {
          if (cursorItemOptionTask.hasCursorEnabled()) {
            setCursorItem(event, newCursorItemId);
            _data.layout.element.focus();
          }
        }
      }
    }
  }

  function onMouseDblClick(event) {
    var eventArgs,
      highlightItemTask = _data.tasks.getTask("HighlightItemTask"),
      highlightTreeItem = highlightItemTask.getHighlightTreeItem();

    if (highlightTreeItem !== null) {
      eventArgs = getEventArgs(null, highlightTreeItem);
      trigger("onMouseDblClick", event, eventArgs);
    }
  }

  function onKeyDown(event) {
    var highlightItemTask = _data.tasks.getTask("HighlightItemTask"),
      highlightItemOptionTask = _data.tasks.getTask("HighlightItemOptionTask"),
      cursorItemTask = _data.tasks.getTask("CursorItemTask"),
      cursorItemOptionTask = _data.tasks.getTask("CursorItemOptionTask"),
      alignDiagramTask = _data.tasks.getTask('AlignDiagramTask'),
      createTransformTask = _data.tasks.getTask('CreateTransformTask'),
      transform = createTransformTask.getTransform(),
      navigationItem = null,
      newNavigationItem,
      direction = null,
      accepted,
      layout = _data.layout;

    if (highlightItemOptionTask.hasHighlightEnabled() && cursorItemOptionTask.hasCursorEnabled()) {
      navigationItem = highlightItemTask.getHighlightTreeItem();
      if (navigationItem === null) {
        navigationItem = cursorItemTask.getCursorTreeItem();
      }
    } else if (highlightItemOptionTask.hasHighlightEnabled()) {
      navigationItem = highlightItemTask.getHighlightTreeItem();
    } else if (cursorItemOptionTask.hasCursorEnabled()) {
      navigationItem = cursorItemTask.getCursorTreeItem();
    }


    if (navigationItem != null) {
      switch (event.which) {
        case 13: /*Enter*/
          if (cursorItemOptionTask.hasCursorEnabled()) {
            setCursorItem(event, navigationItem);
            event.preventDefault();
            layout.element.focus();
          }
          break;
        case 40: /*Down*/
          direction = OrientationType.Bottom;
          break;
        case 38: /*Up*/
          direction = OrientationType.Top;
          break;
        case 37: /*Left*/
          direction = OrientationType.Left;
          break;
        case 39: /*Right*/
          direction = OrientationType.Right;
          break;
      }

      if (direction != null) {

        accepted = false;

        while (!accepted) {
          accepted = true;

          direction = transform.getOrientation(direction);
          newNavigationItem = alignDiagramTask.getNextItem(navigationItem, direction);

          if (newNavigationItem != null) {
            event.preventDefault();
            if (highlightItemOptionTask.hasHighlightEnabled()) {
              setHighlightItem(event, newNavigationItem);
            } else if (cursorItemOptionTask.hasCursorEnabled()) {
              setCursorItem(event, newNavigationItem);
            }

          }
        }
        layout.element.focus();
      }
    }
  }

  function onDragStart(event) {
    var scrollPanel = _data.layout.scrollPanel;
    _dragFrom = new Point(event.clientX, event.clientY);
    _scrollFrom = new Point(scrollPanel.scrollLeft, scrollPanel.scrollTop);
    _dragImage = _dragImage || new Image(); 
    event.dataTransfer.setDragImage(_dragImage, 0, 0);
  }

  function onDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function onDragScroll(event) {
    _scrollTo = new Point(_scrollFrom.x - (event.clientX - _dragFrom.x), _scrollFrom.y - (event.clientY - _dragFrom.y));
    if (_dragTimer == null) {
      _dragTimer = window.setTimeout(function () {
        var scrollPanel = _data.layout.scrollPanel;
        scrollPanel.scrollLeft = _scrollTo.x;
        scrollPanel.scrollTop = _scrollTo.y;
        window.clearTimeout(_dragTimer);
        _dragTimer = null;
      }, 50);
    }
  }

  function setHighlightItem(event, newHighlightItemId) {
    var result = true,
      eventArgs;
    if (newHighlightItemId !== null) {
      if (newHighlightItemId !== _data.options.highlightItem) {
        eventArgs = getEventArgs(_data.options.highlightItem, newHighlightItemId);

        _data.options.highlightItem = newHighlightItemId;

        trigger("onHighlightChanging", event, eventArgs);

        if (!eventArgs.cancel) {
          refresh(false, false);

          trigger("onHighlightChanged", event, eventArgs);
        } else {
          result = false;
        }
      }
    } else {
      if (_data.options.highlightItem !== null) {
        eventArgs = getEventArgs(_data.options.highlightItem, null);

        _data.options.highlightItem = null;

        trigger("onHighlightChanging", event, eventArgs);

        if (!eventArgs.cancel) {
          refresh(false, false);

          trigger("onHighlightChanged", event, eventArgs);
        } else {
          result = false;
        }
      }
    }
    return result;
  }

  function setCursorItem(event, newCursorItemId) {
    var eventArgs;
    if (newCursorItemId !== _data.options.cursorItem) {
      eventArgs = getEventArgs(_data.options.cursorItem, newCursorItemId);

      _data.options.cursorItem = newCursorItemId;

      trigger("onCursorChanging", event, eventArgs);

      if (!eventArgs.cancel) {
        refresh(true, _debug);

        trigger("onCursorChanged", event, eventArgs);
      }
    }
  }

  function getEventArgs(oldTreeItemId, newTreeItemId, name) {
    return eventArgsFactory(_data, oldTreeItemId, newTreeItemId, name);
  }

  function trigger(eventHandlerName, event, eventArgs) {
    var eventHandler = _data.options[eventHandlerName];
    if (eventHandler != null) {
      eventHandler(event, eventArgs);
    }
  }

  update(); /* init control on create */

  return {
    destroy: destroy,
    setOptions: setOptions,
    getOptions: getOptions,
    setOption: setOption,
    getOption: getOption,
    update: update
  };
}

/**
 * Creates JavaScript Organizational Chart Control
 * @class Control
 * @param {object} element Reference to placeholder `div` element in the DOM. The control renders diagram content
 * inside of that div element and adds events listeners.
 * @param {OrgConfig} options Organizational Chart Configuration object
 * 
 * @returns {OrgDiagram} Returns reference to Organizational Chart control. Since control adds event listeners bound
 * to its contents, call `destroy` method to clean up everything.
 */
function OrgDiagram(element, options, templates) {
  return BaseControl(element, options, TaskManagerFactory, EventArgsFactory, {
    AnnotationLabelTemplate,
    ButtonsTemplate,
    CustomRenderTemplate,
    CheckBoxTemplate,
    CursorTemplate,
    DotHighlightTemplate,
    GroupTitleTemplate,
    HighlightTemplate,
    ItemTemplate,
    UserTemplate,
    LevelTitleTemplate,
    LevelBackgroundTemplate,
    /* FamDiagram specific templates */
    LabelAnnotationTemplate,
    ...templates
  });
}

export { AdviserPlacementType, AnnotationType, BackgroundAnnotationConfig, ChildrenPlacementType, Colors, ConnectorAnnotationConfig, ConnectorLabelPlacementType, ConnectorPlacementType, ConnectorShapeType, ConnectorStyleType, ConnectorType, ElbowType, Enabled, FibonacciHeap, Graph, GroupByType, HeapResult, HighlightPathAnnotationConfig, HorizontalAlignmentType, Interval, ItemType, JsonML$1 as JsonML, LCA, LabelAnnotationConfig, LabelType, Layers, LevelAnnotationConfig, LineType, LinkedHashItems, Matrix, NavigationMode, NeighboursSelectionMode, OrgConfig, OrgDiagram, OrgEventArgs, OrgItemConfig, TaskManagerFactory as OrgTaskManagerFactory, OrientationType, PageFitMode, PaletteItemConfig, Pile, PlacementType, Point, QuadTree, RMQ, Rect, RenderingMode, SegmentType, SelectionPathMode, ShapeAnnotationConfig, ShapeType, SideFlag, Size, SortedList, SpatialIndex, TemplateConfig, TextOrientationType, Thickness, Tree, TreeLevels, UpdateMode, Vector, VectorRelationType, VerticalAlignmentType, Visibility, ZOrderType, beforeOpacity, binarySearch, cloneObject, compareArrays, getBlue, getColorHexValue, getColorName, getCrossingRectangles, getElementOffset, getElementsByName, getFamilyLoops, getFamilyUnits, getFixOfPixelAlignment, getGreen, getHashCode, getInnerSize, getLiniarBreaks, getMergedIntervals, getMergedRectangles, getMinimumCrossingRows, getRed, hasClass, highestContrast, isEmptyObject, isEven, isNullOrEmpty, isObject, loop, luminosity, mergeObjects, mergeSort, splitCamelCaseName, stopPropagation };
