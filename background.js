// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

var is_blocking = false;

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return {cancel: is_blocking}; 
	},
	{urls: ["*://*.facebook.com/pull*"]},
	["blocking"]);

chrome.commands.onCommand.addListener(
	function (command) {
		if (command.localeCompare("is_blocking") == 0) {
			if (is_blocking) {
				is_blocking = false;
				alert("Blocking: false");
			} else {
				is_blocking = true;
				alert("Blocking: true");
			}
		};
	});