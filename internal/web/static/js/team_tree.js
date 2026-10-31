// Team structure chart for /teams/treeview. The root teams come from the
// page as JSON; sub-teams load from sub_teams.json.
import * as primitives from 'primitives';

var control;
var items = [];

document.addEventListener('DOMContentLoaded', function () {

	var options = new primitives.OrgConfig();

	var roots = JSON.parse(document.getElementById("tree-roots").textContent);
	roots.forEach(function (team) {
		items.push(teamItem(team, team.parent_id));
		if (team.sub_team_count > 0) {
			getSubTeams(team.id);
		}
	});

	options.items = items;
	options.cursorItem = 0;
	options.templates = [getTeamTemplate()];
	options.defaultTemplateName = "teamTemplate";
	options.onItemRender = onTemplateRender;
	options.normalItemsInterval = 10;
	options.normalLevelShift = 44;
	options.padding = { left: 10, top: 20, right: 10, bottom: 10};
	options.hasSelectorCheckbox = primitives.Enabled.False;
	options.onCursorChanged = onNodeHighlighted;

	control = primitives.OrgDiagram(document.getElementById("basicdiagram"), options);
});

function healthColor(health) {
	if (health == "red") return primitives.Colors.Red;
	if (health == "amber") return primitives.Colors.Orange;
	return primitives.Colors.Green;
}

function teamItem(team, parentId) {
	return new primitives.OrgItemConfig({
		id: team.id,
		parent: parentId == null ? null : parentId,
		title: team.name,
		pretty_name: team.pretty_name || team.name,
		full_path: team.full_path,
		org_member_count: team.org_member_count,
		member_count: team.member_count,
		manager_count: team.manager_count,
		team_health: team.team_health,
		team_health_details: team.team_health_details,
		children: team.children,
		descendents: team.descendents,
		itemTitleColor: healthColor(team.team_health)
	});
}

// labelled sets an element to a bold label followed by plain text.
function labelled(element, label, value) {
	element.replaceChildren();
	var strong = document.createElement("strong");
	strong.textContent = label;
	element.appendChild(strong);
	element.appendChild(document.createTextNode(" " + (value == null ? "" : value)));
}

function onNodeHighlighted(event, data) {
	var side = document.getElementById("sidecontainer");
	side.replaceChildren(document.createTextNode(data.context.title), document.createElement("br"),
		document.createTextNode(data.context.full_path));
	getTeamMembers(data.context.id)
		.then( response => {
			tableCreate(response);
		}
	);
}

function tableCreate(teamMembers) {
	const sideContainer = document.getElementById("sidecontainer");
	var tbl = document.createElement('table');
	tbl.style.width = '498px';
	tbl.style.border = '1px solid black';

	var tr = tbl.insertRow();
	var td0 = tr.insertCell();
	var td1 = tr.insertCell();
	var td2 = tr.insertCell();
	td0.appendChild(document.createTextNode("Person ID"));
	td1.appendChild(document.createTextNode("Title"));
	td2.appendChild(document.createTextNode("Manager ID"));
	Array.from(tr.cells).forEach(cell => {
			cell.style.border = '1px solid black';
			cell.style.padding = '3px';});

	teamMembers.forEach(teamMember => {
		tr = tbl.insertRow();
		td0 = tr.insertCell();
		td1 = tr.insertCell();
		td2 = tr.insertCell();
		td0.appendChild(document.createTextNode(teamMember.employee.person_id));
		td1.appendChild(document.createTextNode(teamMember.employee.title));
		td2.appendChild(document.createTextNode(teamMember.employee.manager_id));

		Array.from(tr.cells).forEach(cell => {
			cell.style.border = '1px solid black';
			cell.style.padding = '3px';});
	});

	sideContainer.appendChild(tbl);
}

