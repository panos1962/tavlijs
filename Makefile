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

test:
	@#database/ddload.sh -L
	@#misc/test_install.sh asda
	bash local/test.sh
