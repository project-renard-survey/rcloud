Notebook.part_name = function(id, language) {
    // yuk
    if(_.isString(id))
        return id;
    var ext = RCloud.language.extension(language);
    if (_.isUndefined(ext))
        throw new Error("Unknown language " + language);
    return 'part' + id + '.' + ext;
};

Notebook.empty_for_github = function(text) {
    return /^\s*$/.test(text);
};

Notebook.is_part_name = function(filename) {
    return filename.match(/^part\d+\./);
};

Notebook.sanitize = function(notebook) {
    notebook = _.pick(notebook, 'description', 'files');
    var files = notebook.files;
    delete files.r_attributes;
    delete files.r_type;
    for(var fn in files)
        files[fn] = _.pick(files[fn], 'content');
    return notebook;
};

// a gist id is 20 or 32 chars of hex
Notebook.valid_gist_id = function(str) {
    return str.match(/^[a-f0-9]*$/i) !== null &&
        [20,32].indexOf(str.length) !== -1;
};
