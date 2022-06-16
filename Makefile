JSMINFILES = tavlijsCore.min.js tavlijs.min.js

%.min.js : %.js
	uglifyjs --verbose --output $@ $<

status:
	git status

add:
	git add .

diff:
	git diff

pull:
	git pull

commit:
	git commit -m "modifications" .

push:
	git push

min: $(JSMINFILES)

cleanup:
	@rm -f $(JSMINFILES)

test:
	@#database/ddload.sh -L
	@#misc/test_install.sh asda
	bash local/test.sh