function onTemplateRender(event, data) {
	switch (data.renderingMode) {
		case primitives.RenderingMode.Create:
			break;
		case primitives.RenderingMode.Update:
			break;
	}

	var itemConfig = data.context;

	if (data.templateName == "teamTemplate") {
		var element = data.element;

		element.firstChild.style.backgroundColor = itemConfig.itemTitleColor || primitives.Colors.RoyalBlue;
		element.firstChild.firstChild.textContent = itemConfig.pretty_name || itemConfig.title;

		var name = document.createElement("strong");
		name.textContent = itemConfig.title;
		element.childNodes[1].replaceChildren(name);
		labelled(element.childNodes[2], "Org Size:", itemConfig.org_member_count);
		labelled(element.childNodes[3], "Team Size:", itemConfig.member_count);
		labelled(element.childNodes[4], "Managers:", itemConfig.manager_count);
		labelled(element.childNodes[5], "Sub-Teams:", itemConfig.children);
		labelled(element.childNodes[6], "Descendents:", itemConfig.descendents);
		labelled(element.childNodes[7], "Team Health:", "");
		element.childNodes[8].textContent = itemConfig.team_health_details;
	}
}

function getTeamMembers(teamId) {
	return fetch(`/teams/${teamId}/team_members.json`, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(data => {
		return data;
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function getSubTeams(parentId) {
	fetch(`/teams/${parentId}/sub_teams.json`, {
		method: 'GET'
	})
	.then(response => response.json())
	.then(data => {
		data.forEach(sub_team => {
			if (!items.some(item => item.id === sub_team.sub_team.id)) {

				items.push(teamItem(sub_team.sub_team, parentId));
				if(sub_team.sub_team_count > 0) {
					getSubTeams(sub_team.sub_team.id);
				}
			}
		});
		control.setOptions = {items: items};
		control.update(primitives.UpdateMode.Refresh);

	})
	.catch(error => {
		console.error('Error:', error);
	});
}

function getTeamTemplate() {
	var result = new primitives.TemplateConfig();
	result.name = "teamTemplate";

	result.itemSize = new primitives.Size(240, 175);
	result.minimizedItemSize = new primitives.Size(12, 12);

	result.itemTemplate = ["div",
		{
			"style": {
				width: result.itemSize.width + "px",
				height: result.itemSize.height + "px"
			},
			"class": ["bp-item", "bp-corner-all", "bt-item-frame"]
		},
		["div",
			{
				name: "titleBackground",
				style: {
					top: "2px",
					left: "2px",
					width: "238px",
					height: "20px",
					overflow: "hidden"
				},
				"class": ["bp-item", "bp-corner-all", "bp-title-frame"]
			},
			["div",
				{
					name: "title",
					style: {
						top: "2px",
						left: "2px",
						width: "228px",
						height: "18px",
						fontSize: "12px",
						overflow: "hidden"
					},
					"class": ["bp-item", "bp-title"]
				}
			]
		],
		["div",
			{
				name: "team_id",
				style: {
					top: "27px",
					left: "10px",
					width: "220px",
					height: "18px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "org_member_count",
				style: {
					top: "50px",
					left: "10px",
					width: "110px",
					height: "20px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "member_count",
				style: {
					top: "50px",
					left: "120px",
					width: "110px",
					height: "20px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "manager_count",
				style: {
					top: "70px",
					left: "10px",
					width: "110px",
					height: "20px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "children",
				style: {
					top: "70px",
					left: "120px",
					width: "110px",
					height: "20px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "descendents",
				style: {
					top: "90px",
					left: "10px",
					width: "220px",
					height: "20px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "health-heading",
				style: {
					top: "114px",
					left: "10px",
					width: "220px",
					height: "18px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "health-details",
				style: {
					top: "132px",
					left: "10px",
					width: "220px",
					height: "40px",
					fontSize: "12px",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		],
		["div",
			{
				name: "label",
				style: {
					top: "-20px",
					left: "3px",
					width: "208px",
					height: "20px",
					fontSize: "14px",
					textAlign: "center",
					overflow: "hidden"
				},
				"class": "bp-item"
			}
		]
	];

	return result;
}
