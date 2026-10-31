// Reporting-line chart for /employees/treeview. The roots come from the
// page as JSON; each manager's reports load from direct_reports.json.
import * as primitives from 'primitives';

var control;
var items = [];
// Card body values by employee id: { title, team, directs, orgSize }
var details = {};

document.addEventListener('DOMContentLoaded', function () {

	var options = new primitives.OrgConfig();

	// Card: name in the header; labelled Team, Title and Direct Reports rows in the body
	var itemSize = new primitives.Size(260, 114);
	var borderWidth = 1;
	var contentWidth = itemSize.width - borderWidth * 2;
	// Prefixed so the "rowTitle" row cannot collide with the header element named "title"
	var rowNames = ["rowTeam", "rowTitle", "rowDirects", "rowOrgSize"];
	var cardTemplate = new primitives.TemplateConfig();
	cardTemplate.name = "employeeCardTemplate";
	cardTemplate.itemSize = itemSize;
	cardTemplate.itemBorderWidth = borderWidth;
	cardTemplate.itemTemplate = ["div",
		{
			"style": { "borderWidth": borderWidth + "px" },
			"class": ["bp-item", "bp-corner-all", "bt-item-frame"]
		},
		["div",
			{
				"name": "titleBackground",
				"style": { top: "2px", left: "2px", width: (contentWidth - 4) + "px", height: "18px" },
				"class": ["bp-item", "bp-corner-all", "bp-title-frame"]
			},
			["div",
				{
					"name": "title",
					"style": { top: "1px", left: "4px", width: (contentWidth - 12) + "px", height: "16px" },
					"class": ["bp-item", "bp-title"]
				}
			]
		]
	].concat(rowNames.map(function (name, index) {
		return ["div",
			{
				"name": name,
				"style": { top: (24 + index * 22) + "px", left: "4px", width: (contentWidth - 8) + "px", height: "20px" },
				"class": ["bp-item", "bp-description"]
			}
		];
	}));
	options.templates = [cardTemplate];
	options.defaultTemplateName = "employeeCardTemplate";
	options.onItemRender = function (event, data) {
		var item = data.context;
		var info = details[item.id] || {};
		var titleColor = item.itemTitleColor || primitives.Colors.RoyalBlue;
		var rows = { rowTeam: info.team, rowTitle: info.title, rowDirects: info.directs, rowOrgSize: info.orgSize };
		var labels = { rowTeam: "Team", rowTitle: "Title", rowDirects: "Direct Reports", rowOrgSize: "Org Size" };

		var byName = function (name) {
			return data.element.querySelector('[name="' + name + '"]');
		};
		var background = byName("titleBackground");
		var header = byName("title");
		background.style.backgroundColor = titleColor;
		header.style.color = "#fff";
		header.textContent = item.title;

		rowNames.forEach(function (name) {
			var row = byName(name);
			row.replaceChildren();
			var label = document.createElement("strong");
			label.textContent = labels[name] + ": ";
			row.appendChild(label);
			row.appendChild(document.createTextNode(rows[name] == null ? "" : rows[name]));
		});
	};

	var roots = JSON.parse(document.getElementById("tree-roots").textContent);
	roots.forEach(function (root) {
		details[root.id] = root.details;
		items.push(new primitives.OrgItemConfig({
			id: root.id,
			parent: null,
			title: root.title,
			itemTitleColor: root.details.directs > 0 ? primitives.Colors.Green : primitives.Colors.RoyalBlue
		}));
		if (root.details.directs > 0) {
			getDirectReports(root.id);
		}
	});

	options.items = items;
	options.cursorItem = 0;
	options.hasSelectorCheckbox = primitives.Enabled.False;
	options.onCursorChanging = function (e, data) {
		if (data.context !== null) {
			getDirectReports(data.context.id);
		}
	};

	control = primitives.OrgDiagram(document.getElementById("basicdiagram"), options);
});

function getDirectReports(managerId) {
	return fetch(`/employees/${managerId}/direct_reports.json`, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(data => {
		data.forEach(report => {
			if (!items.some(item => item.id === report.employee.id)) {
				details[report.employee.id] = {
					title: report.employee.title,
					team: (report.team_names || []).join(', '),
					directs: report.directs_count,
					orgSize: report.org_size
				};
				items.push(new primitives.OrgItemConfig({
					id: report.employee.id,
					parent: managerId,
					title: report.employee.name || report.employee.person_id,
					itemTitleColor: report.directs_count > 0 ? primitives.Colors.Green : primitives.Colors.RoyalBlue
				}));
			}
		});
		control.setOptions = {items: items};
		control.update(primitives.UpdateMode.Refresh);
	})
	.catch(error => {
		console.error('Error:', error);
	});
}
